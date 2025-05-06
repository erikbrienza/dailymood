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

// Recupera i dati inviati dal frontend
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = $data->password;

// Validazioni base
if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["message" => "Compila tutti i campi."]);
    exit;
}

// Cripta la password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepara la query
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["message" => "Registrazione completata con successo!"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Errore nella registrazione. L'email potrebbe essere già in uso."]);
}

$stmt->close();
$conn->close();
?>