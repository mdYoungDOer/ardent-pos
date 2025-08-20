<?php
/**
 * Authentication Controller for Ardent POS
 */

namespace App\Auth;

use App\Core\BaseController;
use App\Core\Database;
use App\Core\JWTHelper;

class AuthController extends BaseController {
    
    public function register() {
        $data = $this->getJsonInput();
        
        // Validate required fields
        $required = ['username', 'email', 'password', 'first_name', 'last_name', 'role'];
        if (!$this->validateRequired($data, $required)) {
            return $this->error('Missing required fields', 400);
        }
        
        // Check role permissions (only admin can create users)
        $currentUser = $this->getCurrentUser();
        if (!$currentUser || $currentUser['role'] !== 'admin') {
            return $this->error('Unauthorized', 403);
        }
        
        try {
            $pdo = Database::getConnection();
            
            // Check if user already exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
            $stmt->execute([$data['username'], $data['email']]);
            if ($stmt->fetch()) {
                return $this->error('User already exists', 409);
            }
            
            // Create user
            $stmt = $pdo->prepare("
                INSERT INTO users (username, email, password_hash, first_name, last_name, role)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
            $stmt->execute([
                $data['username'],
                $data['email'],
                $passwordHash,
                $data['first_name'],
                $data['last_name'],
                $data['role']
            ]);
            
            return $this->success(['message' => 'User created successfully']);
            
        } catch (PDOException $e) {
            return $this->error('Registration failed', 500);
        }
    }
    
    public function login() {
        $data = $this->getJsonInput();
        
        if (!isset($data['username']) || !isset($data['password'])) {
            return $this->error('Username and password required', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            
            $stmt = $pdo->prepare("
                SELECT id, username, email, password_hash, first_name, last_name, role, is_active
                FROM users 
                WHERE username = ? OR email = ?
            ");
            $stmt->execute([$data['username'], $data['username']]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($data['password'], $user['password_hash'])) {
                return $this->error('Invalid credentials', 401);
            }
            
            if (!$user['is_active']) {
                return $this->error('Account is inactive', 403);
            }
            
            // Generate JWT token
            $payload = [
                'user_id' => $user['id'],
                'username' => $user['username'],
                'role' => $user['role'],
                'exp' => time() + (24 * 60 * 60) // 24 hours
            ];
            
            $token = JWTHelper::encode($payload);
            
            return $this->success([
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'role' => $user['role']
                ]
            ]);
            
        } catch (PDOException $e) {
            return $this->error('Login failed', 500);
        }
    }
    
    public function logout() {
        // For JWT, logout is handled client-side by removing the token
        return $this->success(['message' => 'Logged out successfully']);
    }
    
    public function me() {
        $user = $this->getCurrentUser();
        if (!$user) {
            return $this->error('Unauthorized', 401);
        }
        
        return $this->success(['user' => $user]);
    }
    
    public function forgotPassword() {
        $data = $this->getJsonInput();
        
        if (!isset($data['email'])) {
            return $this->error('Email required', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            
            $stmt = $pdo->prepare("SELECT id, email, first_name FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            $user = $stmt->fetch();
            
            if ($user) {
                // Generate reset token
                $token = bin2hex(random_bytes(32));
                $expires = date('Y-m-d H:i:s', time() + 3600); // 1 hour
                
                $stmt = $pdo->prepare("
                    UPDATE users 
                    SET password_reset_token = ?, password_reset_expires = ?
                    WHERE id = ?
                ");
                $stmt->execute([$token, $expires, $user['id']]);
                
                // TODO: Send email with reset link
                // EmailService::sendPasswordReset($user['email'], $token);
            }
            
            // Always return success for security
            return $this->success(['message' => 'If email exists, reset link has been sent']);
            
        } catch (PDOException $e) {
            return $this->error('Password reset failed', 500);
        }
    }
    
    public function resetPassword() {
        $data = $this->getJsonInput();
        
        if (!isset($data['token']) || !isset($data['password'])) {
            return $this->error('Token and password required', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            
            $stmt = $pdo->prepare("
                SELECT id FROM users 
                WHERE password_reset_token = ? 
                AND password_reset_expires > NOW()
            ");
            $stmt->execute([$data['token']]);
            $user = $stmt->fetch();
            
            if (!$user) {
                return $this->error('Invalid or expired token', 400);
            }
            
            $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
            
            $stmt = $pdo->prepare("
                UPDATE users 
                SET password_hash = ?, password_reset_token = NULL, password_reset_expires = NULL
                WHERE id = ?
            ");
            $stmt->execute([$passwordHash, $user['id']]);
            
            return $this->success(['message' => 'Password reset successfully']);
            
        } catch (PDOException $e) {
            return $this->error('Password reset failed', 500);
        }
    }
}
?>
