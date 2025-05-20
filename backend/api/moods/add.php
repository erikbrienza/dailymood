<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Token");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/db.php';
require_once '../../jwt/jwt_utils.php';

// ✅ Usa X-Token per bypassare Apache
$headers = getallheaders();
$token = $headers['X-Token'] ?? null;

if (!$token) {
    echo json_encode(['success' => false, 'message' => 'Token mancante']);
    exit;
}

$decoded = decode_jwt($token);

if (!$decoded || !isset($decoded->id)) {
    echo json_encode(['success' => false, 'message' => 'Token non valido']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$mood = $data['mood'] ?? '';

if (!$mood) {
    echo json_encode(['success' => false, 'message' => 'Mood mancante']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO moods (user_id, mood, created_at) VALUES (?, ?, NOW())");
$success = $stmt->execute([$decoded->id, $mood]);

echo json_encode(['success' => $success]);