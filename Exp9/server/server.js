require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const enrollmentRoutes = require('./routes/enrollments');
const feedbackRoutes = require('./routes/feedback');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/feedback', feedbackRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Student Portal API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            students: '/api/students',
            enrollments: '/api/enrollments',
            feedback: '/api/feedback'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_portal';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('\n✅ MongoDB connection closed');
            process.exit(0);
        });
});
