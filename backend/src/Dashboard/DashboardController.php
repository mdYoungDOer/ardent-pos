<?php
/**
 * Dashboard Controller for Ardent POS
 */

namespace App\Dashboard;

use App\Core\BaseController;
use App\Core\Database;
use PDOException;

class DashboardController extends BaseController {
    
    public function getDashboard() {
        $user = $this->requireAuth();
        
        try {
            $pdo = Database::getConnection();
            $data = [];
            
            // Get today's sales
            $stmt = $pdo->prepare("
                SELECT COALESCE(SUM(total_amount), 0) as today_sales
                FROM sales 
                WHERE DATE(created_at) = CURRENT_DATE 
                AND payment_status = 'paid'
            ");
            $stmt->execute();
            $data['todaySales'] = (float) $stmt->fetchColumn();
            
            // Get total sales (this month)
            $stmt = $pdo->prepare("
                SELECT COALESCE(SUM(total_amount), 0) as total_sales
                FROM sales 
                WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
                AND payment_status = 'paid'
            ");
            $stmt->execute();
            $data['totalSales'] = (float) $stmt->fetchColumn();
            
            // Role-based data
            if (in_array($user['role'], ['admin', 'manager', 'inventory_staff'])) {
                // Get low stock items count
                $stmt = $pdo->prepare("
                    SELECT COUNT(*) as low_stock_count
                    FROM inventory i
                    JOIN products p ON i.product_id = p.id
                    WHERE i.quantity <= i.low_stock_threshold
                    AND p.is_active = true
                ");
                $stmt->execute();
                $data['lowStockItems'] = (int) $stmt->fetchColumn();
            }
            
            if (in_array($user['role'], ['admin', 'manager'])) {
                // Get total products
                $stmt = $pdo->prepare("
                    SELECT COUNT(*) as total_products
                    FROM products 
                    WHERE is_active = true
                ");
                $stmt->execute();
                $data['totalProducts'] = (int) $stmt->fetchColumn();
                
                // Get total customers
                $stmt = $pdo->prepare("
                    SELECT COUNT(*) as total_customers
                    FROM customers 
                    WHERE is_active = true
                ");
                $stmt->execute();
                $data['totalCustomers'] = (int) $stmt->fetchColumn();
            }
            
            // Get recent sales for relevant roles
            if (in_array($user['role'], ['admin', 'manager', 'cashier'])) {
                $stmt = $pdo->prepare("
                    SELECT 
                        s.id,
                        s.total_amount,
                        COALESCE(c.first_name || ' ' || c.last_name, 'Walk-in Customer') as customer_name,
                        s.created_at
                    FROM sales s
                    LEFT JOIN customers c ON s.customer_id = c.id
                    WHERE s.payment_status = 'paid'
                    ORDER BY s.created_at DESC
                    LIMIT 5
                ");
                $stmt->execute();
                $recentSales = $stmt->fetchAll();
                
                $data['recentSales'] = array_map(function($sale) {
                    return [
                        'id' => $sale['id'],
                        'amount' => (float) $sale['total_amount'],
                        'customer' => $sale['customer_name'],
                        'time' => $this->timeAgo($sale['created_at'])
                    ];
                }, $recentSales);
            }
            
            return $this->success($data);
            
        } catch (PDOException $e) {
            return $this->error('Failed to fetch dashboard data', 500);
        }
    }
    
    private function timeAgo($datetime) {
        $time = time() - strtotime($datetime);
        
        if ($time < 60) return 'Just now';
        if ($time < 3600) return floor($time/60) . ' minutes ago';
        if ($time < 86400) return floor($time/3600) . ' hours ago';
        if ($time < 2592000) return floor($time/86400) . ' days ago';
        
        return date('M j, Y', strtotime($datetime));
    }
}
?>
