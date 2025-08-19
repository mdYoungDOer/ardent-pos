<?php
/**
 * Database Migration Script for Ardent POS
 * This script handles database setup and migrations
 */

require_once __DIR__ . '/../backend/config/database.php';

class Migration {
    private $pdo;
    
    public function __construct() {
        $this->pdo = Database::getConnection();
    }
    
    public function run() {
        try {
            echo "Starting database migration...\n";
            
            // Read and execute schema
            $schema = file_get_contents(__DIR__ . '/schema.sql');
            $this->pdo->exec($schema);
            
            echo "✅ Database schema created successfully!\n";
            echo "✅ Default admin user created (username: admin, password: admin123)\n";
            echo "✅ Sample categories inserted\n";
            echo "✅ Default settings configured\n";
            
        } catch (PDOException $e) {
            echo "❌ Migration failed: " . $e->getMessage() . "\n";
            exit(1);
        }
    }
    
    public function seed() {
        try {
            echo "Seeding sample data...\n";
            
            // Insert sample products
            $products = [
                [
                    'name' => 'iPhone 14 Pro',
                    'description' => 'Latest Apple smartphone with Pro camera system',
                    'sku' => 'IPH14PRO128',
                    'barcode' => '1234567890123',
                    'price' => 999.99,
                    'cost_price' => 700.00,
                    'category' => 'Electronics'
                ],
                [
                    'name' => 'Samsung Galaxy S23',
                    'description' => 'Premium Android smartphone',
                    'sku' => 'SGS23256',
                    'barcode' => '1234567890124',
                    'price' => 899.99,
                    'cost_price' => 650.00,
                    'category' => 'Electronics'
                ],
                [
                    'name' => 'Nike Air Max 90',
                    'description' => 'Classic running shoes',
                    'sku' => 'NAM90WHT42',
                    'barcode' => '1234567890125',
                    'price' => 129.99,
                    'cost_price' => 80.00,
                    'category' => 'Clothing'
                ],
                [
                    'name' => 'Coca Cola 500ml',
                    'description' => 'Refreshing soft drink',
                    'sku' => 'CC500ML',
                    'barcode' => '1234567890126',
                    'price' => 2.99,
                    'cost_price' => 1.50,
                    'category' => 'Food & Beverages'
                ]
            ];
            
            foreach ($products as $product) {
                // Get category ID
                $stmt = $this->pdo->prepare("SELECT id FROM categories WHERE name = ?");
                $stmt->execute([$product['category']]);
                $category_id = $stmt->fetchColumn();
                
                // Insert product
                $stmt = $this->pdo->prepare("
                    INSERT INTO products (name, description, sku, barcode, category_id, price, cost_price)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([
                    $product['name'],
                    $product['description'],
                    $product['sku'],
                    $product['barcode'],
                    $category_id,
                    $product['price'],
                    $product['cost_price']
                ]);
                
                $product_id = $this->pdo->lastInsertId();
                
                // Insert inventory
                $stmt = $this->pdo->prepare("
                    INSERT INTO inventory (product_id, quantity, low_stock_threshold)
                    VALUES (?, ?, ?)
                ");
                $stmt->execute([$product_id, rand(50, 200), 10]);
            }
            
            // Insert sample customer
            $stmt = $this->pdo->prepare("
                INSERT INTO customers (first_name, last_name, email, phone, loyalty_points)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute(['John', 'Doe', 'john.doe@example.com', '+1234567890', 150]);
            
            echo "✅ Sample data seeded successfully!\n";
            
        } catch (PDOException $e) {
            echo "❌ Seeding failed: " . $e->getMessage() . "\n";
            exit(1);
        }
    }
}

// Run migration
if (php_sapi_name() === 'cli') {
    $migration = new Migration();
    $migration->run();
    
    // Ask if user wants to seed sample data
    echo "\nWould you like to seed sample data? (y/n): ";
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    if (trim($line) === 'y' || trim($line) === 'yes') {
        $migration->seed();
    }
    fclose($handle);
    
    echo "\nMigration completed!\n";
}
?>
