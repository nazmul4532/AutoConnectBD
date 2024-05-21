// CustomerController.js

const User = require("../models/userModel");

exports.updateUserProfile = async (req, res) => {
  const { name, description, location, contact, services, role } = req.body;
  // email and password is not allowed

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user information if present in the request body
    if (name) user.name = name;
    if (description) user.description = description;
    if (location) user.location = location;
    if (contact) user.contact = contact;
    if (services) user.services = services;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

exports.getHello = async (req, res) => {
  try {
    res.status(200).json({
      msg: "Hello from the customer controller",
      email: req.user.email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
