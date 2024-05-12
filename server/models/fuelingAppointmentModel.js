const mongoose = require('mongoose');

const fuelingAppointmentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    fuelingStationId: { type: mongoose.Schema.Types.ObjectId, ref: 'FuelingStation' },
    appointmentDate: { type: Date, required: true },
    appointmentType: { type: String, enum: ['service', 'fueling'], required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('FuelingAppointment', fuelingAppointmentSchema);
