const API_URL = 'http://localhost:3000/feedback';

// Function to handle form submission
async function submitFeedback(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('studentName');
    const messageInput = document.getElementById('feedbackMessage');
    const statusDiv = document.getElementById('statusMessage');
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name || !message) return;
    
    // Show loading state
    statusDiv.textContent = 'Submitting...';
    statusDiv.style.color = '#333';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            statusDiv.textContent = 'Feedback submitted successfully!';
            statusDiv.style.color = 'green';
            // Clear form
            nameInput.value = '';
            messageInput.value = '';
            
            // Optional: redirect to view page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'view.html';
            }, 1500);
        } else {
            statusDiv.textContent = `Error: ${data.error}`;
            statusDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        statusDiv.textContent = 'Failed to connect to the server. Is it running?';
        statusDiv.style.color = 'red';
    }
}

// Function to fetch and display feedback
async function loadFeedback() {
    const container = document.getElementById('feedbackContainer');
    if (!container) return; // Exit if not on the view page
    
    try {
        const response = await fetch(API_URL);
        const feedbackList = await response.json();
        
        // Clear current list
        container.innerHTML = '';
        
        if (feedbackList.length === 0) {
            container.innerHTML = '<div class="empty-message">No feedback has been submitted yet.</div>';
            return;
        }
        
        // Reverse array to show newest first
        const reversedList = [...feedbackList].reverse();
        
        // Create HTML for each feedback item
        reversedList.forEach(item => {
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'feedback-item';
            
            feedbackElement.innerHTML = `
                <div class="feedback-header">
                    <div class="feedback-name">${escapeHTML(item.name)}</div>
                    <div class="feedback-date">${item.date || 'Unknown date'}</div>
                </div>
                <div class="feedback-message">${escapeHTML(item.message)}</div>
            `;
            
            container.appendChild(feedbackElement);
        });
        
    } catch (error) {
        console.error('Error loading feedback:', error);
        if (container.innerHTML.includes('Loading feedback...')) {
            container.innerHTML = '<div class="empty-message" style="color: red;">Failed to load feedback. Is the server running?</div>';
        }
    }
}

// Simple HTML escaper to prevent XSS
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
