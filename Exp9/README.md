# Experiment 9 - MERN Stack Full Website

## Project Overview
A full-stack Student Portal built with MERN (MongoDB, Express.js, React.js, Node.js) stack featuring user authentication, multiple forms with validation, and database integration.

## Features
- 🏠 Home page with information
- 🔐 User authentication (Register/Login)
- 📝 Three validated forms:
  1. Student Registration Form
  2. Course Enrollment Form
  3. Contact/Feedback Form
- 💾 MongoDB database integration
- 🎨 Responsive design with Bootstrap
- ✅ Client and server-side validation
- 🚀 Deployment ready

## Technology Stack
- **Frontend**: React.js, React Router, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: Custom validators
- **Styling**: Bootstrap 5, Custom CSS

## Project Structure
```
Exp9/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context API
│   │   ├── utils/        # Utilities
│   │   └── App.jsx       # Main app
│   └── package.json
├── server/               # Express backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Entry point
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone and Install Dependencies
```powershell
# Navigate to Exp9
cd Exp9

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

#### 2. Configure Environment

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student_portal
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Create `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

#### 3. Start Development Servers

```powershell
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Start frontend
cd client
npm start
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Features Description

### 1. Home Page
- Welcome section
- Feature cards
- Navigation to other pages
- Statistics display

### 2. Authentication
- User registration with validation
- Login system
- JWT-based authentication
- Protected routes

### 3. Forms

#### Student Registration Form
- **Fields**: Name, Email, Roll Number, Department, Year, CGPA
- **Validation**: Required fields, email format, CGPA range

#### Course Enrollment Form
- **Fields**: Student ID, Course Code, Course Name, Credits, Semester
- **Validation**: Required fields, credit limits

#### Contact/Feedback Form
- **Fields**: Name, Email, Subject, Message
- **Validation**: Required fields, email format, message length

### 4. Database Models
- User Model
- Student Model
- Course Enrollment Model
- Feedback Model

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Course Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Create enrollment
- `GET /api/enrollments/student/:id` - Get student enrollments

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback

## Validation Rules

### Email
- Format: standard email pattern
- Required field

### Phone/Mobile
- Format: 10-digit number
- Pattern: starts with 6-9

### Pin Code
- Format: 6-digit number
- Required for addresses

### Password
- Minimum 8 characters
- Must contain: uppercase, lowercase, number, special character
- Confirmation must match

### CGPA
- Range: 0.0 to 10.0
- Decimal allowed

## Deployment Guide

### Backend Deployment (Heroku/Render)

1. **Prepare for deployment**
```powershell
# In server directory
# Add to package.json:
"engines": {
  "node": "16.x"
}
```

2. **Deploy to Render**
- Connect GitHub repository
- Set environment variables
- Deploy

### Frontend Deployment (Vercel/Netlify)

1. **Build**
```powershell
cd client
npm run build
```

2. **Deploy to Vercel**
```powershell
npm install -g vercel
vercel
```

### Database (MongoDB Atlas)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Add database user
4. Get connection string
5. Update `.env` with connection string

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
```

### Client (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## Testing

### Backend API Testing
Use Postman or Thunder Client:

```http
# Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@1234"
}

# Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@1234"
}
```

### Frontend Testing
1. Register a new user
2. Login with credentials
3. Fill and submit all three forms
4. Verify data in MongoDB

## Technologies Used

### Frontend
- React 18
- React Router DOM v6
- Bootstrap 5
- Axios for API calls
- Context API for state management

### Backend
- Express.js
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- cors for cross-origin requests
- dotenv for environment variables

## Security Features
- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variables for sensitive data

## Future Enhancements
- Role-based access control (Admin/Student)
- File upload functionality
- Email verification
- Forgot password feature
- Dashboard with analytics
- Real-time notifications
- Export data to PDF/Excel

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or use MongoDB Atlas

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Ensure CORS is configured in server and CLIENT_URL is set

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill process or change PORT in .env

## Learning Outcomes
- Full-stack development with MERN
- REST API design and implementation
- Authentication and authorization
- Form handling and validation
- Database modeling with MongoDB
- State management in React
- Routing in React applications
- Environment configuration
- Deployment process

## Conclusion
This MERN stack mini-project demonstrates a complete full-stack application with:
- User authentication
- Multiple validated forms
- Database integration
- Responsive UI
- RESTful API
- Ready for deployment

The project showcases industry-standard practices and provides a solid foundation for building production-ready web applications.

## Credits
Developed as part of Web Programming Laboratory (Experiment 9)
