const express = require('express');
const Video = require('../models/Video');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_secret_key';

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

// Add Video
router.post('/', verifyToken, async (req, res) => {
    const { title, description, tags, fileSize } = req.body;
    try {
        const video = new Video({
            user: req.user,
            title,
            description,
            tags,
            fileSize,
        });
        await video.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get Videos
router.get('/', verifyToken, async (req, res) => {
    try {
        const videos = await Video.find({ user: req.user });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
