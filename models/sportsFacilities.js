const mongoose = require('mongoose');

const sportsFacilitiesSchema = new mongoose.Schema({
    name: String,
    type: String,
    attributes: {
        capacity: Number,
        surface: String,
        is24h: Boolean,
        tracks: Number,
        poolLength: Number
    }
});

module.exports = mongoose.model('sportsFacilities', sportsFacilitiesSchema, "sportsFacilities");