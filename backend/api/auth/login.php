<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../../config/db.php';
require_once '../../jwt/jwt_utils.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $payload = [
        'id' => $user['id'],
        'email' => $user['email'],
        'exp' => time() + (60 * 60),
    ];
    $jwt = generate_jwt($payload);
    echo json_encode(['success' => true, 'token' => $jwt]);
} else {
    echo json_encode(['success' => false, 'message' => 'Credenziali non valide']);
}