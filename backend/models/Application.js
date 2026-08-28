const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    programme: { type: String, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    },
    documents: [{ type: String }], // file URLs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);