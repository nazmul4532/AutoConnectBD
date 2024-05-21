// Workshop.js
const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  services: [{ type: String }],
  role: { type: String, enum: ['customer', 'workshop', 'fuelingStation'], required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
});

module.exports = mongoose.model('Workshop', workshopSchema);
