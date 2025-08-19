<?php
/**
 * Customer Controller for Ardent POS
 */

require_once __DIR__ . '/../BaseController.php';

class CustomerController extends BaseController {
    
    public function index() {
        $this->requireAuth(['admin', 'manager']);
        
        try {
            $pdo = Database::getConnection();
            $pagination = $this->getPagination();
            
            // Build query with search
            $search = $_GET['search'] ?? '';
            
            $whereClause = "WHERE c.is_active = true";
            $params = [];
            
            if ($search) {
                $whereClause .= " AND (c.first_name ILIKE ? OR c.last_name ILIKE ? OR c.email ILIKE ? OR c.phone ILIKE ?)";
                $searchTerm = "%{$search}%";
                $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
            }
            
            // Get total count
            $countStmt = $pdo->prepare("SELECT COUNT(*) FROM customers c {$whereClause}");
            $countStmt->execute($params);
            $totalCount = $countStmt->fetchColumn();
            
            // Get customers with purchase stats
            $stmt = $pdo->prepare("
                SELECT 
                    c.*,
                    COUNT(s.id) as total_orders,
                    COALESCE(SUM(s.total_amount), 0) as total_spent,
                    MAX(s.created_at) as last_purchase
                FROM customers c
                LEFT JOIN sales s ON c.id = s.customer_id AND s.payment_status = 'paid'
                {$whereClause}
                GROUP BY c.id, c.first_name, c.last_name, c.email, c.phone, c.address, c.loyalty_points, c.is_active, c.created_at, c.updated_at
                ORDER BY c.created_at DESC
                LIMIT ? OFFSET ?
            ");
            
            $stmt->execute(array_merge($params, [$pagination['limit'], $pagination['offset']]));
            $customers = $stmt->fetchAll();
            
            return $this->success([
                'customers' => $customers,
                'pagination' => [
                    'page' => $pagination['page'],
                    'limit' => $pagination['limit'],
                    'total' => (int) $totalCount,
                    'pages' => ceil($totalCount / $pagination['limit'])
                ]
            ]);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch customers', 500);
        }
    }
    
    public function store() {
        $this->requireAuth(['admin', 'manager']);
        
        $data = $this->getJsonInput();
        $required = ['first_name', 'last_name'];
        
        if (!$this->validateRequired($data, $required)) {
            return $this->error('Missing required fields', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            
            // Check if customer with email already exists
            if (!empty($data['email'])) {
                $stmt = $pdo->prepare("SELECT id FROM customers WHERE email = ? AND is_active = true");
                $stmt->execute([$data['email']]);
                if ($stmt->fetch()) {
                    return $this->error('Customer with this email already exists', 409);
                }
            }
            
            $stmt = $pdo->prepare("
                INSERT INTO customers (first_name, last_name, email, phone, address, loyalty_points)
                VALUES (?, ?, ?, ?, ?, ?)
                RETURNING id
            ");
            
            $stmt->execute([
                $data['first_name'],
                $data['last_name'],
                $data['email'] ?? null,
                $data['phone'] ?? null,
                $data['address'] ?? null,
                $data['loyalty_points'] ?? 0
            ]);
            
            $customerId = $stmt->fetchColumn();
            
            return $this->success(['id' => $customerId, 'message' => 'Customer created successfully'], 201);
            
        } catch (PDOException $e) {
            return $this->error('Failed to create customer', 500);
        }
    }
    
    public function show($id) {
        $this->requireAuth(['admin', 'manager']);
        
        try {
            $pdo = Database::getConnection();
            
            // Get customer details with purchase history
            $stmt = $pdo->prepare("
                SELECT 
                    c.*,
                    COUNT(s.id) as total_orders,
                    COALESCE(SUM(s.total_amount), 0) as total_spent,
                    MAX(s.created_at) as last_purchase
                FROM customers c
                LEFT JOIN sales s ON c.id = s.customer_id AND s.payment_status = 'paid'
                WHERE c.id = ? AND c.is_active = true
                GROUP BY c.id, c.first_name, c.last_name, c.email, c.phone, c.address, c.loyalty_points, c.is_active, c.created_at, c.updated_at
            ");
            
            $stmt->execute([$id]);
            $customer = $stmt->fetch();
            
            if (!$customer) {
                return $this->error('Customer not found', 404);
            }
            
            // Get recent purchases
            $stmt = $pdo->prepare("
                SELECT 
                    s.id,
                    s.sale_number,
                    s.total_amount,
                    s.payment_method,
                    s.created_at
                FROM sales s
                WHERE s.customer_id = ? AND s.payment_status = 'paid'
                ORDER BY s.created_at DESC
                LIMIT 10
            ");
            
            $stmt->execute([$id]);
            $customer['recent_purchases'] = $stmt->fetchAll();
            
            return $this->success($customer);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch customer', 500);
        }
    }
    
    public function update($id) {
        $this->requireAuth(['admin', 'manager']);
        
        $data = $this->getJsonInput();
        
        try {
            $pdo = Database::getConnection();
            
            // Check if customer exists
            $stmt = $pdo->prepare("SELECT id FROM customers WHERE id = ? AND is_active = true");
            $stmt->execute([$id]);
            if (!$stmt->fetch()) {
                return $this->error('Customer not found', 404);
            }
            
            // Check email uniqueness if updating email
            if (!empty($data['email'])) {
                $stmt = $pdo->prepare("SELECT id FROM customers WHERE email = ? AND id != ? AND is_active = true");
                $stmt->execute([$data['email'], $id]);
                if ($stmt->fetch()) {
                    return $this->error('Customer with this email already exists', 409);
                }
            }
            
            // Build update query dynamically
            $updateFields = [];
            $params = [];
            
            $allowedFields = ['first_name', 'last_name', 'email', 'phone', 'address', 'loyalty_points'];
            
            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updateFields[] = "{$field} = ?";
                    $params[] = $data[$field];
                }
            }
            
            if (empty($updateFields)) {
                return $this->error('No fields to update', 400);
            }
            
            $params[] = $id;
            
            $stmt = $pdo->prepare("
                UPDATE customers 
                SET " . implode(', ', $updateFields) . ", updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ");
            
            $stmt->execute($params);
            
            return $this->success(['message' => 'Customer updated successfully']);
            
        } catch (PDOException $e) {
            return $this->error('Failed to update customer', 500);
        }
    }
    
    public function destroy($id) {
        $this->requireAuth(['admin', 'manager']);
        
        try {
            $pdo = Database::getConnection();
            
            // Soft delete - set is_active to false
            $stmt = $pdo->prepare("
                UPDATE customers 
                SET is_active = false, updated_at = CURRENT_TIMESTAMP
                WHERE id = ? AND is_active = true
            ");
            
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() === 0) {
                return $this->error('Customer not found', 404);
            }
            
            return $this->success(['message' => 'Customer deleted successfully']);
            
        } catch (PDOException $e) {
            return $this->error('Failed to delete customer', 500);
        }
    }
}
?>
