const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    publishAt: { type: Date, default: Date.now },
    sourceUrl: { type: String },
    image: { type: String },
});

module.exports = mongoose.model('Sports', sportsSchema);
