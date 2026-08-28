const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'SUPER_ADMIN'], default: 'ADMIN' },
    createdAt: { type: Date, default: Date.now }
});

// Hash password BEFORE saving — but skip if already hashed
adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    // Don't re-hash an already-hashed password (bcrypt hashes start with $2)
    if (this.password && this.password.startsWith('$2')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);