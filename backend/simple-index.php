<?php
// Simple working backend for Ardent POS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Simple routing
if ($path === '/auth/login' && $method === 'POST') {
    handleLogin();
} elseif ($path === '/dashboard' && $method === 'GET') {
    handleDashboard();
} elseif ($path === '/test' || $path === '/test.php') {
    handleTest();
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found', 'path' => $path, 'method' => $method]);
}

function handleLogin() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['username']) || !isset($input['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password required']);
        return;
    }
    
    // Hardcoded admin credentials for testing
    if (($input['username'] === 'deyoungdoer@gmail.com' || $input['username'] === 'admin') 
        && $input['password'] === '@am171293GH!!') {
        
        $token = base64_encode(json_encode([
            'user_id' => 1,
            'username' => 'deyoungdoer@gmail.com',
            'role' => 'admin',
            'exp' => time() + 3600
        ]));
        
        echo json_encode([
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => 1,
                    'username' => 'deyoungdoer@gmail.com',
                    'email' => 'deyoungdoer@gmail.com',
                    'first_name' => 'Admin',
                    'last_name' => 'User',
                    'role' => 'admin'
                ]
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

function handleDashboard() {
    echo json_encode([
        'success' => true,
        'data' => [
            'total_sales' => 15420.50,
            'total_orders' => 127,
            'total_customers' => 89,
            'total_products' => 234,
            'recent_sales' => [
                ['id' => 1, 'customer' => 'John Doe', 'amount' => 125.50, 'date' => date('Y-m-d H:i:s')],
                ['id' => 2, 'customer' => 'Jane Smith', 'amount' => 89.99, 'date' => date('Y-m-d H:i:s')]
            ]
        ]
    ]);
}

function handleTest() {
    echo json_encode([
        'success' => true,
        'message' => 'Simple backend is working',
        'timestamp' => date('Y-m-d H:i:s'),
        'method' => $_SERVER['REQUEST_METHOD'],
        'path' => $_SERVER['REQUEST_URI']
    ]);
}
?>
