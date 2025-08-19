<?php
/**
 * JWT Helper for Ardent POS
 */

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHelper {
    private static function getSecretKey() {
        return $_ENV['JWT_SECRET'] ?? 'your-secret-key-change-this-in-production';
    }
    
    public static function encode($payload) {
        return JWT::encode($payload, self::getSecretKey(), 'HS256');
    }
    
    public static function decode($token) {
        try {
            $decoded = JWT::decode($token, new Key(self::getSecretKey(), 'HS256'));
            return (array) $decoded;
        } catch (Exception $e) {
            throw new Exception('Invalid token');
        }
    }
}
?>
