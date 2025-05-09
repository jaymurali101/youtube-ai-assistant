// Login page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the first user for testing
    initializeTestUser();
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginError = document.getElementById('loginError');
    const loginButton = document.getElementById('loginButton');

    // Form submission handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        loginError.textContent = '';
        
        // Validate form
        let isValid = true;
        
        // Email validation
        if (!emailInput.value) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const originalButtonText = loginButton.textContent;
            showLoading(loginButton);
            
            // Attempt to login
            loginUser(emailInput.value, passwordInput.value)
                .then(success => {
                    if (success) {
                        // Navigate to Home page with animation
                        navigateTo('../home/index.html');
                    } else {
                        hideLoading(loginButton, originalButtonText);
                        loginError.textContent = 'Invalid email or password';
                    }
                })
                .catch(error => {
                    hideLoading(loginButton, originalButtonText);
                    loginError.textContent = 'An error occurred. Please try again.';
                    console.error('Login error:', error);
                });
        }
    });
});

// Initialize test user if not already present
function initializeTestUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if test user already exists
    if (!users.some(user => user.email === 'jaymurali101@gmail.com')) {
        // Add test user with only email and password
        users.push({
            id: '1',
            email: 'jaymurali101@gmail.com',
            password: 'Password123',
            createdAt: new Date().toISOString()
        });
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Test user initialized');
    }
}