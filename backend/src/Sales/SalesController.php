<?php
/**
 * Sales Controller for Ardent POS
 */

namespace App\Sales;

use App\Core\BaseController;
use App\Core\Database;
use PDOException;
use Exception;

class SalesController extends BaseController {
    
    public function index() {
        $this->requireAuth(['admin', 'manager', 'cashier']);
        
        try {
            $pdo = Database::getConnection();
            $pagination = $this->getPagination();
            
            // Build query with filters
            $dateFrom = $_GET['date_from'] ?? '';
            $dateTo = $_GET['date_to'] ?? '';
            $status = $_GET['status'] ?? '';
            
            $whereClause = "WHERE 1=1";
            $params = [];
            
            if ($dateFrom) {
                $whereClause .= " AND DATE(s.created_at) >= ?";
                $params[] = $dateFrom;
            }
            
            if ($dateTo) {
                $whereClause .= " AND DATE(s.created_at) <= ?";
                $params[] = $dateTo;
            }
            
            if ($status) {
                $whereClause .= " AND s.payment_status = ?";
                $params[] = $status;
            }
            
            // Get total count
            $countStmt = $pdo->prepare("SELECT COUNT(*) FROM sales s {$whereClause}");
            $countStmt->execute($params);
            $totalCount = $countStmt->fetchColumn();
            
            // Get sales
            $stmt = $pdo->prepare("
                SELECT 
                    s.id,
                    s.sale_number,
                    s.subtotal,
                    s.tax_amount,
                    s.discount_amount,
                    s.total_amount,
                    s.payment_method,
                    s.payment_status,
                    s.created_at,
                    COALESCE(c.first_name || ' ' || c.last_name, 'Walk-in Customer') as customer_name,
                    COALESCE(u.first_name || ' ' || u.last_name, 'System') as cashier_name
                FROM sales s
                LEFT JOIN customers c ON s.customer_id = c.id
                LEFT JOIN users u ON s.cashier_id = u.id
                {$whereClause}
                ORDER BY s.created_at DESC
                LIMIT ? OFFSET ?
            ");
            
            $stmt->execute(array_merge($params, [$pagination['limit'], $pagination['offset']]));
            $sales = $stmt->fetchAll();
            
            return $this->success([
                'sales' => $sales,
                'pagination' => [
                    'page' => $pagination['page'],
                    'limit' => $pagination['limit'],
                    'total' => (int) $totalCount,
                    'pages' => ceil($totalCount / $pagination['limit'])
                ]
            ]);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch sales', 500);
        }
    }
    
    public function store() {
        $this->requireAuth(['admin', 'manager', 'cashier']);
        
        $data = $this->getJsonInput();
        $required = ['items', 'payment_method'];
        
        if (!$this->validateRequired($data, $required)) {
            return $this->error('Missing required fields', 400);
        }
        
        if (empty($data['items'])) {
            return $this->error('Sale must have at least one item', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            $pdo->beginTransaction();
            
            $user = $this->getCurrentUser();
            
            // Calculate totals
            $subtotal = 0;
            $validatedItems = [];
            
            foreach ($data['items'] as $item) {
                if (!isset($item['product_id']) || !isset($item['quantity']) || $item['quantity'] <= 0) {
                    throw new Exception('Invalid item data');
                }
                
                // Get product details and check stock
                $stmt = $pdo->prepare("
                    SELECT p.id, p.name, p.price, p.tax_rate, i.quantity as stock
                    FROM products p
                    LEFT JOIN inventory i ON p.id = i.product_id
                    WHERE p.id = ? AND p.is_active = true
                ");
                $stmt->execute([$item['product_id']]);
                $product = $stmt->fetch();
                
                if (!$product) {
                    throw new Exception("Product not found: {$item['product_id']}");
                }
                
                if ($product['stock'] < $item['quantity']) {
                    throw new Exception("Insufficient stock for product: {$product['name']}");
                }
                
                $unitPrice = $item['unit_price'] ?? $product['price'];
                $lineTotal = $unitPrice * $item['quantity'];
                
                $validatedItems[] = [
                    'product_id' => $product['id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'line_total' => $lineTotal,
                    'tax_rate' => $product['tax_rate']
                ];
                
                $subtotal += $lineTotal;
            }
            
            // Calculate tax and total
            $taxAmount = $data['tax_amount'] ?? 0;
            $discountAmount = $data['discount_amount'] ?? 0;
            $totalAmount = $subtotal + $taxAmount - $discountAmount;
            
            // Generate sale number
            $saleNumber = 'SALE-' . date('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            
            // Insert sale
            $stmt = $pdo->prepare("
                INSERT INTO sales (
                    sale_number, customer_id, cashier_id, subtotal, tax_amount, 
                    discount_amount, total_amount, payment_method, payment_status, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                RETURNING id
            ");
            
            $stmt->execute([
                $saleNumber,
                $data['customer_id'] ?? null,
                $user['id'],
                $subtotal,
                $taxAmount,
                $discountAmount,
                $totalAmount,
                $data['payment_method'],
                $data['payment_status'] ?? 'paid',
                $data['notes'] ?? null
            ]);
            
            $saleId = $stmt->fetchColumn();
            
            // Insert sale items
            foreach ($validatedItems as $item) {
                $stmt = $pdo->prepare("
                    INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, line_total)
                    VALUES (?, ?, ?, ?, ?)
                ");
                
                $stmt->execute([
                    $saleId,
                    $item['product_id'],
                    $item['quantity'],
                    $item['unit_price'],
                    $item['line_total']
                ]);
            }
            
            $pdo->commit();
            
            return $this->success([
                'id' => $saleId,
                'sale_number' => $saleNumber,
                'total_amount' => $totalAmount,
                'message' => 'Sale completed successfully'
            ], 201);
            
        } catch (Exception $e) {
            $pdo->rollback();
            return $this->error($e->getMessage(), 400);
        } catch (PDOException $e) {
            $pdo->rollback();
            return $this->error('Failed to process sale', 500);
        }
    }
    
    public function getSale($id) {
        $this->requireAuth(['admin', 'manager', 'cashier']);
        
        try {
            $pdo = Database::getConnection();
            
            // Get sale details
            $stmt = $pdo->prepare("
                SELECT 
                    s.*,
                    COALESCE(c.first_name || ' ' || c.last_name, 'Walk-in Customer') as customer_name,
                    c.email as customer_email,
                    c.phone as customer_phone,
                    COALESCE(u.first_name || ' ' || u.last_name, 'System') as cashier_name
                FROM sales s
                LEFT JOIN customers c ON s.customer_id = c.id
                LEFT JOIN users u ON s.cashier_id = u.id
                WHERE s.id = ?
            ");
            
            $stmt->execute([$id]);
            $sale = $stmt->fetch();
            
            if (!$sale) {
                return $this->error('Sale not found', 404);
            }
            
            // Get sale items
            $stmt = $pdo->prepare("
                SELECT 
                    si.*,
                    p.name as product_name,
                    p.sku
                FROM sale_items si
                JOIN products p ON si.product_id = p.id
                WHERE si.sale_id = ?
                ORDER BY si.created_at
            ");
            
            $stmt->execute([$id]);
            $sale['items'] = $stmt->fetchAll();
            
            return $this->success($sale);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch sale', 500);
        }
    }
}
?>
