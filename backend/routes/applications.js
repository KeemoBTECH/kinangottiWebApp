const express = require('express');
const Application = require('../models/Application');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Public: Submit application
router.post('/submit', async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Get all applications
router.get('/', verifyToken, async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Update status
router.patch('/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;