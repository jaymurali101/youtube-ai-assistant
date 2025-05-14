// Profile page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Authentication check
    if (!isLoggedIn()) {
        navigateTo('../login/index.html');
        return;
    }

    const profileForm = document.getElementById('profileForm');
    const newEmailInput = document.getElementById('newEmail');
    const newPasswordInput = document.getElementById('newPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const submitError = document.getElementById('submitError');
    const submitButton = document.getElementById('submitButton');

    // Load current user data and pre-populate email field
    const currentUser = getCurrentUser();
    if (currentUser) {
        newEmailInput.value = currentUser.email;
    }

    // Form submission handling
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        submitError.textContent = '';
        
        // Validate form
        let isValid = true;
        
        // Email validation
        if (!newEmailInput.value) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(newEmailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Password validation
        if (!newPasswordInput.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (newPasswordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const originalButtonText = submitButton.textContent;
            showLoading(submitButton);
            
            try {
                // Get all users from localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const currentUser = getCurrentUser();
                
                // Find the current user in the users array
                const userIndex = users.findIndex(user => user.id === currentUser.id);
                
                if (userIndex === -1) {
                    hideLoading(submitButton, originalButtonText);
                    submitError.textContent = 'User not found. Please log in again.';
                    return;
                }
                
                // Check if new email already exists (for a different user)
                const emailExists = users.some(user => 
                    user.email.toLowerCase() === newEmailInput.value.toLowerCase() && 
                    user.id !== currentUser.id
                );
                
                if (emailExists) {
                    hideLoading(submitButton, originalButtonText);
                    emailError.textContent = 'This email is already in use by another account';
                    return;
                }
                
                // Update user credentials
                users[userIndex].email = newEmailInput.value;
                users[userIndex].password = newPasswordInput.value;
                
                // Save updated users array
                localStorage.setItem('users', JSON.stringify(users));
                
                // Update current user session
                const updatedUser = { ...currentUser, email: newEmailInput.value };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                
                // Simulate processing time
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showToast('Profile updated successfully! Please log in again.', 'success');
                
                // Log out user and redirect to login page
                setTimeout(() => {
                    logoutUser();
                    navigateTo('../login/index.html');
                }, 1500);
                
            } catch (error) {
                hideLoading(submitButton, originalButtonText);
                submitError.textContent = 'Failed to update profile. Please try again.';
                console.error('Profile update error:', error);
            }
        }
    });
});