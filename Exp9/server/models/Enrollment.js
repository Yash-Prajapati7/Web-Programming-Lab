const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseCode: {
        type: String,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['enrolled', 'completed', 'dropped'],
        default: 'enrolled'
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
