require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_db';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Student Schema
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
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
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
    // Hardware-captured data (from Node-RED/IoT device)
    hardwareData: {
        deviceId: String,
        timestamp: Date,
        location: String,
        rfidTag: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
studentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Student = mongoose.model('Student', studentSchema);

// ============================================
// ROUTES
// ============================================

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Student Database REST API',
        version: '1.0.0',
        endpoints: {
            getAllStudents: 'GET /api/students',
            getStudentById: 'GET /api/students/:id',
            createStudent: 'POST /api/students',
            updateStudent: 'PUT /api/students/:id',
            deleteStudent: 'DELETE /api/students/:id',
            searchStudents: 'GET /api/students/search/:query',
            getByDepartment: 'GET /api/students/department/:dept',
            hardwareCapture: 'POST /api/hardware/capture'
        }
    });
});

// GET all students
app.get('/api/students', async (req, res) => {
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

// GET student by ID
app.get('/api/students/:id', async (req, res) => {
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

// POST create new student
app.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body);
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

// PUT update student
app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
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
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
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
            message: 'Student deleted successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET students by department
app.get('/api/students/department/:dept', async (req, res) => {
    try {
        const students = await Student.find({ 
            department: req.params.dept.toUpperCase() 
        });
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

// Search students
app.get('/api/students/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const students = await Student.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { rollNumber: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
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

// POST hardware capture endpoint (for Node-RED integration)
app.post('/api/hardware/capture', async (req, res) => {
    try {
        const { rollNumber, deviceId, rfidTag, location } = req.body;
        
        // Find student by roll number or RFID tag
        let student = await Student.findOne({
            $or: [
                { rollNumber: rollNumber },
                { 'hardwareData.rfidTag': rfidTag }
            ]
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        // Update hardware data
        student.hardwareData = {
            deviceId: deviceId || 'UNKNOWN',
            timestamp: new Date(),
            location: location || 'Main Gate',
            rfidTag: rfidTag || student.hardwareData?.rfidTag
        };

        await student.save();

        res.json({
            success: true,
            message: 'Hardware data captured successfully',
            data: {
                student: student.name,
                rollNumber: student.rollNumber,
                location: student.hardwareData.location,
                timestamp: student.hardwareData.timestamp
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Database connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        
        // Start server
        app.listen(PORT, () => {
            console.log('='.repeat(50));
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/`);
            console.log('='.repeat(50));
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('\n💡 Make sure MongoDB is running!');
        console.error('   Run: mongod\n');
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    mongoose.connection.close();
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...');
    mongoose.connection.close()
        .then(() => {
            console.log('✅ MongoDB connection closed');
            process.exit(0);
        });
});
