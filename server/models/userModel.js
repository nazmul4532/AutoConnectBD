// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    // image urls from cloudinary
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  contact: {
    type: String,
  },
  services: [
    {
      type: String,
    },
  ],
  role: {
    type: String,
    enum: ["customer", "workshop", "fuelingstation", "company"],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
