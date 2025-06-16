const mongoose = require('mongoose');

const competitionsSchema = new mongoose.Schema({
        name: String,
        sport: String,
        organizer: String,
        date: Date,
        facilityId: mongoose.Schema.Types.ObjectId
    },
    {
        strict: false
    });

module.exports = mongoose.model('competitions', competitionsSchema, "competitions");