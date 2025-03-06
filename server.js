const express = require('express');
// bodyParser is not required with Express 4.16+
// const bodyParser = require('body-parser');  // Not necessary anymore
const sendToTelegramRoute = require('./api/send-to-telegram');  // Import the send-to-telegram.js route

const app = express();

// Middleware to parse the request body (Express 4.16+ includes body-parser functionality natively)
app.use(express.urlencoded({ extended: false })); // Use Express' built-in URL-encoded parser
app.use(express.json()); // Use Express' built-in JSON parser

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));  // 'public' folder for static files

// Use the API route for handling form submission
app.use('/api/send-to-telegram', sendToTelegramRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
