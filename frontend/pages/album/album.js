// Album page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Authentication check
    if (!isLoggedIn()) {
        navigateTo('../login/index.html');
        return;
    }

    const searchInput = document.getElementById('searchInput');
    const nicheFilter = document.getElementById('nicheFilter');
    const dateFilter = document.getElementById('dateFilter');
    const scriptsContainer = document.getElementById('scriptsContainer');
    
    let allScripts = [];
    let filteredScripts = [];
    
    // Load all scripts for the current user
    loadUserScripts();
    
    // Set up event listeners for filtering
    searchInput.addEventListener('input', applyFilters);
    nicheFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
    
    // Function to load user scripts from localStorage
    function loadUserScripts() {
        const currentUser = getCurrentUser();
        if (!currentUser) return;
        
        const allStoredScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
        allScripts = allStoredScripts.filter(script => script.userId === currentUser.id);
        
        // Populate filter dropdowns
        populateFilters();
        
        // Initial display
        filteredScripts = [...allScripts];
        displayScripts();
    }
    
    // Function to populate filter dropdowns with unique values
    function populateFilters() {
        // Get unique channel niches
        const uniqueNiches = [...new Set(allScripts.map(script => script.channelNiche))];
        nicheFilter.innerHTML = '<option value="">Channel Niche</option>';
        uniqueNiches.forEach(niche => {
            const option = document.createElement('option');
            option.value = niche;
            option.textContent = niche;
            nicheFilter.appendChild(option);
        });
        
        // Get unique dates (formatted)
        const uniqueDates = [...new Set(allScripts.map(script => {
            const date = new Date(script.generatedAt || script.createdAt);
            return formatDateForFilter(date);
        }))];
        
        dateFilter.innerHTML = '<option value="">Date</option>';
        uniqueDates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            dateFilter.appendChild(option);
        });
    }
    
    // Function to apply all filters
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedNiche = nicheFilter.value;
        const selectedDate = dateFilter.value;
        
        filteredScripts = allScripts.filter(script => {
            // Search filter
            const matchesSearch = !searchTerm || 
                script.title.toLowerCase().includes(searchTerm) ||
                script.channelNiche.toLowerCase().includes(searchTerm);
            
            // Niche filter
            const matchesNiche = !selectedNiche || script.channelNiche === selectedNiche;
            
            // Date filter
            const scriptDate = formatDateForFilter(new Date(script.generatedAt || script.createdAt));
            const matchesDate = !selectedDate || scriptDate === selectedDate;
            
            return matchesSearch && matchesNiche && matchesDate;
        });
        
        displayScripts();
    }
    
    // Function to format date for filtering
    function formatDateForFilter(date) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
    }
    
    // Function to format date for display
    function formatScriptDate(date) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const d = new Date(date);
        const month = months[d.getMonth()];
        const day = d.getDate();
        const year = d.getFullYear();
        
        // Add ordinal suffix
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
    
    // Function to display scripts
    function displayScripts() {
        if (filteredScripts.length === 0) {
            scriptsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-title">No scripts found</div>
                    <div class="empty-state-message">
                        ${allScripts.length === 0 ? 
                            'Create your first script on the homepage' : 
                            'Try adjusting your search or filters'}
                    </div>
                </div>
            `;
            return;
        }
        
        scriptsContainer.innerHTML = '';
        
        // Sort scripts by date (newest first)
        const sortedScripts = filteredScripts.sort((a, b) => 
            new Date(b.generatedAt || b.createdAt) - new Date(a.generatedAt || a.createdAt)
        );
        
        sortedScripts.forEach(script => {
            const scriptCard = document.createElement('div');
            scriptCard.className = 'script-card';
            
            const formatText = script.videoFormat === 'short' ? 'Short (<60s)' :
                              script.videoFormat === 'medium' ? 'Medium (<5min)' :
                              'Long (<15min)';
            
            scriptCard.innerHTML = `
                <div class="script-info">
                    <div class="script-title">${script.title}</div>
                    <div class="script-details">
                        <div>Channel Niche: ${script.channelNiche}</div>
                        <div>Generated: ${formatScriptDate(script.generatedAt || script.createdAt)}</div>
                        <div>Format: ${formatText}</div>
                    </div>
                </div>
                <div class="script-actions">
                    <button class="action-button edit-button" onclick="editScript('${script.id}')">Edit</button>
                    <button class="action-button delete-button" onclick="deleteScript('${script.id}')">Delete</button>
                </div>
            `;
            
            scriptsContainer.appendChild(scriptCard);
        });
    }
    
    // Function to edit script
    window.editScript = function(scriptId) {
        navigateTo(`../script/index.html?id=${scriptId}`);
    };
    
    // Function to delete script
    window.deleteScript = function(scriptId) {
        if (confirm('Are you sure you want to delete this script? This action cannot be undone.')) {
            // Remove from localStorage
            const allStoredScripts = JSON.parse(localStorage.getItem('generatedScripts') || '[]');
            const updatedScripts = allStoredScripts.filter(script => script.id !== scriptId);
            localStorage.setItem('generatedScripts', JSON.stringify(updatedScripts));
            
            // Refresh the display
            loadUserScripts();
            showToast('Script deleted successfully', 'success');
        }
    };
});