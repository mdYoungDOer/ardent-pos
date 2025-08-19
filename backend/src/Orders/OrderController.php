<?php

namespace App\Orders;

use App\BaseController;
use App\Config\Database;
use Exception;

class OrderController extends BaseController {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getOrders() {
        try {
            $this->requireAuth();
            $user = $this->getCurrentUser();
            
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 20);
            $status = $_GET['status'] ?? '';
            $search = $_GET['search'] ?? '';

            $offset = ($page - 1) * $limit;
            
            // Build query based on role
            $whereClause = "WHERE 1=1";
            $params = [];

            if (!empty($status)) {
                $whereClause .= " AND o.status = ?";
                $params[] = $status;
            }

            if (!empty($search)) {
                $whereClause .= " AND (o.order_number ILIKE ? OR c.name ILIKE ?)";
                $params[] = "%$search%";
                $params[] = "%$search%";
            }

            // Role-based filtering
            if ($user['role'] === 'Cashier') {
                $whereClause .= " AND o.created_by = ?";
                $params[] = $user['id'];
            }

            $stmt = $this->db->prepare("
                SELECT o.*, c.name as customer_name, u.name as created_by_name,
                       COUNT(*) OVER() as total_count
                FROM orders o
                LEFT JOIN customers c ON o.customer_id = c.id
                LEFT JOIN users u ON o.created_by = u.id
                $whereClause
                ORDER BY o.created_at DESC
                LIMIT ? OFFSET ?
            ");
            
            $params[] = $limit;
            $params[] = $offset;
            $stmt->execute($params);
            $orders = $stmt->fetchAll();

            $totalCount = $orders[0]['total_count'] ?? 0;
            
            // Remove total_count from each order
            foreach ($orders as &$order) {
                unset($order['total_count']);
            }

            return $this->successResponse([
                'orders' => $orders,
                'pagination' => $this->getPaginationInfo($page, $limit, $totalCount)
            ]);

        } catch (Exception $e) {
            return $this->errorResponse('Failed to fetch orders: ' . $e->getMessage(), 500);
        }
    }

