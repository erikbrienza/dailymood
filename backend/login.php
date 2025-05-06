<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

// Prendi i dati dal body JSON
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Controllo campi vuoti
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["message" => "Compila tutti i campi."]);
    exit;
}

// Cerca l'utente nel database
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verifica la password
    if (password_verify($password, $user['password'])) {
        // Per ora ritorniamo solo il nome utente come "token" finto
        echo json_encode([
            "message" => "Login effettuato con successo!",
            "username" => $user['username'],
            "user_id" => $user['id'] // ci servirà dopo per salvare gli umori
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Password errata."]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "Utente non trovato."]);
}

$stmt->close();
$conn->close();
?>