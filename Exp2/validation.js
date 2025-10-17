// Form Validation Functions

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile number validation (10 digits)
function validateMobile(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
}

// Pin code validation (6 digits)
function validatePincode(pincode) {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
}

// Password validation (min 8 chars, uppercase, lowercase, number, special char)
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Set validation state
function setValidationState(input, isValid, errorMessage = '') {
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            if (errorMessage) {
                feedback.textContent = errorMessage;
            }
        }
    }
}

// Student Information Form Validation
document.getElementById('studentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const name = document.getElementById('studentName');
    if (name.value.trim() === '') {
        setValidationState(name, false);
        isValid = false;
    } else {
        setValidationState(name, true);
    }

    // Email validation
    const email = document.getElementById('studentEmail');
    if (!validateEmail(email.value)) {
        setValidationState(email, false, 'Please enter a valid email address (e.g., user@example.com)');
        isValid = false;
    } else {
        setValidationState(email, true);
    }

    // Mobile validation
    const mobile = document.getElementById('studentMobile');
    if (!validateMobile(mobile.value)) {
        setValidationState(mobile, false, 'Please enter a valid 10-digit mobile number starting with 6-9');
        isValid = false;
    } else {
        setValidationState(mobile, true);
    }

    // Roll number validation
    const rollNo = document.getElementById('studentRollNo');
    if (rollNo.value.trim() === '') {
        setValidationState(rollNo, false);
        isValid = false;
    } else {
        setValidationState(rollNo, true);
    }

    // Department validation
    const dept = document.getElementById('studentDept');
    if (dept.value === '') {
        setValidationState(dept, false);
        isValid = false;
    } else {
        setValidationState(dept, true);
    }

    // Year validation
    const year = document.getElementById('studentYear');
    if (year.value === '') {
        setValidationState(year, false);
        isValid = false;
    } else {
        setValidationState(year, true);
    }

    if (isValid) {
        alert('Student information submitted successfully!');
        this.reset();
        this.classList.remove('was-validated');
        // Remove all validation classes
        this.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
    }
});

// Login Form Validation
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Email validation
    const email = document.getElementById('loginEmail');
    if (!validateEmail(email.value)) {
        setValidationState(email, false);
        isValid = false;
    } else {
        setValidationState(email, true);
    }

    // Password validation
    const password = document.getElementById('loginPassword');
    if (password.value.length < 8) {
        setValidationState(password, false);
        isValid = false;
    } else {
        setValidationState(password, true);
    }

    if (isValid) {
        alert('Login successful!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        this.reset();
        this.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
    }
});

// Registration Form Validation
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // First name validation
    const firstName = document.getElementById('regFirstName');
    if (firstName.value.trim() === '') {
        setValidationState(firstName, false);
        isValid = false;
    } else {
        setValidationState(firstName, true);
    }

    // Last name validation
    const lastName = document.getElementById('regLastName');
    if (lastName.value.trim() === '') {
        setValidationState(lastName, false);
        isValid = false;
    } else {
        setValidationState(lastName, true);
    }

    // Email validation
    const email = document.getElementById('regEmail');
    if (!validateEmail(email.value)) {
        setValidationState(email, false, 'Please enter a valid email address (e.g., user@example.com)');
        isValid = false;
    } else {
        setValidationState(email, true);
    }

    // Mobile validation
    const mobile = document.getElementById('regMobile');
    if (!validateMobile(mobile.value)) {
        setValidationState(mobile, false, 'Please enter a valid 10-digit mobile number starting with 6-9');
        isValid = false;
    } else {
        setValidationState(mobile, true);
    }

    // Pin code validation
    const pincode = document.getElementById('regPincode');
    if (!validatePincode(pincode.value)) {
        setValidationState(pincode, false, 'Please enter a valid 6-digit pin code');
        isValid = false;
    } else {
        setValidationState(pincode, true);
    }

    // Password validation
    const password = document.getElementById('regPassword');
    if (!validatePassword(password.value)) {
        setValidationState(password, false, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character');
        isValid = false;
    } else {
        setValidationState(password, true);
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('regConfirmPassword');
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        setValidationState(confirmPassword, false, 'Passwords do not match');
        isValid = false;
    } else {
        setValidationState(confirmPassword, true);
    }

    // Terms checkbox validation
    const terms = document.getElementById('agreeTerms');
    if (!terms.checked) {
        setValidationState(terms, false);
        isValid = false;
    } else {
        setValidationState(terms, true);
    }

    if (isValid) {
        alert('Registration successful!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
        this.reset();
        this.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
    }
});

// Real-time validation for better UX
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value) {
            setValidationState(this, validateEmail(this.value));
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value) {
            setValidationState(this, validateMobile(this.value));
        }
    });
});

document.getElementById('regPincode')?.addEventListener('blur', function() {
    if (this.value) {
        setValidationState(this, validatePincode(this.value));
    }
});

document.getElementById('regPassword')?.addEventListener('input', function() {
    if (this.value) {
        setValidationState(this, validatePassword(this.value));
    }
});

document.getElementById('regConfirmPassword')?.addEventListener('input', function() {
    const password = document.getElementById('regPassword').value;
    if (this.value) {
        setValidationState(this, this.value === password);
    }
});
