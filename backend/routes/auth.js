const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Admin = require('../models/Admin');
const Otp = require('../models/Otp');
const { sendOTP } = require('../utils/mailer');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Step 1: Verify credentials & send OTP
router.post('/login-step1', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const valid = await admin.comparePassword(password);
        if (!valid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate OTP
        const otp = generateOTP();
        const tempToken = crypto.randomBytes(32).toString('hex');

        // Save OTP to DB
        await Otp.create({
            email: admin.email,
            otp,
            tempToken,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        });

        // Send email
        await sendOTP(admin.email, otp);

        res.json({
            message: 'OTP sent to your email',
            tempToken,
            email: admin.email,
        });
    } catch (error) {
        console.error('Login step 1 error:', error);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
});

// Step 2: Verify OTP & issue JWT
router.post('/verify-otp', async (req, res) => {
    try {
        const { tempToken, otp } = req.body;

        // Find valid OTP record
        const otpRecord = await Otp.findOne({
            tempToken,
            otp,
            used: false,
            expiresAt: { $gt: new Date() },
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark as used
        otpRecord.used = true;
        await otpRecord.save();

        // Find admin
        const admin = await Admin.findOne({ email: otpRecord.email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Verification failed' });
    }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
    try {
        const { tempToken } = req.body;

        // Find existing record
        const existing = await Otp.findOne({ tempToken, used: false });
        if (!existing) {
            return res.status(400).json({ message: 'Session expired. Please login again.' });
        }

        // Generate new OTP
        const otp = generateOTP();
        existing.otp = otp;
        existing.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await existing.save();

        // Resend email
        await sendOTP(existing.email, otp);

        res.json({ message: 'New OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to resend OTP' });
    }
});

// Get current admin
router.get('/me', verifyToken, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Seed admin — FIXED
router.post('/seed', async (req, res) => {
    try {
        const targetEmail = 'barakamramba3@gmail.com';
        const plainPassword = 'Admin@123';

        // 1. Delete old admin
        await Admin.deleteOne({ email: targetEmail });
        console.log('🗑️  Old admin deleted');

        // 2. Create with PLAIN password — let the hook hash it
        const admin = await Admin.create({
            name: 'System Administrator',
            email: targetEmail,
            password: plainPassword,  // Hook will hash this
            role: 'SUPER_ADMIN',
        });

        console.log('✅ Admin created. Stored hash starts with:', admin.password.substring(0, 7));

        // 3. Verify the hash works
        const verify = await admin.comparePassword(plainPassword);
        console.log('🔐 Password verification:', verify ? 'PASS ✅' : 'FAIL ❌');

        res.json({
            message: 'Admin seeded successfully',
            email: admin.email,
            role: admin.role,
            passwordCheck: verify ? 'Password hash working' : 'Password hash FAILED',
        });
    } catch (error) {
        console.error('❌ Seed error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/debug', async (req, res) => {
    const admin = await Admin.findOne({ email: 'barakamramba3@gmail.com' });
    if (!admin) return res.json({ adminExists: false });

    const test = await require('bcryptjs').compare('Admin@123', admin.password);
    res.json({
        adminExists: true,
        email: admin.email,
        passwordIsHash: admin.password.startsWith('$2'),
        passwordLength: admin.password.length,
        compareTest: test,
    });
});
module.exports = router;