# Experiment 2 - ACM Committee Website with Forms and Validation

## Aim
Design a responsive website for the ACM committee of the department that includes three forms—Login, Registration, and Student Information—featuring form validations (Email, Mobile Number, Pin Code, Password) implemented using JavaScript and styled using Bootstrap.

## Method
1. **Bootstrap Integration**: Used Bootstrap 5.3 for responsive layout and styling
2. **Three Forms Created**:
   - **Login Form**: Email and password validation
   - **Registration Form**: Comprehensive validation including email, mobile, pin code, and password strength
   - **Student Information Form**: Department-specific data collection with validation
3. **JavaScript Validation**: Implemented custom validation functions using regex patterns
4. **Real-time Feedback**: Added blur and input event listeners for instant validation feedback
5. **Modal Integration**: Login and Registration forms displayed in Bootstrap modals
6. **Responsive Design**: Mobile-first approach using Bootstrap's grid system

## Validation Rules Implemented

### Email Validation
- Pattern: `user@example.com`
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Mobile Number Validation
- Format: 10-digit Indian mobile number
- Must start with 6-9
- Regex: `/^[6-9]\d{9}$/`

### Pin Code Validation
- Format: 6-digit numeric code
- Regex: `/^\d{6}$/`

### Password Validation
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)
- Regex: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/`

## Key Features
- Three complete forms with comprehensive validation
- Real-time validation feedback with visual indicators
- Bootstrap modal integration for Login and Registration
- Responsive design that works on all devices
- Custom CSS for enhanced styling
- Form reset after successful submission
- Visual feedback with green (valid) and red (invalid) states
- Accessibility-friendly form structure

## Technologies Used
- HTML5
- Bootstrap 5.3 (CSS Framework)
- JavaScript (Vanilla JS for validation)
- CSS3 (Custom styles)

## How to Run
1. Open `index.html` in a web browser
2. Fill out the Student Information form on the main page
3. Click "Login" or "Register" in the navigation to access modal forms
4. Try entering invalid data to see validation in action

## Validation Flow
1. User enters data in form fields
2. On blur/input events, JavaScript validates the data
3. Visual feedback is provided (green border for valid, red for invalid)
4. On form submission, all fields are validated
5. If all validations pass, success message is shown and form is reset
6. If validations fail, specific error messages are displayed

## Observations
- Bootstrap provides consistent, professional styling with minimal effort
- JavaScript validators provide instant, client-side feedback
- Regex patterns ensure data format consistency
- Combined approach (Bootstrap + JS) improves UX significantly
- Modal forms save space and enhance user experience
- Real-time validation reduces form submission errors

## Conclusion
Combining Bootstrap for responsive UI and vanilla JavaScript for custom validation creates a robust, user-friendly form experience. The implementation demonstrates proper client-side validation techniques while maintaining good UX. However, server-side validation should always be enforced for security in production applications.
