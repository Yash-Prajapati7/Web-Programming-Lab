const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth');

// Get all enrollments
router.get('/', auth, async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('student', 'name rollNumber department')
            .sort({ enrollmentDate: -1 });
        res.json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Create enrollment
router.post('/', [
    auth,
    body('student').notEmpty(),
    body('courseCode').trim().notEmpty(),
    body('courseName').trim().notEmpty(),
    body('credits').isInt({ min: 1, max: 6 }),
    body('semester').isInt({ min: 1, max: 8 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const enrollment = new Enrollment(req.body);
        await enrollment.save();

        res.status(201).json({
            success: true,
            message: 'Enrollment created successfully',
            data: enrollment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get enrollments by student ID
router.get('/student/:id', auth, async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.params.id })
            .sort({ enrollmentDate: -1 });
        res.json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
