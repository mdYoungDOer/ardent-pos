<?php
/**
 * Database Configuration for Ardent POS
 */

class Database {
    private static $connection = null;
    
    public static function getConnection() {
        if (self::$connection === null) {
            try {
                $host = $_ENV['DB_HOST'] ?? 'localhost';
                $port = $_ENV['DB_PORT'] ?? '5432';
                $dbname = $_ENV['DB_NAME'] ?? 'ardent_pos';
                $username = $_ENV['DB_USER'] ?? 'postgres';
                $password = $_ENV['DB_PASS'] ?? '';
                
                $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";
                
                self::$connection = new PDO($dsn, $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
                
            } catch (PDOException $e) {
                error_log("Database connection failed: " . $e->getMessage());
                throw new Exception("Database connection failed");
            }
        }
        
        return self::$connection;
    }
    
    public static function beginTransaction() {
        return self::getConnection()->beginTransaction();
    }
    
    public static function commit() {
        return self::getConnection()->commit();
    }
    
    public static function rollback() {
        return self::getConnection()->rollBack();
    }
}
?>
