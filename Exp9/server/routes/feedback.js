const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Feedback = require('../models/Feedback');

// Get all feedback (could be protected with auth)
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Submit feedback
router.post('/', [
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('subject').trim().notEmpty(),
    body('message').isLength({ min: 10, max: 1000 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const feedback = new Feedback(req.body);
        await feedback.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for your feedback!',
            data: feedback
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
