<?php

namespace App\Notifications;

use SendGrid\Mail\Mail;
use Exception;

class EmailService {
    private $sendgrid;
    private $fromEmail;

    public function __construct() {
        $apiKey = $_ENV['SENDGRID_API_KEY'] ?? '';
        $this->fromEmail = $_ENV['SENDGRID_FROM_EMAIL'] ?? 'noreply@ardentpos.com';
        
        if (!empty($apiKey)) {
            $this->sendgrid = new \SendGrid($apiKey);
        }
    }

    public function sendWelcomeEmail($userEmail, $userName, $tempPassword) {
        $subject = 'Welcome to Ardent POS';
        $content = $this->getWelcomeEmailTemplate($userName, $tempPassword);
        
        return $this->sendEmail($userEmail, $subject, $content);
    }

    public function sendPasswordResetEmail($userEmail, $userName, $resetToken) {
        $subject = 'Password Reset Request - Ardent POS';
        $resetUrl = $_ENV['APP_URL'] . "/reset-password?token=$resetToken";
        $content = $this->getPasswordResetTemplate($userName, $resetUrl);
        
        return $this->sendEmail($userEmail, $subject, $content);
    }

    public function sendReceiptEmail($customerEmail, $customerName, $saleData) {
        $subject = "Receipt for Order #{$saleData['sale_number']} - Ardent POS";
        $content = $this->getReceiptTemplate($customerName, $saleData);
        
        return $this->sendEmail($customerEmail, $subject, $content);
    }

    public function sendLowStockAlert($adminEmails, $lowStockProducts) {
        $subject = 'Low Stock Alert - Ardent POS';
        $content = $this->getLowStockTemplate($lowStockProducts);
        
        $results = [];
        foreach ($adminEmails as $email) {
            $results[] = $this->sendEmail($email, $subject, $content);
        }
        
        return $results;
    }

    private function sendEmail($to, $subject, $htmlContent) {
        try {
            if (!$this->sendgrid) {
                error_log('SendGrid not configured - Email not sent');
                return false;
            }

            $email = new Mail();
            $email->setFrom($this->fromEmail, 'Ardent POS');
            $email->setSubject($subject);
            $email->addTo($to);
            $email->addContent('text/html', $htmlContent);

            $response = $this->sendgrid->send($email);
            
            if ($response->statusCode() >= 200 && $response->statusCode() < 300) {
                return true;
            }
            
            error_log('SendGrid error: ' . $response->body());
            return false;

        } catch (Exception $e) {
            error_log('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    private function getWelcomeEmailTemplate($userName, $tempPassword) {
        return "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #e41e5b; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                .button { background: #e41e5b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Welcome to Ardent POS</h1>
                </div>
                <div class='content'>
                    <h2>Hello $userName,</h2>
                    <p>Welcome to Ardent POS! Your account has been created successfully.</p>
                    <p><strong>Your temporary login credentials:</strong></p>
                    <p>Email: Your email address<br>
                    Password: <strong>$tempPassword</strong></p>
                    <p>Please log in and change your password immediately for security.</p>
                    <a href='" . $_ENV['APP_URL'] . "' class='button'>Login to Ardent POS</a>
                </div>
                <div class='footer'>
                    <p>This is an automated message from Ardent POS. Please do not reply.</p>
                </div>
            </div>
        </body>
        </html>";
    }

    private function getPasswordResetTemplate($userName, $resetUrl) {
        return "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #e41e5b; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                .button { background: #e41e5b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Password Reset Request</h1>
                </div>
                <div class='content'>
                    <h2>Hello $userName,</h2>
                    <p>You have requested to reset your password for your Ardent POS account.</p>
                    <p>Click the button below to reset your password:</p>
                    <a href='$resetUrl' class='button'>Reset Password</a>
                    <p>This link will expire in 1 hour for security reasons.</p>
                    <p>If you did not request this password reset, please ignore this email.</p>
                </div>
                <div class='footer'>
                    <p>This is an automated message from Ardent POS. Please do not reply.</p>
                </div>
            </div>
        </body>
        </html>";
    }

    private function getReceiptTemplate($customerName, $saleData) {
        $itemsHtml = '';
        foreach ($saleData['items'] as $item) {
            $itemsHtml .= "
                <tr>
                    <td>{$item['product_name']}</td>
                    <td>{$item['quantity']}</td>
                    <td>₦" . number_format($item['unit_price'], 2) . "</td>
                    <td>₦" . number_format($item['total_price'], 2) . "</td>
                </tr>";
        }

        return "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #e41e5b; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #f5f5f5; }
                .total { font-weight: bold; font-size: 18px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Receipt</h1>
                    <p>Order #{$saleData['sale_number']}</p>
                </div>
                <div class='content'>
                    <h2>Thank you for your purchase, $customerName!</h2>
                    <p><strong>Date:</strong> {$saleData['created_at']}</p>
                    <p><strong>Payment Method:</strong> {$saleData['payment_method']}</p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            $itemsHtml
                        </tbody>
                        <tfoot>
                            <tr class='total'>
                                <td colspan='3'>Total Amount:</td>
                                <td>₦" . number_format($saleData['total_amount'], 2) . "</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <p>Thank you for choosing Ardent POS!</p>
                </div>
                <div class='footer'>
                    <p>This is an automated receipt from Ardent POS.</p>
                </div>
            </div>
        </body>
        </html>";
    }

    private function getLowStockTemplate($lowStockProducts) {
        $productsHtml = '';
        foreach ($lowStockProducts as $product) {
            $productsHtml .= "
                <tr>
                    <td>{$product['name']}</td>
                    <td>{$product['sku']}</td>
                    <td>{$product['stock_quantity']}</td>
                    <td>{$product['min_stock_level']}</td>
                </tr>";
        }

        return "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #f5f5f5; }
                .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>⚠️ Low Stock Alert</h1>
                </div>
                <div class='content'>
                    <div class='alert'>
                        <strong>Attention:</strong> The following products are running low on stock and need to be restocked.
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Current Stock</th>
                                <th>Minimum Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            $productsHtml
                        </tbody>
                    </table>
                    
                    <p>Please restock these items as soon as possible to avoid stockouts.</p>
                </div>
                <div class='footer'>
                    <p>This is an automated alert from Ardent POS Inventory Management.</p>
                </div>
            </div>
        </body>
        </html>";
    }
}
