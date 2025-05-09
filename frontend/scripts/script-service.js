// Script service for managing script data and API interactions

// Get all scripts for the current user
function getUserScripts() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const allScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
    return allScripts.filter(script => script.userId === currentUser.id);
}

// Get a specific script by ID
function getScriptById(scriptId) {
    const allScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
    return allScripts.find(script => script.id === scriptId);
}

// Save a new script
function saveScript(scriptData) {
    const allScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
    
    // Add ID and timestamp if not present
    if (!scriptData.id) {
        scriptData.id = 'script_' + Date.now();
    }
    if (!scriptData.createdAt) {
        scriptData.createdAt = new Date().toISOString();
    }
    
    // Add user ID from current user
    scriptData.userId = getCurrentUser().id;
    
    // Add to scripts array
    allScripts.push(scriptData);
    localStorage.setItem('generatedScripts', JSON.stringify(allScripts));
    
    return scriptData;
}

// Update an existing script
function updateScript(scriptId, updates) {
    const allScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
    const scriptIndex = allScripts.findIndex(script => script.id === scriptId);
    
    if (scriptIndex === -1) return null;
    
    // Update script with new data
    allScripts[scriptIndex] = {
        ...allScripts[scriptIndex],
        ...updates,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('generatedScripts', JSON.stringify(allScripts));
    return allScripts[scriptIndex];
}

// Delete a script
function deleteScript(scriptId) {
    const allScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
    const filteredScripts = allScripts.filter(script => script.id !== scriptId);
    localStorage.setItem('generatedScripts', JSON.stringify(filteredScripts));
}

// Export script as PDF
function exportScriptAsPDF(scriptId) {
    const script = getScriptById(scriptId);
    if (!script) {
        showToast('Script not found', 'error');
        return;
    }
    
    // In a real app, this would use a PDF generation library
    // For this demo, we'll just show a toast notification
    showToast('PDF export functionality would be implemented with a backend service', 'info');
    
    // A more complete implementation would:
    // 1. Send a request to the backend to generate a PDF
    // 2. Receive a download URL or blob
    // 3. Trigger the download
}

// Export script as Markdown
function exportScriptAsMarkdown(scriptId) {
    const script = getScriptById(scriptId);
    if (!script) {
        showToast('Script not found', 'error');
        return;
    }
    
    // Create a Markdown version of the script
    const markdownContent = script.content || '';
    
    // Create a blob and download link
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const filename = `${script.title || 'script'}.md`.replace(/\s+/g, '_');
    
    // Create download link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showToast('Script exported as Markdown', 'success');
}