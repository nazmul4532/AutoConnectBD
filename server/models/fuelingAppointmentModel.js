const mongoose = require('mongoose');

const fuelingAppointmentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    fuelingStationId: { type: mongoose.Schema.Types.ObjectId, ref: 'FuelingStation' },
    date: Date,
    // Add other fields as needed
});

module.exports = mongoose.model('FuelingAppointment', fuelingAppointmentSchema);
