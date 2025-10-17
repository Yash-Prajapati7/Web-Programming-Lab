# Student Portal - MERN Stack Project

## 🎓 Project Summary

A comprehensive full-stack Student Portal application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features user authentication, three validated forms, database integration, and deployment-ready configuration.

## ✨ Key Features

1. **User Authentication**
   - JWT-based authentication
   - Secure password hashing with bcrypt
   - Protected routes

2. **Three Main Forms with Validation**
   - Student Registration Form (10+ fields)
   - Course Enrollment Form
   - Contact/Feedback Form

3. **Database Integration**
   - MongoDB with Mongoose ODM
   - Four data models (User, Student, Enrollment, Feedback)
   - Complete CRUD operations

4. **Modern UI/UX**
   - Responsive design with Bootstrap 5
   - Clean and intuitive interface
   - Mobile-friendly

5. **RESTful API**
   - Well-structured API endpoints
   - Error handling and validation
   - CORS configured

## 📁 Project Structure

```
Exp9/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Entry point
│   └── package.json
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # AuthContext
│   │   └── styles/       # CSS files
│   └── package.json
├── README.md             # This file
└── DEPLOYMENT.md         # Deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone/Navigate to project**
   ```powershell
   cd c:\Users\pyash\Music\Projects\WP\Exp9
   ```

2. **Setup Backend**
   ```powershell
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm start
   ```

3. **Setup Frontend** (in new terminal)
   ```powershell
   cd client
   npm install
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📋 Forms Validation Rules

### 1. Student Registration Form
- **Roll Number**: Required, unique
- **Name**: Required
- **Email**: Required, valid email format
- **Phone**: 10-digit number starting with 6-9
- **Department**: Required (CSE/IT/ECE/EEE/MECH/CIVIL)
- **Year**: 1-4
- **CGPA**: 0.0-10.0
- **Pin Code**: 6-digit number (optional)

### 2. Course Enrollment Form
- **Student**: Required (select from existing)
- **Course Code**: Required
- **Course Name**: Required
- **Credits**: 1-6
- **Semester**: 1-8

### 3. Contact/Feedback Form
- **Name**: Required
- **Email**: Required, valid format
- **Subject**: Required
- **Message**: 10-1000 characters

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Students
- `GET /api/students` - Get all students (protected)
- `GET /api/students/:id` - Get single student (protected)
- `POST /api/students` - Create student (protected)
- `PUT /api/students/:id` - Update student (protected)
- `DELETE /api/students/:id` - Delete student (protected)

### Enrollments
- `GET /api/enrollments` - Get all enrollments (protected)
- `POST /api/enrollments` - Create enrollment (protected)
- `GET /api/enrollments/student/:id` - Get student enrollments (protected)

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Bootstrap 5** - Responsive styling
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variables for secrets

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap grid system
- Responsive navigation
- Touch-friendly forms

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to:
- MongoDB Atlas (Database)
- Render (Backend)
- Vercel (Frontend)

**Free deployment options available!**

## 🧪 Testing the Application

1. **Register a new user**
   - Navigate to Register page
   - Fill the form with valid data
   - Click Register

2. **Login**
   - Use registered credentials
   - Access protected routes

3. **Create a student**
   - Navigate to Student Registration
   - Fill all required fields
   - Submit form

4. **Enroll in course**
   - Navigate to Course Enrollment
   - Select a student
   - Enter course details
   - Submit

5. **Submit feedback**
   - Navigate to Feedback
   - Fill and submit

6. **View Dashboard**
   - See all statistics
   - View recent data

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  createdAt: Date
}
```

### Student
```javascript
{
  rollNumber: String (unique),
  name: String,
  email: String (unique),
  phone: String,
  department: String,
  year: Number,
  cgpa: Number,
  address: {
    street, city, state, pinCode
  },
  user: ObjectId (ref User)
}
```

### Enrollment
```javascript
{
  student: ObjectId (ref Student),
  courseCode: String,
  courseName: String,
  credits: Number,
  semester: Number,
  status: String,
  enrollmentDate: Date
}
```

### Feedback
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date
}
```

## 🎯 Learning Outcomes

This project demonstrates:
- Full-stack development with MERN
- RESTful API design
- Authentication & authorization
- State management with Context API
- Form validation (client & server)
- Database modeling
- Responsive web design
- Deployment process
- Version control with Git

## 📝 Future Enhancements

- Role-based access control (Admin panel)
- File upload for student photos
- Email verification
- Forgot password functionality
- Advanced search and filters
- Data export (PDF/Excel)
- Real-time notifications
- Unit and integration tests
- CI/CD pipeline

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running or use MongoDB Atlas

### CORS Error
```
Access blocked by CORS policy
```
**Solution**: Check CLIENT_URL in server .env

### Port Already in Use
```
EADDRINUSE: address already in use
```
**Solution**: Change PORT in .env or kill existing process

## 👨‍💻 Development Team

Developed as part of Web Programming Laboratory - Experiment 9

## 📄 License

MIT License - Free to use for educational purposes

## 🙏 Acknowledgments

- Bootstrap for UI components
- React team for amazing documentation
- MongoDB for database solution
- Vercel and Render for free hosting

---

**Project Status**: ✅ Complete and Deployment-Ready

**Last Updated**: 2024

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
