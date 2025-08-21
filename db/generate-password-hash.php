<?php
/**
 * Generate correct password hash for admin user
 * Run this script to get the correct hash for your password
 */

// Your password
$password = '@am171293GH!!';
$email = 'deyoungdoer@gmail.com';

echo "=== PASSWORD HASH GENERATOR ===\n";
echo "Email: $email\n";
echo "Password: " . str_repeat('*', strlen($password)) . "\n\n";

// Generate bcrypt hash with cost 12 (secure)
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

echo "Generated Hash:\n";
echo "$hash\n\n";

// Verify the hash works
$isValid = password_verify($password, $hash);
echo "Hash Verification: " . ($isValid ? "✓ VALID" : "❌ INVALID") . "\n\n";

echo "=== SQL UPDATE STATEMENT ===\n";
echo "Copy and run this SQL in pgAdmin:\n\n";
echo "UPDATE users \n";
echo "SET password_hash = '$hash' \n";
echo "WHERE email = '$email';\n\n";

echo "=== ALTERNATIVE: INSERT IF USER DOESN'T EXIST ===\n";
echo "If the user doesn't exist, run this SQL:\n\n";
echo "INSERT INTO users (\n";
echo "    username, email, password_hash, first_name, last_name, \n";
echo "    role, is_active, email_verified, created_at, updated_at\n";
echo ") VALUES (\n";
echo "    'deyoungdoer',\n";
echo "    '$email',\n";
echo "    '$hash',\n";
echo "    'DeYoung',\n";
echo "    'Doer',\n";
echo "    'admin',\n";
echo "    true,\n";
echo "    true,\n";
echo "    NOW(),\n";
echo "    NOW()\n";
echo ")\n";
echo "ON CONFLICT (email) DO UPDATE SET\n";
echo "    password_hash = EXCLUDED.password_hash,\n";
echo "    updated_at = NOW();\n\n";

echo "=== INSTRUCTIONS ===\n";
echo "1. Run the database check queries first in pgAdmin\n";
echo "2. If user exists but password is wrong, use the UPDATE statement\n";
echo "3. If user doesn't exist, use the INSERT statement\n";
echo "4. Test login after updating the database\n";
?>
