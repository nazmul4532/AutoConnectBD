// FuelingStation.js
const mongoose = require('mongoose');

const fuelingStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  fuels: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
});

module.exports = mongoose.model('FuelingStation', fuelingStationSchema);
