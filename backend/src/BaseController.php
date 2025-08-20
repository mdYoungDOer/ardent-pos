<?php
/**
 * Base Controller for Ardent POS API
 */

namespace App\Core;

use App\Auth\JWTHelper;
use Exception;

abstract class BaseController {
    
    protected function getJsonInput() {
        $input = file_get_contents('php://input');
        return json_decode($input, true) ?? [];
    }
    
    protected function success($data = null, $code = 200) {
        http_response_code($code);
        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
        exit;
    }
    
    protected function error($message, $code = 400, $details = null) {
        http_response_code($code);
        $response = [
            'success' => false,
            'error' => $message
        ];
        
        if ($details) {
            $response['details'] = $details;
        }
        
        echo json_encode($response);
        exit;
    }
    
    protected function validateRequired($data, $required) {
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return false;
            }
        }
        return true;
    }
    
    protected function getCurrentUser() {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;
        
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return null;
        }
        
        $token = substr($authHeader, 7);
        
        try {
                        $payload = (array) JWTHelper::decode($token);
            
            // Get fresh user data from database
            $pdo = Database::getConnection();
            $stmt = $pdo->prepare("
                SELECT id, username, email, first_name, last_name, role, is_active
                FROM users WHERE id = ?
            ");
            $stmt->execute([$payload['user_id']]);
            $user = $stmt->fetch();
            
            if (!$user || !$user['is_active']) {
                return null;
            }
            
            return $user;
            
        } catch (Exception $e) {
            return null;
        }
    }
    
    protected function requireAuth($roles = []) {
        $user = $this->getCurrentUser();
        
        if (!$user) {
            $this->error('Unauthorized', 401);
        }
        
        if (!empty($roles) && !in_array($user['role'], $roles)) {
            $this->error('Insufficient permissions', 403);
        }
        
        return $user;
    }
    
    protected function getPagination($defaultLimit = 20) {
        $page = max(1, (int)($_GET['page'] ?? 1));
        $limit = min(100, max(1, (int)($_GET['limit'] ?? $defaultLimit)));
        $offset = ($page - 1) * $limit;
        
        return [
            'page' => $page,
            'limit' => $limit,
            'offset' => $offset
        ];
    }
}
?>
