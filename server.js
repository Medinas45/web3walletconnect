const express = require('express');
const bodyParser = require('body-parser');
const sendToTelegramRoute = require('./api/send-to-telegram/sendToTelegram');  // Import the sendToTelegram.js file

const app = express();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the API route
app.use('/api/send-to-telegram', sendToTelegramRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});