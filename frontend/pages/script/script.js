// Script page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Authentication check
    if (!isLoggedIn()) {
        navigateTo('../login/index.html');
        return;
    }

    const scriptContent = document.getElementById('scriptContent');
    const visualsContainer = document.getElementById('visualsContainer');
    const markdownBtn = document.getElementById('markdownBtn');
    const pdfBtn = document.getElementById('pdfBtn');
    
    // Get script ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const scriptId = urlParams.get('id');
    
    if (!scriptId) {
        showToast('No script ID provided', 'error');
        setTimeout(() => {
            navigateTo('../home/index.html');
        }, 2000);
        return;
    }
    
    // Load script from localStorage (or would be from API in production)
    const script = getScriptById(scriptId);
    
    if (!script) {
        showToast('Script not found', 'error');
        setTimeout(() => {
            navigateTo('../home/index.html');
        }, 2000);
        return;
    }
    
    // Set document title to script title
    document.title = `Creator+ | ${script.title}`;
    
    // Populate script content
    scriptContent.value = script.content || '';
    
    // Display the generation date
    const scriptDateElement = document.getElementById('scriptDate');
    if (script.generatedAt) {
        scriptDateElement.textContent = `Generated on ${formatScriptDate(script.generatedAt)}`;
    } else if (script.createdAt) {
        // Fallback to createdAt for existing scripts
        scriptDateElement.textContent = `Generated on ${formatScriptDate(script.createdAt)}`;
    }
    
    // Create auto-save indicator
    const autoSaveIndicator = document.createElement('div');
    autoSaveIndicator.className = 'auto-save-indicator';
    autoSaveIndicator.textContent = 'Saving...';
    document.body.appendChild(autoSaveIndicator);
    
    // Auto-save on content change with debounce
    let saveTimeout;
    scriptContent.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        autoSaveIndicator.classList.add('visible');
        autoSaveIndicator.textContent = 'Saving...';
        
        saveTimeout = setTimeout(() => {
            // Update script content in localStorage
            const allScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
            const scriptIndex = allScripts.findIndex(s => s.id === scriptId);
            
            if (scriptIndex !== -1) {
                allScripts[scriptIndex].content = scriptContent.value;
                allScripts[scriptIndex].lastUpdated = new Date().toISOString();
                localStorage.setItem('generatedScripts', JSON.stringify(allScripts));
                
                // Show saved indicator
                autoSaveIndicator.textContent = 'Saved';
                setTimeout(() => {
                    autoSaveIndicator.classList.remove('visible');
                }, 2000);
            }
        }, 1000); // Save after 1 second of no typing
    });
    
    // Load visual suggestions
    loadVisualSuggestions(script);
    
    // Export buttons
    markdownBtn.addEventListener('click', () => {
        exportScriptAsMarkdown(scriptId);
    });
    
    pdfBtn.addEventListener('click', () => {
        exportScriptAsPDF(scriptId);
    });
    
    // Function to load visual suggestions
    function loadVisualSuggestions(script) {
        // Clear the container
        visualsContainer.innerHTML = '';
        
        // In a real app, these would come from the backend
        // For demo, generate some placeholder images
        if (!script.visualSuggestions || script.visualSuggestions.length === 0) {
            // Generate some placeholder visual suggestions
            const placeholderCount = 3; // Number of placeholder suggestions
            
            for (let i = 0; i < placeholderCount; i++) {
                const visualElement = document.createElement('div');
                visualElement.className = 'visual-suggestion';
                
                // Create a gray placeholder with some text
                visualElement.innerHTML = `
                    <div style="color: #9C9C9C; text-align: center; padding: 20px;">
                        Visual suggestion ${i + 1}<br>
                        <span style="font-size: 12px;">(Based on script content)</span>
                    </div>
                `;
                
                visualsContainer.appendChild(visualElement);
            }
        } else {
            // If the script has actual visual suggestions
            script.visualSuggestions.forEach((visual, index) => {
                const visualElement = document.createElement('div');
                visualElement.className = 'visual-suggestion';
                
                if (visual.imageUrl) {
                    const img = document.createElement('img');
                    img.src = visual.imageUrl;
                    img.alt = `Visual suggestion ${index + 1}`;
                    visualElement.appendChild(img);
                } else {
                    visualElement.innerHTML = `
                        <div style="color: #9C9C9C; text-align: center; padding: 20px;">
                            ${visual.description || `Visual suggestion ${index + 1}`}
                        </div>
                    `;
                }
                
                visualsContainer.appendChild(visualElement);
            });
        }
    }
    
    // Function to format dates
    function formatScriptDate(date) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const d = new Date(date);
        const month = months[d.getMonth()];
        const day = d.getDate();
        const year = d.getFullYear();
        
        // Add ordinal suffix (st, nd, rd, th)
        const getOrdinalSuffix = (n) => {
            const j = n % 10;
            const k = n % 100;
            if (j === 1 && k !== 11) return 'st';
            if (j === 2 && k !== 12) return 'nd';
            if (j === 3 && k !== 13) return 'rd';
            return 'th';
        };
        
        return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
    }
});