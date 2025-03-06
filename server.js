const express = require('express');
const bodyParser = require('body-parser');
const sendToTelegramRoute = require('./api/send-to-telegram');  // Import the send-to-telegram.js route

const app = express();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));  // 'public' folder for static files

// Use the API route for handling form submission
app.use('/api/send-to-telegram', sendToTelegramRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});