<?php

namespace App\Controllers;

use PDO;

class ContactController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function submit($request) {
        try {
            // Validate required fields
            $requiredFields = ['name', 'email', 'subject', 'message'];
            foreach ($requiredFields as $field) {
                if (empty($request[$field])) {
                    return [
                        'success' => false,
                        'message' => "Field '$field' is required"
                    ];
                }
            }

            // Validate email format
            if (!filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
                return [
                    'success' => false,
                    'message' => 'Invalid email format'
                ];
            }

            // Sanitize input data
            $data = [
                'name' => trim($request['name']),
                'email' => trim($request['email']),
                'company' => trim($request['company'] ?? ''),
                'phone' => trim($request['phone'] ?? ''),
                'subject' => trim($request['subject']),
                'message' => trim($request['message']),
                'inquiry_type' => trim($request['inquiry_type'] ?? 'general'),
                'created_at' => date('Y-m-d H:i:s')
            ];

            // Insert contact submission into database
            $stmt = $this->db->prepare("
                INSERT INTO contact_submissions 
                (name, email, company, phone, subject, message, inquiry_type, created_at, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
            ");

            $result = $stmt->execute([
                $data['name'],
                $data['email'],
                $data['company'],
                $data['phone'],
                $data['subject'],
                $data['message'],
                $data['inquiry_type'],
                $data['created_at']
            ]);

            if (!$result) {
                error_log('Contact form database error: ' . print_r($stmt->errorInfo(), true));
                return [
                    'success' => false,
                    'message' => 'Database error occurred'
                ];
            }

            $contactId = $this->db->lastInsertId();

            // Send email notification to admin
            $this->sendAdminNotification($data, $contactId);

            // Send confirmation email to user
            $this->sendUserConfirmation($data);

            return [
                'success' => true,
                'message' => 'Thank you for your message. We will get back to you within 24 hours.',
                'contact_id' => $contactId
            ];

        } catch (Exception $e) {
            error_log('Contact form error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'An error occurred while processing your request'
            ];
        }
    }

    private function sendAdminNotification($data, $contactId) {
        try {
            // Check if SendGrid is configured
            if (!getenv('SENDGRID_API_KEY')) {
                error_log('SendGrid API key not configured for contact notifications');
                return false;
            }

            $adminEmail = getenv('ADMIN_EMAIL') ?: 'deyoungdoer@gmail.com';
            
            $subject = "New Contact Form Submission - {$data['inquiry_type']} - {$data['subject']}";
            
            $htmlContent = "
                <h2>New Contact Form Submission</h2>
                <p><strong>Contact ID:</strong> {$contactId}</p>
                <p><strong>Name:</strong> {$data['name']}</p>
                <p><strong>Email:</strong> {$data['email']}</p>
                <p><strong>Company:</strong> {$data['company']}</p>
                <p><strong>Phone:</strong> {$data['phone']}</p>
                <p><strong>Inquiry Type:</strong> " . ucfirst($data['inquiry_type']) . "</p>
                <p><strong>Subject:</strong> {$data['subject']}</p>
                <p><strong>Message:</strong></p>
                <div style='background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;'>
                    " . nl2br(htmlspecialchars($data['message'])) . "
                </div>
                <p><strong>Submitted:</strong> {$data['created_at']}</p>
                <hr>
                <p><em>This is an automated notification from Ardent POS contact form.</em></p>
            ";

            $textContent = "
                New Contact Form Submission
                
                Contact ID: {$contactId}
                Name: {$data['name']}
                Email: {$data['email']}
                Company: {$data['company']}
                Phone: {$data['phone']}
                Inquiry Type: " . ucfirst($data['inquiry_type']) . "
                Subject: {$data['subject']}
                
                Message:
                {$data['message']}
                
                Submitted: {$data['created_at']}
            ";

            return $this->sendEmail($adminEmail, $subject, $htmlContent, $textContent);

        } catch (Exception $e) {
            error_log('Error sending admin notification: ' . $e->getMessage());
            return false;
        }
    }

    private function sendUserConfirmation($data) {
        try {
            // Check if SendGrid is configured
            if (!getenv('SENDGRID_API_KEY')) {
                return false;
            }

            $subject = "Thank you for contacting Ardent POS";
            
            $htmlContent = "
                <h2>Thank you for contacting us!</h2>
                <p>Dear {$data['name']},</p>
                <p>We have received your message and will get back to you within 24 hours.</p>
                
                <h3>Your Message Details:</h3>
                <p><strong>Subject:</strong> {$data['subject']}</p>
                <p><strong>Inquiry Type:</strong> " . ucfirst($data['inquiry_type']) . "</p>
                <p><strong>Message:</strong></p>
                <div style='background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba;'>
                    " . nl2br(htmlspecialchars($data['message'])) . "
                </div>
                
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li><a href='https://ardent-pos-e7qdc.ondigitalocean.app/demo'>Start a free trial</a></li>
                    <li><a href='https://ardent-pos-e7qdc.ondigitalocean.app/features'>Explore our features</a></li>
                    <li><a href='https://ardent-pos-e7qdc.ondigitalocean.app/faq'>Check our FAQ</a></li>
                </ul>
                
                <p>For urgent matters, you can reach us at:</p>
                <p>📞 +1 (800) ARDENT-1<br>
                📧 support@ardentpos.com</p>
                
                <p>Best regards,<br>
                The Ardent POS Team</p>
            ";

            $textContent = "
                Thank you for contacting Ardent POS!
                
                Dear {$data['name']},
                
                We have received your message and will get back to you within 24 hours.
                
                Your Message Details:
                Subject: {$data['subject']}
                Inquiry Type: " . ucfirst($data['inquiry_type']) . "
                Message: {$data['message']}
                
                For urgent matters, you can reach us at:
                Phone: +1 (800) ARDENT-1
                Email: support@ardentpos.com
                
                Best regards,
                The Ardent POS Team
            ";

            return $this->sendEmail($data['email'], $subject, $htmlContent, $textContent);

        } catch (Exception $e) {
            error_log('Error sending user confirmation: ' . $e->getMessage());
            return false;
        }
    }

    private function sendEmail($to, $subject, $htmlContent, $textContent) {
        try {
            $apiKey = getenv('SENDGRID_API_KEY');
            if (!$apiKey) {
                return false;
            }

            $fromEmail = getenv('FROM_EMAIL') ?: 'noreply@ardentpos.com';
            $fromName = getenv('FROM_NAME') ?: 'Ardent POS';

            $data = [
                'personalizations' => [
                    [
                        'to' => [['email' => $to]],
                        'subject' => $subject
                    ]
                ],
                'from' => [
                    'email' => $fromEmail,
                    'name' => $fromName
                ],
                'content' => [
                    [
                        'type' => 'text/plain',
                        'value' => $textContent
                    ],
                    [
                        'type' => 'text/html',
                        'value' => $htmlContent
                    ]
                ]
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://api.sendgrid.com/v3/mail/send');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json'
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode >= 200 && $httpCode < 300) {
                return true;
            } else {
                error_log("SendGrid API error: HTTP $httpCode - $response");
                return false;
            }

        } catch (Exception $e) {
            error_log('SendGrid email error: ' . $e->getMessage());
            return false;
        }
    }

    public function getSubmissions($request) {
        try {
            // Admin only - check authentication
            $page = intval($request['page'] ?? 1);
            $limit = intval($request['limit'] ?? 20);
            $offset = ($page - 1) * $limit;

            $stmt = $this->db->prepare("
                SELECT id, name, email, company, phone, subject, inquiry_type, 
                       created_at, status, admin_notes
                FROM contact_submissions 
                ORDER BY created_at DESC 
                LIMIT ? OFFSET ?
            ");
            $stmt->execute([$limit, $offset]);
            $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Get total count
            $countStmt = $this->db->query("SELECT COUNT(*) FROM contact_submissions");
            $total = $countStmt->fetchColumn();

            return [
                'success' => true,
                'data' => $submissions,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit)
                ]
            ];

        } catch (Exception $e) {
            error_log('Error fetching contact submissions: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error fetching submissions'
            ];
        }
    }
}
