import { useState } from 'react'
import axios from 'axios'

function StudentForm() {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    phone: '',
    department: 'CSE',
    year: '1',
    cgpa: '',
    address: {
      street: '',
      city: '',
      state: '',
      pinCode: ''
    }
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1]
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required'
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid 10-digit mobile number'
    }
    
    if (!formData.cgpa) {
      newErrors.cgpa = 'CGPA is required'
    } else if (formData.cgpa < 0 || formData.cgpa > 10) {
      newErrors.cgpa = 'CGPA must be between 0 and 10'
    }
    
    if (formData.address.pinCode && !/^\d{6}$/.test(formData.address.pinCode)) {
      newErrors.pinCode = 'Pin code must be 6 digits'
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
      await axios.post('/api/students', formData)
      setSuccess(true)
      // Reset form
      setFormData({
        rollNumber: '',
        name: '',
        email: '',
        phone: '',
        department: 'CSE',
        year: '1',
        cgpa: '',
        address: { street: '', city: '', state: '', pinCode: '' }
      })
      setErrors({})
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.error || 'Registration failed. Please try again.' 
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
              <h2 className="text-center mb-4">Student Registration Form</h2>
              
              {success && (
                <div className="alert alert-success">
                  Student registered successfully!
                </div>
              )}
              
              {errors.submit && (
                <div className="alert alert-danger">{errors.submit}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Roll Number *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.rollNumber ? 'is-invalid' : ''}`}
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />
                    {errors.rollNumber && (
                      <div className="invalid-feedback">{errors.rollNumber}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Department *</label>
                    <select
                      className="form-select"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Year *</label>
                    <select
                      className="form-select"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">CGPA *</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${errors.cgpa ? 'is-invalid' : ''}`}
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                      placeholder="0.00 - 10.00"
                    />
                    {errors.cgpa && (
                      <div className="invalid-feedback">{errors.cgpa}</div>
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Pin Code</label>
                    <input
                      type="text"
                      className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`}
                      name="address.pinCode"
                      value={formData.address.pinCode}
                      onChange={handleChange}
                      placeholder="6-digit"
                    />
                    {errors.pinCode && (
                      <div className="invalid-feedback">{errors.pinCode}</div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register Student'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentForm
