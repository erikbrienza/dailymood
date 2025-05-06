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

$user_id = $data->user_id;
$mood = $data->mood;
$date = date('Y-m-d'); // data di oggi

// Controllo campi
if (empty($user_id) || empty($mood)) {
    http_response_code(400);
    echo json_encode(["message" => "Compila tutti i campi."]);
    exit;
}

// Controllo se l'utente ha già inserito l'umore per oggi
$sqlCheck = "SELECT * FROM moods WHERE user_id = ? AND date = ?";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("is", $user_id, $date);
$stmtCheck->execute();
$result = $stmtCheck->get_result();

if ($result->num_rows > 0) {
    http_response_code(400);
    echo json_encode(["message" => "Hai già registrato l'umore per oggi."]);
    exit;
}

// Inserisce l'umore
$sql = "INSERT INTO moods (user_id, mood, date) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $user_id, $mood, $date);

if ($stmt->execute()) {
    echo json_encode(["message" => "Umore salvato con successo!"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Errore nel salvataggio dell'umore."]);
}

$stmt->close();
$conn->close();
?>