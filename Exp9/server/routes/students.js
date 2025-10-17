const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// Get all students
router.get('/', auth, async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get student by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Create student
router.post('/', [
    auth,
    body('rollNumber').trim().notEmpty(),
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('phone').matches(/^[6-9]\d{9}$/),
    body('department').isIn(['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']),
    body('year').isInt({ min: 1, max: 4 }),
    body('cgpa').isFloat({ min: 0, max: 10 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const student = new Student({
            ...req.body,
            user: req.user._id
        });
        await student.save();

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Student with this roll number or email already exists'
            });
        }
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Update student
router.put('/:id', auth, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Delete student
router.delete('/:id', auth, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
