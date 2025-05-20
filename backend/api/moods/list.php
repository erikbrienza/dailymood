<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Token");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/db.php';
require_once '../../jwt/jwt_utils.php';

$headers = getallheaders();
$token = $headers['X-Token'] ?? null;
$decoded = decode_jwt($token);

if (!$decoded || !isset($decoded->id)) {
    echo json_encode(['success' => false, 'message' => 'Token non valido']);
    exit;
}

$stmt = $pdo->prepare("SELECT DATE(created_at) as date, mood FROM moods WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$decoded->id]);
$moods = $stmt->fetchAll();

echo json_encode(['success' => true, 'moods' => $moods]);