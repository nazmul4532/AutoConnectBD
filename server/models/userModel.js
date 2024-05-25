const mongoose = require("mongoose");
const crypto = require("crypto");


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
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiry: {
    type: Date,
  },
});

userSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordTokenExpiry = Date.now() + 3600000; // expires in an hour
};

module.exports = mongoose.model("User", userSchema);
