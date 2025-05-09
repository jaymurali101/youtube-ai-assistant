// UI related functions

// Page navigation with animation
function navigateTo(url) {
    const pageContainer = document.querySelector('.page-container');
    
    // Apply exit animation
    pageContainer.classList.add('page-exit');
    
    // After animation completes, navigate to new page
    setTimeout(() => {
        window.location.href = url;
    }, 380); // Slightly less than animation duration to ensure smooth transition
}

// Show loading spinner
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.setAttribute('data-original-content', originalContent);
    element.innerHTML = `<div class="spinner"></div>`;
    element.disabled = true;
}

// Hide loading spinner
function hideLoading(element, text) {
    const originalContent = element.getAttribute('data-original-content') || text;
    element.innerHTML = originalContent;
    element.removeAttribute('data-original-content');
    element.disabled = false;
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    
    // Set message and type
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add spinner styles to globals
document.addEventListener('DOMContentLoaded', () => {
    // Check if spinner styles exist
    if (!document.getElementById('spinner-styles')) {
        const spinnerStyles = document.createElement('style');
        spinnerStyles.id = 'spinner-styles';
        spinnerStyles.textContent = `
            .spinner {
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 0.8s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: #fff;
                padding: 12px 24px;
                border-radius: 4px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .toast.show {
                opacity: 1;
            }
            
            .toast-success {
                background-color: #4CAF50;
            }
            
            .toast-error {
                background-color: #F44336;
            }
            
            .toast-warning {
                background-color: #FF9800;
            }
        `;
        document.head.appendChild(spinnerStyles);
    }
});