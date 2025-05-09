// Reset Password page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const emailInput = document.getElementById('email');
    const newPasswordInput = document.getElementById('newPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const resetError = document.getElementById('resetError');
    const submitButton = document.getElementById('submitButton');

    // Password strength indicator
    newPasswordInput.addEventListener('input', () => {
        const password = newPasswordInput.value;
        
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
    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        resetError.textContent = '';
        
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
        const password = newPasswordInput.value;
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
            
            // Check if email exists in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(user => user.email.toLowerCase() === emailInput.value.toLowerCase());
            
            if (userIndex === -1) {
                hideLoading(submitButton, originalButtonText);
                resetError.textContent = 'No account found with this email address';
                return;
            }
            
            // Update password for the user
            setTimeout(() => {
                try {
                    // Update the user's password
                    users[userIndex].password = password;
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    // Show success message
                    showToast('Password updated successfully!', 'success');
                    
                    // Navigate to Login page with animation
                    setTimeout(() => {
                        navigateTo('../login/index.html');
                    }, 1000); // Small delay to show the toast
                } catch (error) {
                    hideLoading(submitButton, originalButtonText);
                    resetError.textContent = 'Failed to update password. Please try again.';
                    console.error('Reset password error:', error);
                }
            }, 800); // Simulate network delay
        }
    });
});