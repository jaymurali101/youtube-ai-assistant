// Home page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Authentication check
    if (!isLoggedIn()) {
        navigateTo('../login/index.html');
        return;
    }

    const scriptForm = document.getElementById('scriptForm');
    const formatButtons = document.querySelectorAll('.format-button');
    const videoFormatInput = document.getElementById('videoFormat');
    const generateButton = document.getElementById('generateButton');
    
    // Load any saved form data from sessionStorage
    loadSavedFormData();
    
    // Format button selection
    formatButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            formatButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Set hidden input value
            const format = button.getAttribute('data-format');
            videoFormatInput.value = format;
            
            // Save to sessionStorage
            saveFormData();
        });
    });
    
    // Form input changes
    const formInputs = scriptForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', saveFormData);
    });
    
    // Form submission
    scriptForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate the form
        if (!validateScriptForm()) {
            return;
        }
        
        // Show loading state
        const originalButtonText = generateButton.textContent;
        showLoading(generateButton);
        
        // Get form data
        const formData = {
            channelNiche: document.getElementById('channelNiche').value,
            videoTopic: document.getElementById('videoTopic').value,
            videoFormat: videoFormatInput.value,
            extraInfo: document.getElementById('extraInfo').value,
            userId: getCurrentUser().id
        };
        
        // Save to sessionStorage (temporary) before sending to backend
        sessionStorage.setItem('scriptFormData', JSON.stringify(formData));
        
        // In a production environment, this would be an API call
        // For now, simulate a successful response and navigate to script page
        try {
            // Simulate backend processing time
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Create a temporary script ID for demo purposes
            const tempScriptId = 'script_' + Date.now();
            
            // Store in localStorage for retrieval on script page (completed scripts remain in localStorage)
            const scripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
            scripts.push({
                id: tempScriptId,
                userId: getCurrentUser().id,
                title: formData.videoTopic,
                channelNiche: formData.channelNiche,
                videoFormat: formData.videoFormat,
                extraInfo: formData.extraInfo,
                createdAt: new Date().toISOString(),
                // This would normally come from the backend
                content: `# ${formData.videoTopic}\n\n` +
                         `This is a placeholder for your generated script about ${formData.videoTopic} ` +
                         `in the ${formData.channelNiche} niche.\n\n` +
                         `Format: ${formData.videoFormat === 'short' ? 'Short (<60s)' : 
                                   formData.videoFormat === 'medium' ? 'Medium (<5 min)' : 
                                   'Long (<15 mins)'}`
            });
            localStorage.setItem('generatedScripts', JSON.stringify(scripts));
            
            // Navigate to the script page with the ID
            navigateTo(`../script/index.html?id=${tempScriptId}`);
        } catch (error) {
            // Handle error
            hideLoading(generateButton, originalButtonText);
            showToast('Failed to generate script. Please try again.', 'error');
            console.error('Script generation error:', error);
        }
    });
    
    // Load saved form data from sessionStorage
    function loadSavedFormData() {
        const savedData = sessionStorage.getItem('scriptFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            // Only load if the userId matches the current user
            if (formData.userId === getCurrentUser().id) {
                // Fill form fields
                document.getElementById('channelNiche').value = formData.channelNiche || '';
                document.getElementById('videoTopic').value = formData.videoTopic || '';
                document.getElementById('extraInfo').value = formData.extraInfo || '';
                
                // Set format button
                if (formData.videoFormat) {
                    videoFormatInput.value = formData.videoFormat;
                    const activeButton = document.querySelector(`.format-button[data-format="${formData.videoFormat}"]`);
                    if (activeButton) {
                        activeButton.classList.add('active');
                    }
                }
            }
        }
    }
    
    // Save form data to sessionStorage
    function saveFormData() {
        const formData = {
            channelNiche: document.getElementById('channelNiche').value,
            videoTopic: document.getElementById('videoTopic').value,
            videoFormat: videoFormatInput.value,
            extraInfo: document.getElementById('extraInfo').value,
            userId: getCurrentUser().id
        };
        
        sessionStorage.setItem('scriptFormData', JSON.stringify(formData));
    }
    
    // Validate the form before submission
    function validateScriptForm() {
        let isValid = true;
        
        // Check channel niche
        const channelNiche = document.getElementById('channelNiche').value;
        if (!channelNiche) {
            showToast('Please enter a channel niche', 'error');
            isValid = false;
        }
        
        // Check video topic
        const videoTopic = document.getElementById('videoTopic').value;
        if (!videoTopic) {
            showToast('Please enter a video topic', 'error');
            isValid = false;
        }
        
        // Check video format
        const videoFormat = videoFormatInput.value;
        if (!videoFormat) {
            showToast('Please select a video format', 'error');
            isValid = false;
        }
        
        return isValid;
    }
});