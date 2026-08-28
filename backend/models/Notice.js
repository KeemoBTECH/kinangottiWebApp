const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        enum: ['GENERAL', 'VACANCY', 'REMINDER', 'ADMISSION'],
        default: 'GENERAL'
    },
    isPublished: { type: Boolean, default: true },
    image: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);