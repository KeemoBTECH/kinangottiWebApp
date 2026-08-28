const express = require('express');
const Event = require('../models/Event');
const verifyToken = require('../middleware/auth');
const upload = require('../utils/multer');

const router = express.Router();

// Public: Get all published events
router.get('/public', async (req, res) => {
    try {
        const events = await Event.find({ isPublished: true })
            .sort({ date: -1 })
            .limit(10);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Public: Get single event by ID
router.get('/public/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Get all events
router.get('/', verifyToken, async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Get single event
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: Create event WITH image upload
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            isPublished: req.body.isPublished === 'true',
            image: req.file ? `/uploads/${req.file.filename}` : null,
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Update event
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const update = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            isPublished: req.body.isPublished === 'true',
            updatedAt: Date.now(),
        };
        if (req.file) update.image = `/uploads/${req.file.filename}`;

        const event = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin: Delete event
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;