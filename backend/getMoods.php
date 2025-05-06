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

if (empty($user_id)) {
    http_response_code(400);
    echo json_encode(["message" => "User ID mancante."]);
    exit;
}

$sql = "SELECT mood, date FROM moods WHERE user_id = ? ORDER BY date DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$moods = [];

while ($row = $result->fetch_assoc()) {
    $moods[] = $row;
}

echo json_encode($moods);

$stmt->close();
$conn->close();
?>