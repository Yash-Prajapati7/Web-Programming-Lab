import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentForm from './pages/StudentForm'
import EnrollmentForm from './pages/EnrollmentForm'
import FeedbackForm from './pages/FeedbackForm'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-registration" element={<ProtectedRoute><StudentForm /></ProtectedRoute>} />
        <Route path="/course-enrollment" element={<ProtectedRoute><EnrollmentForm /></ProtectedRoute>} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
