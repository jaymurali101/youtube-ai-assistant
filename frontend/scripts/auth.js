// Authentication related functions

/**
 * Temporary local storage based authentication for development
 * In a production environment, this would connect to your API/backend
 */

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

// Login user
async function loginUser(email, password) {
    // For development, simulate API request with setTimeout
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real implementation, this would call your backend API
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store authentication token and user info
                const authToken = generateAuthToken();
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }));
                resolve(true);
            } else {
                resolve(false);
            }
        }, 500); // Simulate network delay
    });
}

// Register new user
async function registerUser(firstName, lastName, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Get existing users or initialize empty array
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if email already exists
                if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
                    reject('Email already registered');
                    return;
                }
                
                // Create new user with first and last name
                const newUser = {
                    id: generateUserId(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    createdAt: new Date().toISOString()
                };
                
                // Add to users array and save
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, 500);
    });
}

// Reset user password
async function resetPassword(email, newPassword) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Get existing users
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Find user by email
                const userIndex = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
                
                if (userIndex === -1) {
                    reject('User not found');
                    return;
                }
                
                // Update password
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, 500);
    });
}

async function updateUserCredentials(newEmail, newPassword) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const currentUser = getCurrentUser();
                
                if (!currentUser) {
                    reject('No user logged in');
                    return;
                }
                
                const userIndex = users.findIndex(user => user.id === currentUser.id);
                
                if (userIndex === -1) {
                    reject('User not found');
                    return;
                }
                
                // Check if email is already taken by another user
                const emailExists = users.some(user => 
                    user.email.toLowerCase() === newEmail.toLowerCase() && 
                    user.id !== currentUser.id
                );
                
                if (emailExists) {
                    reject('Email already in use');
                    return;
                }
                
                // Update credentials
                users[userIndex].email = newEmail;
                users[userIndex].password = newPassword;
                
                // Save updated users
                localStorage.setItem('users', JSON.stringify(users));
                
                // Update current user session
                localStorage.setItem('currentUser', JSON.stringify({
                    ...currentUser,
                    email: newEmail
                }));
                
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, 500);
    });
}

// Logout user
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    return true;
}

// Get current user
function getCurrentUser() {
    if (!isLoggedIn()) return null;
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Helper function to generate ID
function generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper function to generate auth token
function generateAuthToken() {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
}