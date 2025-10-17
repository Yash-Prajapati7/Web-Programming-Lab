import { useState, useEffect } from 'react'
import axios from 'axios'

function EnrollmentForm() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    student: '',
    courseCode: '',
    courseName: '',
    credits: '3',
    semester: '1'
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students')
      setStudents(res.data.data)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.student) newErrors.student = 'Please select a student'
    if (!formData.courseCode.trim()) newErrors.courseCode = 'Course code is required'
    if (!formData.courseName.trim()) newErrors.courseName = 'Course name is required'
    
    const credits = parseInt(formData.credits)
    if (!credits || credits < 1 || credits > 6) {
      newErrors.credits = 'Credits must be between 1 and 6'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setSuccess(false)
    try {
      await axios.post('/api/enrollments', formData)
      setSuccess(true)
      setFormData({
        student: '',
        courseCode: '',
        courseName: '',
        credits: '3',
        semester: '1'
      })
      setErrors({})
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.error || 'Enrollment failed. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Course Enrollment Form</h2>
              
              {success && (
                <div className="alert alert-success">
                  Course enrollment successful!
                </div>
              )}
              
              {errors.submit && (
                <div className="alert alert-danger">{errors.submit}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Select Student *</label>
                  <select
                    className={`form-select ${errors.student ? 'is-invalid' : ''}`}
                    name="student"
                    value={formData.student}
                    onChange={handleChange}
                  >
                    <option value="">Choose a student...</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id}>
                        {student.rollNumber} - {student.name} ({student.department})
                      </option>
                    ))}
                  </select>
                  {errors.student && (
                    <div className="invalid-feedback">{errors.student}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Course Code *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.courseCode ? 'is-invalid' : ''}`}
                      name="courseCode"
                      value={formData.courseCode}
                      onChange={handleChange}
                      placeholder="e.g., CSE101"
                    />
                    {errors.courseCode && (
                      <div className="invalid-feedback">{errors.courseCode}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Course Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.courseName ? 'is-invalid' : ''}`}
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      placeholder="e.g., Data Structures"
                    />
                    {errors.courseName && (
                      <div className="invalid-feedback">{errors.courseName}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Credits *</label>
                    <select
                      className={`form-select ${errors.credits ? 'is-invalid' : ''}`}
                      name="credits"
                      value={formData.credits}
                      onChange={handleChange}
                    >
                      <option value="1">1 Credit</option>
                      <option value="2">2 Credits</option>
                      <option value="3">3 Credits</option>
                      <option value="4">4 Credits</option>
                      <option value="5">5 Credits</option>
                      <option value="6">6 Credits</option>
                    </select>
                    {errors.credits && (
                      <div className="invalid-feedback">{errors.credits}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Semester *</label>
                    <select
                      className="form-select"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Enrolling...' : 'Enroll Course'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrollmentForm
