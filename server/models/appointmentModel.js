const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    workshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' },
    date: Date,
    // Add other fields as needed
});

module.exports = mongoose.model('Appointment', appointmentSchema);
