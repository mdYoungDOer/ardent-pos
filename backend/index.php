<?php
/**
 * Ardent POS API Entry Point
 */

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/database.php';

use App\Auth\AuthController;
use App\Controllers\ContactController;
use App\Core\Router;
use App\Customers\CustomerController;
use App\Dashboard\DashboardController;
use App\Inventory\InventoryController;
use App\Orders\OrderController;
use App\Payments\PaymentController;
use App\Products\ProductController;
use App\Sales\SalesController;

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
$router->addRoute('POST', '/auth/register', [AuthController::class, 'register']);
$router->addRoute('POST', '/auth/login', [AuthController::class, 'login']);
$router->addRoute('POST', '/auth/logout', [AuthController::class, 'logout']);
$router->addRoute('GET', '/auth/me', [AuthController::class, 'me']);
$router->addRoute('POST', '/auth/forgot-password', [AuthController::class, 'forgotPassword']);
$router->addRoute('POST', '/auth/reset-password', [AuthController::class, 'resetPassword']);

$router->addRoute('GET', '/dashboard', [DashboardController::class, 'getDashboard']);

$router->addRoute('GET', '/products', [ProductController::class, 'getProducts']);
$router->addRoute('POST', '/products', [ProductController::class, 'createProduct']);
$router->addRoute('GET', '/products/(\d+)', [ProductController::class, 'getProduct']);
$router->addRoute('PUT', '/products/(\d+)', [ProductController::class, 'updateProduct']);
$router->addRoute('DELETE', '/products/(\d+)', [ProductController::class, 'deleteProduct']);

$router->addRoute('GET', '/sales', [SalesController::class, 'getSales']);
$router->addRoute('POST', '/sales', [SalesController::class, 'createSale']);
$router->addRoute('GET', '/sales/(\d+)', [SalesController::class, 'getSale']);

$router->addRoute('GET', '/inventory', [InventoryController::class, 'getInventory']);
$router->addRoute('PUT', '/inventory/(\d+)', [InventoryController::class, 'updateStock']);
$router->addRoute('GET', '/inventory/low-stock', [InventoryController::class, 'getLowStock']);

$router->addRoute('GET', '/customers', [CustomerController::class, 'getCustomers']);
$router->addRoute('POST', '/customers', [CustomerController::class, 'createCustomer']);
$router->addRoute('GET', '/customers/(\d+)', [CustomerController::class, 'getCustomer']);
$router->addRoute('PUT', '/customers/(\d+)', [CustomerController::class, 'updateCustomer']);
$router->addRoute('DELETE', '/customers/(\d+)', [CustomerController::class, 'deleteCustomer']);

$router->addRoute('GET', '/orders', [OrderController::class, 'getOrders']);
$router->addRoute('POST', '/orders', [OrderController::class, 'createOrder']);
$router->addRoute('GET', '/orders/(\d+)', [OrderController::class, 'getOrder']);
$router->addRoute('PUT', '/orders/(\d+)/status', [OrderController::class, 'updateOrderStatus']);
$router->addRoute('GET', '/payments/history', [OrderController::class, 'getPaymentHistory']);

$router->addRoute('POST', '/payments/initialize', [PaymentController::class, 'initializePayment']);
$router->addRoute('GET', '/payments/verify', [PaymentController::class, 'verifyPayment']);
$router->addRoute('POST', '/payments/webhook', [PaymentController::class, 'webhook']);

$router->addRoute('POST', '/contact', [ContactController::class, 'submit']);
$router->addRoute('GET', '/contact/submissions', [ContactController::class, 'getSubmissions']);

// Handle the request
try {
    $router->dispatch();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}
?>
