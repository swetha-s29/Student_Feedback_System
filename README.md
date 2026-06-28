# Student Feedback System!

A very simple, beginner-friendly full-stack web application designed for a lab demonstration. 

## Features
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js with Express
- **Database**: In-memory array (No external database required)
- **Integration**: Uses `fetch` API
- **Real-time Simulation**: The feedback list auto-refreshes every 2 seconds.

## Project Structure
```text
Student_Feedback_System/
├── package.json        # Project metadata and dependencies
├── server.js           # Express backend server
└── public/             # Frontend files served by Express
    ├── index.html      # Home page
    ├── submit.html     # Submit feedback page
    ├── view.html       # View list of all feedbacks
    ├── style.css       # Clean layout styles
    └── app.js          # Logic to submit & auto-refresh feedback
```

## Step-by-Step Instructions to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Open Terminal in Project Folder
Open your terminal or command prompt and navigate to the project directory:
```bash
cd path/to/Student_Feedback_System
```

### Step 2: Install Dependencies
Run the following command to install `express` and `cors`:
```bash
npm install express cors
```
*(Note: If you run `npm install`, it will install these dependencies from `package.json`)*

### Step 3: Start the Backend Server
Run the application using:
```bash
node server.js
```
You should see a message in the terminal saying: `Server is running at http://localhost:3000`

### Step 4: Open in Browser
Open your web browser and go to:
[http://localhost:3000](http://localhost:3000)

### How to use:
1. From the Home Page, click **Submit Feedback**.
2. Enter a student name and a feedback message.
3. Once submitted, it will redirect you to the **View Feedback** page.
4. Open the site in two different browser windows. Submit on one window, and watch the list automatically update on the other window within 2 seconds!
