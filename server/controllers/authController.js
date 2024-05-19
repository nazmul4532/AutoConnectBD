const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { JWT_SECRET, EMAIL_HOST, EMAIL_SERVICE, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, CLIENT_URL, SERVER_URL } = process.env;  // Ensure these are in your .env file


const customerSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      if (!existingCustomer.isVerified) {
        await Customer.deleteOne({ email });
      } else {
        return res.status(400).json({ msg: 'Customer already exists' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verificationTokenExpiry = Date.now() + 3600000; // 1 hour

    const newCustomer = new Customer({
      username,
      email,
      password: hashedPassword,
      role: 'customer',
      verificationToken,
      verificationTokenExpiry,
      isVerified: false,
    });

    await newCustomer.save();

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const verificationUrl = `${SERVER_URL}/api/auth/customer/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: `AutoConnectBD <${EMAIL_USER}>`,
      to: newCustomer.email,
      subject: 'Email Verification for AutoConnectBD Customer Account',
      text: `Please verify your customer account email by clicking the following link: ${verificationUrl}`,
      html: `<p>Please verify your customer account email by clicking the following link:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Verification email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const customerEmailVerification = async (req, res) => {
  try {
    const { token } = req.query;

    const customer = await Customer.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!customer) {
      return res.redirect(`${CLIENT_URL}/auth/customer/signin?token=expired`);
    }

    customer.isVerified = true;
    customer.verificationToken = undefined;
    customer.verificationTokenExpiry = undefined;

    await customer.save();

    res.redirect(`${CLIENT_URL}/auth/customer/signin?token=verified`);
  } catch (err) {
    console.error(err.message);
    res.redirect(`${CLIENT_URL}/auth/customer/signin?token=error`);
  }
};


const customerSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, customer.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      customer: {
        email : email,
        role: 'customer',
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { customerSignUp, customerSignIn, customerEmailVerification };