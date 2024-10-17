const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    publishAt: { type: Date, default: Date.now },
    sourceUrl: { type: String },
    image: { type: String },
});

module.exports = mongoose.model('News', newsSchema);
