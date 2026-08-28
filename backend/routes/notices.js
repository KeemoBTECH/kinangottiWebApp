const express = require('express');
const Notice = require('../models/Notice');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Public: Get all published notices
router.get('/public', async (req, res) => {
    try {
        const notices = await Notice.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Public: Get single notice by ID
router.get('/public/:id', async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        res.json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Get all notices
router.get('/', verifyToken, async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Get single notice
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        res.json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Create notice
router.post('/', verifyToken, async (req, res) => {
    try {
        const notice = new Notice(req.body);
        await notice.save();
        res.status(201).json(notice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Update notice
router.put('/:id', verifyToken, async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notice) return res.status(404).json({ message: 'Notice not found' });
        res.json(notice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Delete notice
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;