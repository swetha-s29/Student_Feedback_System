const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML, CSS, JS

// In-memory array to store feedback
const feedbackList = [];

// API: Get all feedback
app.get('/feedback', (req, res) => {
    res.json(feedbackList);
});

// API: Add new feedback
app.post('/feedback', (req, res) => {
    const { name, message } = req.body;
    
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }
    
    const newFeedback = {
        id: Date.now(),
        name,
        message,
        date: new Date().toLocaleString()
    };
    
    feedbackList.push(newFeedback);
    res.status(201).json({ success: true, message: 'Feedback added successfully', feedback: newFeedback });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
