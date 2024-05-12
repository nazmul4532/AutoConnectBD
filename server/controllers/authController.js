// authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const Customer = require('../models/customerModel');

// Customer Sign-Up
const customerSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the customer already exists
    let existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ msg: 'Customer already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new customer
    const newCustomer = new Customer({
      username,
      email,
      password: hashedPassword,
    });

    await newCustomer.save();

    // Create and return JWT token
    const payload = {
      customer: {
        id: newCustomer.id,
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

// Customer Sign-In
const customerSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the customer exists
    let customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, customer.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and return JWT token
    const payload = {
      customer: {
        id: customer.id,
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

module.exports = { customerSignUp, customerSignIn };
