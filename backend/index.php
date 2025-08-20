<?php
/**
 * Ardent POS API Entry Point
 */

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/src/Router.php';
use App\Auth\AuthController;
use App\Dashboard\DashboardController;
use App\Products\ProductController;
use App\Sales\SalesController;
use App\Inventory\InventoryController;
use App\Customers\CustomerController;
use App\Orders\OrderController;
use App\Payments\PaymentController;
require_once __DIR__ . '/src/Inventory/InventoryController.php';
require_once __DIR__ . '/src/Customers/CustomerController.php';
require_once __DIR__ . '/src/Dashboard/DashboardController.php';

use Dotenv\Dotenv;

// Load environment variables
// In production (Digital Ocean), use system environment variables
// In development, try to load from .env file if it exists
if (file_exists(__DIR__ . '/../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
} elseif (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

// CORS headers
header('Access-Control-Allow-Origin: ' . ($_ENV['CORS_ORIGIN'] ?? 'http://localhost:3000'));
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Initialize router
$router = new Router();

// Route definitions
$router->addRoute('POST', '/api/auth/register', [AuthController::class, 'register']);
$router->addRoute('POST', '/api/auth/login', [AuthController::class, 'login']);
$router->addRoute('POST', '/api/auth/logout', [AuthController::class, 'logout']);
$router->addRoute('GET', '/api/auth/me', [AuthController::class, 'me']);
$router->addRoute('POST', '/api/auth/forgot-password', [AuthController::class, 'forgotPassword']);
$router->addRoute('POST', '/api/auth/reset-password', [AuthController::class, 'resetPassword']);

$router->addRoute('GET', '/api/dashboard', [DashboardController::class, 'getDashboard']);

$router->addRoute('GET', '/api/products', [ProductController::class, 'getProducts']);
$router->addRoute('POST', '/api/products', [ProductController::class, 'createProduct']);
$router->addRoute('GET', '/api/products/(\d+)', [ProductController::class, 'getProduct']);
$router->addRoute('PUT', '/api/products/(\d+)', [ProductController::class, 'updateProduct']);
$router->addRoute('DELETE', '/api/products/(\d+)', [ProductController::class, 'deleteProduct']);

$router->addRoute('GET', '/api/sales', [SalesController::class, 'getSales']);
$router->addRoute('POST', '/api/sales', [SalesController::class, 'createSale']);
$router->addRoute('GET', '/api/sales/(\d+)', [SalesController::class, 'getSale']);

$router->addRoute('GET', '/api/inventory', [InventoryController::class, 'getInventory']);
$router->addRoute('PUT', '/api/inventory/(\d+)', [InventoryController::class, 'updateStock']);
$router->addRoute('GET', '/api/inventory/low-stock', [InventoryController::class, 'getLowStock']);

$router->addRoute('GET', '/api/customers', [CustomerController::class, 'getCustomers']);
$router->addRoute('POST', '/api/customers', [CustomerController::class, 'createCustomer']);
$router->addRoute('GET', '/api/customers/(\d+)', [CustomerController::class, 'getCustomer']);
$router->addRoute('PUT', '/api/customers/(\d+)', [CustomerController::class, 'updateCustomer']);
$router->addRoute('DELETE', '/api/customers/(\d+)', [CustomerController::class, 'deleteCustomer']);

$router->addRoute('GET', '/api/orders', [OrderController::class, 'getOrders']);
$router->addRoute('POST', '/api/orders', [OrderController::class, 'createOrder']);
$router->addRoute('GET', '/api/orders/(\d+)', [OrderController::class, 'getOrder']);
$router->addRoute('PUT', '/api/orders/(\d+)/status', [OrderController::class, 'updateOrderStatus']);
$router->addRoute('GET', '/api/payments/history', [OrderController::class, 'getPaymentHistory']);

$router->addRoute('POST', '/api/payments/initialize', [PaymentController::class, 'initializePayment']);
$router->addRoute('GET', '/api/payments/verify', [PaymentController::class, 'verifyPayment']);
$router->addRoute('POST', '/api/payments/webhook', [PaymentController::class, 'webhook']);

// Handle the request
try {
    $router->dispatch();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}
?>
