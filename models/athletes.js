const mongoose = require('mongoose');

const athletesSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        club: String,
        sports: [{
            name: String,
            rank: Number,
            coaches: [String],
        }]
    },
    {
        strict: false
    });

module.exports = mongoose.model('athletes', athletesSchema, "athletes");