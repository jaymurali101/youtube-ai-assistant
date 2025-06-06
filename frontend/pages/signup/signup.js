// Signup page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const signupError = document.getElementById('signupError');
    const submitButton = document.getElementById('submitButton');

    // Password strength indicator
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        
        // Simple password strength check
        if (password.length === 0) {
            passwordError.textContent = '';
            return;
        }
        
        if (password.length < 8) {
            passwordError.textContent = 'Password should be at least 8 characters';
        } else if (!/[A-Z]/.test(password)) {
            passwordError.textContent = 'Include at least one uppercase letter';
        } else if (!/[0-9]/.test(password)) {
            passwordError.textContent = 'Include at least one number';
        } else {
            passwordError.textContent = '';
        }
    });

    // Form submission handling
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        firstNameError.textContent = '';
        lastNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        signupError.textContent = '';
        
        // Validate form
        let isValid = true;
        
        // First name validation
        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = 'First name is required';
            isValid = false;
        } else if (firstNameInput.value.trim().length < 2) {
            firstNameError.textContent = 'First name must be at least 2 characters';
            isValid = false;
        }
        
        // Last name validation
        if (!lastNameInput.value.trim()) {
            lastNameError.textContent = 'Last name is required';
            isValid = false;
        } else if (lastNameInput.value.trim().length < 2) {
            lastNameError.textContent = 'Last name must be at least 2 characters';
            isValid = false;
        }
        
        // Email validation
        if (!emailInput.value) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        const password = passwordInput.value;
        if (!password) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password should be at least 8 characters';
            isValid = false;
        } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            passwordError.textContent = 'Password should include uppercase letter and number';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const originalButtonText = submitButton.textContent;
            showLoading(submitButton);
            
            // Check if user already exists and register
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.some(user => user.email.toLowerCase() === emailInput.value.toLowerCase());
            
            if (userExists) {
                hideLoading(submitButton, originalButtonText);
                signupError.textContent = 'An account with this email already exists';
                return;
            }
            
            // Register new user with first and last name
            registerUser(
                firstNameInput.value.trim(),
                lastNameInput.value.trim(),
                emailInput.value,
                passwordInput.value
            )
                .then(success => {
                    if (success) {
                        // Show success message
                        showToast('Account created successfully!', 'success');
                        
                        // Navigate to Login page with animation
                        setTimeout(() => {
                            navigateTo('../login/index.html');
                        }, 1000); // Small delay to show the toast
                    } else {
                        hideLoading(submitButton, originalButtonText);
                        signupError.textContent = 'Failed to create account';
                    }
                })
                .catch(error => {
                    hideLoading(submitButton, originalButtonText);
                    signupError.textContent = error || 'An error occurred. Please try again.';
                    console.error('Signup error:', error);
                });
        }
    });
});