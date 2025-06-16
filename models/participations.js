const mongoose = require('mongoose');

const participationsSchema = new mongoose.Schema({
        athleteId: mongoose.Schema.Types.ObjectId,
        competitionId: mongoose.Schema.Types.ObjectId,
        place: Number,
    },
    {
        strict: false
    });

module.exports = mongoose.model('participations', participationsSchema, "participations");