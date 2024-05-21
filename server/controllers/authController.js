const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {
  JWT_SECRET,
  EMAIL_HOST,
  EMAIL_SERVICE,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  CLIENT_URL,
  SERVER_URL,
} = process.env; // Ensure these are in your .env file


exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password, role, location, contact } = req.body;
    // name, email, password, role is required

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.isVerified) {
        await User.deleteOne({ email });
      } else {
        return res.status(400).json({ msg: "User already exists" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationTokenExpiry = Date.now() + 3600000; // 1 hour

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
      contact,
      role,
      verificationToken,
      verificationTokenExpiry,
      isVerified: false,
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const verificationUrl = `${SERVER_URL}/api/auth/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: `AutoConnectBD <${EMAIL_USER}>`,
      to: newUser.email,
      subject: `Email Verification for AutoConnectBD ${role} Account`,
      text: `Please verify your ${role} account email by clicking the following link: ${verificationUrl}`,
      html: `<p>Please verify your customer account email by clicking the following link:</p><a href="${verificationUrl}">Click Here</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "User verification email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.userEmailVerification = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.redirect(`${CLIENT_URL}/login?token=expired`);
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res.redirect(`${CLIENT_URL}/user/login?token=verified`);
  } catch (err) {
    console.error(err.message);
    res.redirect(`${CLIENT_URL}/user/login?token=error`);
  }
};

exports.userSignIn = async (req, res) => {
  // console.log("Attempting Log In");
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const { password: _, isVerified, verificationToken, verificationTokenExpiry, ...payload } = user.toObject();


    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: "User signed in successfully",
        access_token: token,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};


