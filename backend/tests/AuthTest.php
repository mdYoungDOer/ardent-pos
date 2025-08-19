<?php

use PHPUnit\Framework\TestCase;
use App\Auth\AuthController;
use App\Config\Database;

class AuthTest extends TestCase {
    private $authController;
    private $db;

    protected function setUp(): void {
        $this->authController = new AuthController();
        $this->db = Database::getInstance()->getConnection();
        
        // Set up test environment
        $_ENV['JWT_SECRET'] = 'test_secret_key';
    }

    public function testUserRegistration() {
        // Mock input data
        $_POST = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'role' => 'Cashier'
        ];

        // Test registration
        ob_start();
        $this->authController->register();
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        
        $this->assertArrayHasKey('message', $response);
        $this->assertEquals('User registered successfully', $response['message']);
    }

    public function testUserLogin() {
        // First register a user
        $this->testUserRegistration();
        
        // Mock login data
        $_POST = [
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        ob_start();
        $this->authController->login();
        $output = ob_get_clean();
        
        $response = json_decode($output, true);
        
        $this->assertArrayHasKey('token', $response);
        $this->assertArrayHasKey('user', $response);
    }

    protected function tearDown(): void {
        // Clean up test data
        $stmt = $this->db->prepare("DELETE FROM users WHERE email = ?");
        $stmt->execute(['test@example.com']);
    }
}
