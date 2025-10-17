const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid phone number']
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    cgpa: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);
