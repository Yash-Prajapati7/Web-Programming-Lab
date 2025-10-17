import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const [students, setStudents] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [studentsRes, enrollmentsRes, feedbackRes] = await Promise.all([
        axios.get('/api/students'),
        axios.get('/api/enrollments'),
        axios.get('/api/feedback')
      ])
      
      setStudents(studentsRes.data.data)
      setEnrollments(enrollmentsRes.data.data)
      setFeedback(feedbackRes.data.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard</h2>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <h2>{students.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Enrollments</h5>
              <h2>{enrollments.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Total Feedback</h5>
              <h2>{feedback.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Recent Students</h5>
        </div>
        <div className="card-body">
          {students.length === 0 ? (
            <p className="text-muted">No students registered yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 5).map(student => (
                    <tr key={student._id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td>{student.cgpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Recent Course Enrollments</h5>
        </div>
        <div className="card-body">
          {enrollments.length === 0 ? (
            <p className="text-muted">No enrollments yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Student</th>
                    <th>Credits</th>
                    <th>Semester</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.slice(0, 5).map(enrollment => (
                    <tr key={enrollment._id}>
                      <td>{enrollment.courseCode}</td>
                      <td>{enrollment.courseName}</td>
                      <td>
                        {enrollment.student?.name || 'N/A'}
                        <br />
                        <small className="text-muted">
                          {enrollment.student?.rollNumber}
                        </small>
                      </td>
                      <td>{enrollment.credits}</td>
                      <td>{enrollment.semester}</td>
                      <td>
                        <span className="badge bg-success">{enrollment.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="card">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Recent Feedback</h5>
        </div>
        <div className="card-body">
          {feedback.length === 0 ? (
            <p className="text-muted">No feedback submitted yet.</p>
          ) : (
            <div className="row">
              {feedback.slice(0, 3).map(item => (
                <div key={item._id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title">{item.subject}</h6>
                      <p className="card-text small text-muted">
                        {item.message.substring(0, 100)}...
                      </p>
                      <p className="mb-0 small">
                        <strong>{item.name}</strong><br />
                        {item.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
