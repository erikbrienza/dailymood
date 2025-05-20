<?php
function generate_jwt($payload, $secret = 'supersegretoErik') {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($payload);

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_'], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_'], base64_encode($payload));

    $signature = hash_hmac('sha256', "$base64UrlHeader.$base64UrlPayload", $secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_'], base64_encode($signature));

    return "$base64UrlHeader.$base64UrlPayload.$base64UrlSignature";
}

function decode_jwt($jwt) {
    $tokenParts = explode('.', $jwt);
    if (count($tokenParts) !== 3) return null;

    $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
    return json_decode($payload);
}