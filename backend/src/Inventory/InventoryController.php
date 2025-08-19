<?php
/**
 * Inventory Controller for Ardent POS
 */

require_once __DIR__ . '/../BaseController.php';

class InventoryController extends BaseController {
    
    public function index() {
        $this->requireAuth(['admin', 'manager', 'inventory_staff']);
        
        try {
            $pdo = Database::getConnection();
            $pagination = $this->getPagination();
            
            // Build query with filters
            $search = $_GET['search'] ?? '';
            $filter = $_GET['filter'] ?? '';
            
            $whereClause = "WHERE p.is_active = true";
            $params = [];
            
            if ($search) {
                $whereClause .= " AND (p.name ILIKE ? OR p.sku ILIKE ?)";
                $searchTerm = "%{$search}%";
                $params = array_merge($params, [$searchTerm, $searchTerm]);
            }
            
            if ($filter === 'low') {
                $whereClause .= " AND i.quantity <= i.low_stock_threshold";
            } elseif ($filter === 'out') {
                $whereClause .= " AND i.quantity = 0";
            }
            
            // Get total count
            $countStmt = $pdo->prepare("
                SELECT COUNT(*) 
                FROM products p 
                JOIN inventory i ON p.id = i.product_id 
                LEFT JOIN categories c ON p.category_id = c.id 
                {$whereClause}
            ");
            $countStmt->execute($params);
            $totalCount = $countStmt->fetchColumn();
            
            // Get inventory items
            $stmt = $pdo->prepare("
                SELECT 
                    p.id,
                    p.name,
                    p.sku,
                    p.price,
                    c.name as category_name,
                    i.quantity,
                    i.low_stock_threshold,
                    i.last_restocked,
                    i.updated_at,
                    CASE 
                        WHEN i.quantity = 0 THEN 'out_of_stock'
                        WHEN i.quantity <= i.low_stock_threshold THEN 'low_stock'
                        ELSE 'in_stock'
                    END as stock_status
                FROM products p
                JOIN inventory i ON p.id = i.product_id
                LEFT JOIN categories c ON p.category_id = c.id
                {$whereClause}
                ORDER BY 
                    CASE 
                        WHEN i.quantity = 0 THEN 1
                        WHEN i.quantity <= i.low_stock_threshold THEN 2
                        ELSE 3
                    END,
                    p.name
                LIMIT ? OFFSET ?
            ");
            
            $stmt->execute(array_merge($params, [$pagination['limit'], $pagination['offset']]));
            $inventory = $stmt->fetchAll();
            
            return $this->success([
                'inventory' => $inventory,
                'pagination' => [
                    'page' => $pagination['page'],
                    'limit' => $pagination['limit'],
                    'total' => (int) $totalCount,
                    'pages' => ceil($totalCount / $pagination['limit'])
                ]
            ]);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch inventory', 500);
        }
    }
    
    public function update($id) {
        $this->requireAuth(['admin', 'manager', 'inventory_staff']);
        
        $data = $this->getJsonInput();
        
        if (!isset($data['quantity']) && !isset($data['low_stock_threshold'])) {
            return $this->error('No fields to update', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            $pdo->beginTransaction();
            
            $user = $this->getCurrentUser();
            
            // Get current inventory
            $stmt = $pdo->prepare("
                SELECT i.*, p.name as product_name
                FROM inventory i
                JOIN products p ON i.product_id = p.id
                WHERE i.product_id = ?
            ");
            $stmt->execute([$id]);
            $currentInventory = $stmt->fetch();
            
            if (!$currentInventory) {
                return $this->error('Product not found in inventory', 404);
            }
            
            $updateFields = [];
            $params = [];
            
            // Handle quantity update
            if (isset($data['quantity'])) {
                $newQuantity = (int) $data['quantity'];
                $oldQuantity = (int) $currentInventory['quantity'];
                $quantityChange = $newQuantity - $oldQuantity;
                
                $updateFields[] = "quantity = ?";
                $params[] = $newQuantity;
                
                if ($quantityChange !== 0) {
                    // Log inventory movement
                    $movementType = $quantityChange > 0 ? 'restock' : 'adjustment';
                    $stmt = $pdo->prepare("
                        INSERT INTO inventory_movements (
                            product_id, movement_type, quantity_change, 
                            notes, user_id, created_at
                        ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                    ");
                    
                    $notes = $data['notes'] ?? ($quantityChange > 0 ? 'Stock replenishment' : 'Stock adjustment');
                    $stmt->execute([
                        $id,
                        $movementType,
                        $quantityChange,
                        $notes,
                        $user['id']
                    ]);
                    
                    if ($quantityChange > 0) {
                        $updateFields[] = "last_restocked = CURRENT_TIMESTAMP";
                    }
                }
            }
            
            // Handle threshold update
            if (isset($data['low_stock_threshold'])) {
                $updateFields[] = "low_stock_threshold = ?";
                $params[] = (int) $data['low_stock_threshold'];
            }
            
            if (!empty($updateFields)) {
                $updateFields[] = "updated_at = CURRENT_TIMESTAMP";
                $params[] = $id;
                
                $stmt = $pdo->prepare("
                    UPDATE inventory 
                    SET " . implode(', ', $updateFields) . "
                    WHERE product_id = ?
                ");
                $stmt->execute($params);
            }
            
            $pdo->commit();
            
            return $this->success(['message' => 'Inventory updated successfully']);
            
        } catch (PDOException $e) {
            $pdo->rollback();
            return $this->error('Failed to update inventory', 500);
        }
    }
    
    public function lowStock() {
        $this->requireAuth(['admin', 'manager', 'inventory_staff']);
        
        try {
            $pdo = Database::getConnection();
            
            $stmt = $pdo->prepare("
                SELECT 
                    p.id,
                    p.name,
                    p.sku,
                    c.name as category_name,
                    i.quantity,
                    i.low_stock_threshold,
                    i.updated_at
                FROM products p
                JOIN inventory i ON p.id = i.product_id
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.is_active = true 
                AND i.quantity <= i.low_stock_threshold
                ORDER BY 
                    CASE WHEN i.quantity = 0 THEN 1 ELSE 2 END,
                    i.quantity ASC,
                    p.name
            ");
            
            $stmt->execute();
            $lowStockItems = $stmt->fetchAll();
            
            return $this->success($lowStockItems);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch low stock items', 500);
        }
    }
    
    public function movements($productId) {
        $this->requireAuth(['admin', 'manager', 'inventory_staff']);
        
        try {
            $pdo = Database::getConnection();
            $pagination = $this->getPagination(10);
            
            // Get movements for specific product
            $stmt = $pdo->prepare("
                SELECT 
                    im.*,
                    p.name as product_name,
                    COALESCE(u.first_name || ' ' || u.last_name, 'System') as user_name
                FROM inventory_movements im
                JOIN products p ON im.product_id = p.id
                LEFT JOIN users u ON im.user_id = u.id
                WHERE im.product_id = ?
                ORDER BY im.created_at DESC
                LIMIT ? OFFSET ?
            ");
            
            $stmt->execute([$productId, $pagination['limit'], $pagination['offset']]);
            $movements = $stmt->fetchAll();
            
            return $this->success([
                'movements' => $movements,
                'pagination' => $pagination
            ]);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch inventory movements', 500);
        }
    }
}
?>
