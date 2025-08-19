<?php

namespace App\Payments;

use App\BaseController;
use App\Config\Database;
use Exception;

class PaymentController extends BaseController {
    private $db;
    private $paystackSecretKey;
    private $paystackPublicKey;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
        $this->paystackSecretKey = $_ENV['PAYSTACK_SECRET_KEY'] ?? '';
        $this->paystackPublicKey = $_ENV['PAYSTACK_PUBLIC_KEY'] ?? '';
    }

    public function initializePayment() {
        try {
            $this->requireAuth();
            $input = $this->getJsonInput();

            // Validate required fields
            $required = ['amount', 'email', 'sale_id'];
            $validation = $this->validateRequired($input, $required);
            if (!$validation['valid']) {
                return $this->errorResponse($validation['message'], 400);
            }

            $amount = $input['amount'] * 100; // Convert to kobo
            $email = $input['email'];
            $saleId = $input['sale_id'];
            $reference = 'ardent_' . time() . '_' . $saleId;

            // Initialize payment with Paystack
            $paymentData = [
                'amount' => $amount,
                'email' => $email,
                'reference' => $reference,
                'callback_url' => $_ENV['APP_URL'] . '/payment/callback',
                'metadata' => [
                    'sale_id' => $saleId,
                    'user_id' => $this->getCurrentUser()['id']
                ]
            ];

            $response = $this->makePaystackRequest('transaction/initialize', $paymentData);

            if ($response && $response['status']) {
                // Store payment record
                $stmt = $this->db->prepare("
                    INSERT INTO payments (sale_id, reference, amount, status, gateway, created_at)
                    VALUES (?, ?, ?, 'pending', 'paystack', NOW())
                ");
                $stmt->execute([$saleId, $reference, $input['amount']]);

                return $this->successResponse([
                    'authorization_url' => $response['data']['authorization_url'],
                    'access_code' => $response['data']['access_code'],
                    'reference' => $reference
                ]);
            }

            return $this->errorResponse('Payment initialization failed', 500);

        } catch (Exception $e) {
            return $this->errorResponse('Payment initialization error: ' . $e->getMessage(), 500);
        }
    }

    public function verifyPayment() {
        try {
            $this->requireAuth();
            $reference = $_GET['reference'] ?? '';

            if (empty($reference)) {
                return $this->errorResponse('Payment reference is required', 400);
            }

            // Verify payment with Paystack
            $response = $this->makePaystackRequest("transaction/verify/$reference", null, 'GET');

            if ($response && $response['status'] && $response['data']['status'] === 'success') {
                $paymentData = $response['data'];
                
                // Update payment status
                $stmt = $this->db->prepare("
                    UPDATE payments 
                    SET status = 'completed', 
                        gateway_reference = ?,
                        verified_at = NOW()
                    WHERE reference = ?
                ");
                $stmt->execute([$paymentData['id'], $reference]);

                // Update sale status
                $stmt = $this->db->prepare("
                    UPDATE sales 
                    SET payment_status = 'paid',
                        payment_method = 'card'
                    WHERE id = (SELECT sale_id FROM payments WHERE reference = ?)
                ");
                $stmt->execute([$reference]);

                return $this->successResponse([
                    'status' => 'success',
                    'amount' => $paymentData['amount'] / 100,
                    'reference' => $reference
                ]);
            }

            return $this->errorResponse('Payment verification failed', 400);

        } catch (Exception $e) {
            return $this->errorResponse('Payment verification error: ' . $e->getMessage(), 500);
        }
    }

    public function webhook() {
        try {
            $input = file_get_contents('php://input');
            $signature = $_SERVER['HTTP_X_PAYSTACK_SIGNATURE'] ?? '';

            // Verify webhook signature
            if (!$this->verifyWebhookSignature($input, $signature)) {
                return $this->errorResponse('Invalid signature', 400);
            }

            $event = json_decode($input, true);

            if ($event['event'] === 'charge.success') {
                $paymentData = $event['data'];
                $reference = $paymentData['reference'];

                // Update payment status
                $stmt = $this->db->prepare("
                    UPDATE payments 
                    SET status = 'completed',
                        gateway_reference = ?,
                        verified_at = NOW()
                    WHERE reference = ?
                ");
                $stmt->execute([$paymentData['id'], $reference]);

                // Update sale status
                $stmt = $this->db->prepare("
                    UPDATE sales 
                    SET payment_status = 'paid',
                        payment_method = 'card'
                    WHERE id = (SELECT sale_id FROM payments WHERE reference = ?)
                ");
                $stmt->execute([$reference]);

                // Send receipt email (if configured)
                $this->sendReceiptEmail($reference);
            }

            return $this->successResponse(['message' => 'Webhook processed']);

        } catch (Exception $e) {
            error_log('Webhook error: ' . $e->getMessage());
            return $this->errorResponse('Webhook processing failed', 500);
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
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            return json_decode($response, true);
        }

        return null;
    }

    private function verifyWebhookSignature($payload, $signature) {
        $computedSignature = hash_hmac('sha512', $payload, $this->paystackSecretKey);
        return hash_equals($signature, $computedSignature);
    }

    private function sendReceiptEmail($reference) {
        // This will be implemented when we add email notifications
        // For now, just log the action
        error_log("Receipt email should be sent for payment: $reference");
    }
}
