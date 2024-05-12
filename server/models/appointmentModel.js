const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    workshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' },
    appointmentDate: { type: Date, required: true },
    appointmentType: { type: String, enum: ['service', 'fueling'], required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
