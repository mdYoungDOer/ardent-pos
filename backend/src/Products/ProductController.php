<?php
/**
 * Product Controller for Ardent POS
 */

require_once __DIR__ . '/../BaseController.php';

class ProductController extends BaseController {
    
    public function index() {
        $this->requireAuth(['admin', 'manager', 'cashier']);
        
        try {
            $pdo = Database::getConnection();
            $pagination = $this->getPagination();
            
            // Build query with search and filters
            $search = $_GET['search'] ?? '';
            $category = $_GET['category'] ?? '';
            
            $whereClause = "WHERE p.is_active = true";
            $params = [];
            
            if ($search) {
                $whereClause .= " AND (p.name ILIKE ? OR p.sku ILIKE ? OR p.barcode ILIKE ?)";
                $searchTerm = "%{$search}%";
                $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm]);
            }
            
            if ($category) {
                $whereClause .= " AND p.category_id = ?";
                $params[] = $category;
            }
            
            // Get total count
            $countStmt = $pdo->prepare("
                SELECT COUNT(*) 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                {$whereClause}
            ");
            $countStmt->execute($params);
            $totalCount = $countStmt->fetchColumn();
            
            // Get products
            $stmt = $pdo->prepare("
                SELECT 
                    p.id,
                    p.name,
                    p.description,
                    p.sku,
                    p.barcode,
                    p.price,
                    p.cost_price,
                    p.tax_rate,
                    p.image_url,
                    c.name as category_name,
                    i.quantity,
                    i.low_stock_threshold,
                    p.created_at
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN inventory i ON p.id = i.product_id
                {$whereClause}
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?
            ");
            
            $stmt->execute(array_merge($params, [$pagination['limit'], $pagination['offset']]));
            $products = $stmt->fetchAll();
            
            return $this->success([
                'products' => $products,
                'pagination' => [
                    'page' => $pagination['page'],
                    'limit' => $pagination['limit'],
                    'total' => (int) $totalCount,
                    'pages' => ceil($totalCount / $pagination['limit'])
                ]
            ]);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch products', 500);
        }
    }
    
    public function store() {
        $this->requireAuth(['admin', 'manager']);
        
        $data = $this->getJsonInput();
        $required = ['name', 'price', 'category_id'];
        
        if (!$this->validateRequired($data, $required)) {
            return $this->error('Missing required fields', 400);
        }
        
        try {
            $pdo = Database::getConnection();
            $pdo->beginTransaction();
            
            // Insert product
            $stmt = $pdo->prepare("
                INSERT INTO products (name, description, sku, barcode, category_id, price, cost_price, tax_rate, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                RETURNING id
            ");
            
            $stmt->execute([
                $data['name'],
                $data['description'] ?? null,
                $data['sku'] ?? null,
                $data['barcode'] ?? null,
                $data['category_id'],
                $data['price'],
                $data['cost_price'] ?? null,
                $data['tax_rate'] ?? 0,
                $data['image_url'] ?? null
            ]);
            
            $productId = $stmt->fetchColumn();
            
            // Create initial inventory record
            $stmt = $pdo->prepare("
                INSERT INTO inventory (product_id, quantity, low_stock_threshold)
                VALUES (?, ?, ?)
            ");
            
            $stmt->execute([
                $productId,
                $data['initial_quantity'] ?? 0,
                $data['low_stock_threshold'] ?? 10
            ]);
            
            $pdo->commit();
            
            return $this->success(['id' => $productId, 'message' => 'Product created successfully'], 201);
            
        } catch (PDOException $e) {
            $pdo->rollback();
            if (strpos($e->getMessage(), 'duplicate key') !== false) {
                return $this->error('SKU or barcode already exists', 409);
            }
            return $this->error('Failed to create product', 500);
        }
    }
    
    public function show($id) {
        $this->requireAuth(['admin', 'manager', 'cashier']);
        
        try {
            $pdo = Database::getConnection();
            
            $stmt = $pdo->prepare("
                SELECT 
                    p.*,
                    c.name as category_name,
                    i.quantity,
                    i.low_stock_threshold
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN inventory i ON p.id = i.product_id
                WHERE p.id = ? AND p.is_active = true
            ");
            
            $stmt->execute([$id]);
            $product = $stmt->fetch();
            
            if (!$product) {
                return $this->error('Product not found', 404);
            }
            
            return $this->success($product);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch product', 500);
        }
    }
    
    public function update($id) {
        $this->requireAuth(['admin', 'manager']);
        
        $data = $this->getJsonInput();
        
        try {
            $pdo = Database::getConnection();
            
            // Check if product exists
            $stmt = $pdo->prepare("SELECT id FROM products WHERE id = ? AND is_active = true");
            $stmt->execute([$id]);
            if (!$stmt->fetch()) {
                return $this->error('Product not found', 404);
            }
            
            // Build update query dynamically
            $updateFields = [];
            $params = [];
            
            $allowedFields = ['name', 'description', 'sku', 'barcode', 'category_id', 'price', 'cost_price', 'tax_rate', 'image_url'];
            
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
                UPDATE products 
                SET " . implode(', ', $updateFields) . ", updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ");
            
            $stmt->execute($params);
            
            return $this->success(['message' => 'Product updated successfully']);
            
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'duplicate key') !== false) {
                return $this->error('SKU or barcode already exists', 409);
            }
            return $this->error('Failed to update product', 500);
        }
    }
    
    public function destroy($id) {
        $this->requireAuth(['admin', 'manager']);
        
        try {
            $pdo = Database::getConnection();
            
            // Soft delete - set is_active to false
            $stmt = $pdo->prepare("
                UPDATE products 
                SET is_active = false, updated_at = CURRENT_TIMESTAMP
                WHERE id = ? AND is_active = true
            ");
            
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() === 0) {
                return $this->error('Product not found', 404);
            }
            
            return $this->success(['message' => 'Product deleted successfully']);
            
        } catch (PDOException $e) {
            return $this->error('Failed to delete product', 500);
        }
    }
}
?>
