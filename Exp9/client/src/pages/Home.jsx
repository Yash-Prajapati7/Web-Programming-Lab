import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center text-white">
          <h1 className="display-3 fw-bold mb-4">Welcome to Student Portal</h1>
          <p className="lead mb-4">
            Complete MERN Stack Web Application for Student Management
          </p>
          {!user && (
            <div>
              <Link to="/register" className="btn btn-light btn-lg me-3">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">👤</div>
                  <h5 className="card-title">Student Registration</h5>
                  <p className="card-text">
                    Register students with complete details including personal information, 
                    department, and academic records.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">📚</div>
                  <h5 className="card-title">Course Enrollment</h5>
                  <p className="card-text">
                    Enroll students in courses with credit management and semester tracking.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">💬</div>
                  <h5 className="card-title">Feedback System</h5>
                  <p className="card-text">
                    Submit feedback and suggestions to improve the portal and services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Technology Stack</h2>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="tech-badge">
                <h3>M</h3>
                <p>MongoDB</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="tech-badge">
                <h3>E</h3>
                <p>Express.js</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="tech-badge">
                <h3>R</h3>
                <p>React.js</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="tech-badge">
                <h3>N</h3>
                <p>Node.js</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="stat-card">
                <h2 className="text-primary">✅</h2>
                <h3>Validation</h3>
                <p>Client & Server-side form validation</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="stat-card">
                <h2 className="text-success">🔒</h2>
                <h3>Security</h3>
                <p>JWT authentication & password hashing</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="stat-card">
                <h2 className="text-info">📱</h2>
                <h3>Responsive</h3>
                <p>Mobile-friendly Bootstrap design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">
            &copy; 2024 Student Portal - MERN Stack Project (Experiment 9)
          </p>
          <p className="mb-0 mt-2">
            Built with MongoDB, Express.js, React.js, and Node.js
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
