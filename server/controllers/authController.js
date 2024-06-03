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

    const {
      password: _,
      isVerified,
      verificationToken,
      verificationTokenExpiry,
      ...payload
    } = user.toObject();

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        user: payload,
        msg: "User signed in successfully",
        access_token: token,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.userPasswordResetRequestEmail = async (req, res) => {
  const { email } = req.body;
  try {
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.generatePasswordReset();
    await user.save();
    
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.SERVER_URL}/api/auth/reset-password?token=${user.resetPasswordToken}`;
    
    const mailOptions = {
      from: `AutoConnectBD <${EMAIL_USER}>`,
      to: user.email,
      subject: `Reset Password Request for AutoConnectBD ${user.role} Account`,
      text: `A password reset request was submitted for your AutoConnectBD ${user.role} account. If you did not submit the request, please ignore this email, otherwise click the following link: "${resetUrl}`,
      html: `<p>A password reset request was submitted for your AutoConnectBD ${user.role} account. If you did not submit the request, please ignore this email, otherwise click the following link: </p><a href="${resetUrl}">Click Here</a>`,
    };

    await transporter.sendMail(mailOptions);


    res.status(200).json({ msg: "Reset password email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.userPasswordReset = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  try {
    console.log(token, password);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Invalid or expired reset token");
      return res.status(400).redirect(`${CLIENT_URL}/user/login?reset=invalid`);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();
    console.log("Password reset successful");
    res.status(201).redirect(`${CLIENT_URL}/user/login?reset=success`);
  } catch (err) {
    console.error(err.message);
    res.status(400).redirect(`${CLIENT_URL}/user/login?reset=error`);
  }
};
