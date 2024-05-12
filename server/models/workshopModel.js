const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    name: String,
    location: String,
    contactDetails: String,
    // Add other fields as needed
});

module.exports = mongoose.model('Workshop', workshopSchema);