    public function getOrder($id) {
        try {
            $this->requireAuth();
            $user = $this->getCurrentUser();

            $stmt = $this->db->prepare("
                SELECT o.*, c.name as customer_name, c.email as customer_email,
                       u.name as created_by_name
                FROM orders o
                LEFT JOIN customers c ON o.customer_id = c.id
                LEFT JOIN users u ON o.created_by = u.id
                WHERE o.id = ?
            ");
            $stmt->execute([$id]);
            $order = $stmt->fetch();

            if (!$order) {
                return $this->errorResponse('Order not found', 404);
            }

            // Role-based access control
            if ($user['role'] === 'Cashier' && $order['created_by'] != $user['id']) {
                return $this->errorResponse('Access denied', 403);
            }

            // Get order items
            $stmt = $this->db->prepare("
                SELECT oi.*, p.name as product_name, p.sku
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = ?
                ORDER BY oi.id
            ");
            $stmt->execute([$id]);
            $order['items'] = $stmt->fetchAll();

            return $this->successResponse($order);

        } catch (Exception $e) {
            return $this->errorResponse('Failed to fetch order: ' . $e->getMessage(), 500);
        }
    }

    public function createOrder() {
        try {
            $this->requireAuth(['Admin', 'Manager', 'Cashier']);
            $user = $this->getCurrentUser();
            $input = $this->getJsonInput();

            // Validate required fields
            $required = ['customer_id', 'items', 'total_amount'];
            $validation = $this->validateRequired($input, $required);
            if (!$validation['valid']) {
                return $this->errorResponse($validation['message'], 400);
            }

            if (empty($input['items']) || !is_array($input['items'])) {
                return $this->errorResponse('Order must have at least one item', 400);
            }

            $this->db->beginTransaction();

            // Generate order number
            $orderNumber = 'ORD-' . date('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);

            // Create order
            $stmt = $this->db->prepare("
                INSERT INTO orders (order_number, customer_id, total_amount, status, 
                                  payment_status, created_by, created_at)
                VALUES (?, ?, ?, 'pending', 'pending', ?, NOW())
                RETURNING id
            ");
            $stmt->execute([
                $orderNumber,
                $input['customer_id'],
                $input['total_amount'],
                $user['id']
            ]);
            $orderId = $stmt->fetchColumn();

            // Add order items and validate stock
            foreach ($input['items'] as $item) {
                if (!isset($item['product_id'], $item['quantity'], $item['unit_price'])) {
                    throw new Exception('Invalid item data');
                }

                // Check stock availability
                $stmt = $this->db->prepare("SELECT stock_quantity FROM inventory WHERE product_id = ?");
                $stmt->execute([$item['product_id']]);
                $stock = $stmt->fetchColumn();

                if ($stock < $item['quantity']) {
                    throw new Exception("Insufficient stock for product ID: {$item['product_id']}");
                }

                // Insert order item
                $stmt = $this->db->prepare("
                    INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
                    VALUES (?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $orderId,
                    $item['product_id'],
                    $item['quantity'],
                    $item['unit_price'],
                    $item['quantity'] * $item['unit_price']
                ]);

                // Reserve stock
                $stmt = $this->db->prepare("
                    UPDATE inventory 
                    SET stock_quantity = stock_quantity - ?
                    WHERE product_id = ?
                ");
                $stmt->execute([$item['quantity'], $item['product_id']]);

                // Log inventory movement
                $stmt = $this->db->prepare("
                    INSERT INTO inventory_movements (product_id, movement_type, quantity, 
                                                   reference_type, reference_id, notes, created_by, created_at)
                    VALUES (?, 'out', ?, 'order', ?, 'Stock reserved for order', ?, NOW())
                ");
                $stmt->execute([$item['product_id'], $item['quantity'], $orderId, $user['id']]);
            }

            $this->db->commit();

            return $this->successResponse([
                'order_id' => $orderId,
                'order_number' => $orderNumber,
                'message' => 'Order created successfully'
            ]);

        } catch (Exception $e) {
            $this->db->rollBack();
            return $this->errorResponse('Failed to create order: ' . $e->getMessage(), 500);
        }
    }

    public function updateOrderStatus($id) {
        try {
            $this->requireAuth(['Admin', 'Manager']);
            $input = $this->getJsonInput();

            $required = ['status'];
            $validation = $this->validateRequired($input, $required);
            if (!$validation['valid']) {
                return $this->errorResponse($validation['message'], 400);
            }

            $validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
            if (!in_array($input['status'], $validStatuses)) {
                return $this->errorResponse('Invalid status', 400);
            }

            $stmt = $this->db->prepare("
                UPDATE orders 
                SET status = ?, updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$input['status'], $id]);

            if ($stmt->rowCount() === 0) {
                return $this->errorResponse('Order not found', 404);
            }

            return $this->successResponse(['message' => 'Order status updated successfully']);

        } catch (Exception $e) {
            return $this->errorResponse('Failed to update order: ' . $e->getMessage(), 500);
        }
    }

    public function getPaymentHistory() {
        try {
            $this->requireAuth();
            
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 20);
            $offset = ($page - 1) * $limit;

            $stmt = $this->db->prepare("
                SELECT p.*, s.sale_number, c.name as customer_name,
                       COUNT(*) OVER() as total_count
                FROM payments p
                LEFT JOIN sales s ON p.sale_id = s.id
                LEFT JOIN customers c ON s.customer_id = c.id
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?
            ");
            $stmt->execute([$limit, $offset]);
            $payments = $stmt->fetchAll();

            $totalCount = $payments[0]['total_count'] ?? 0;
            
            foreach ($payments as &$payment) {
                unset($payment['total_count']);
            }

            return $this->successResponse([
                'payments' => $payments,
                'pagination' => $this->getPaginationInfo($page, $limit, $totalCount)
            ]);

        } catch (Exception $e) {
            return $this->errorResponse('Failed to fetch payment history: ' . $e->getMessage(), 500);
        }
    }

    private function makePaystackRequest($endpoint, $data = null, $method = 'POST') {
        $url = "https://api.paystack.co/$endpoint";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->paystackSecretKey,
            'Content-Type: application/json'
        ]);

        if ($method === 'POST' && $data) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }
}
