<?php
// Generate password hash for new admin user
$password = '@am171293GH!!';
$hash = password_hash($password, PASSWORD_DEFAULT);

echo "Password: " . $password . "\n";
echo "Hash: " . $hash . "\n";

// SQL to create the admin user
$sql = "
-- Delete existing admin users first
DELETE FROM users WHERE role = 'admin' OR username IN ('admin', 'deyoungdoer') OR email IN ('admin@example.com', 'deyoungdoer@gmail.com');

-- Create new admin user
INSERT INTO users (
    username, 
    email, 
    password_hash, 
    role, 
    first_name, 
    last_name, 
    is_active, 
    created_at, 
    updated_at
) VALUES (
    'deyoungdoer',
    'deyoungdoer@gmail.com',
    '$hash',
    'admin',
    'DeYoung',
    'Doer',
    true,
    NOW(),
    NOW()
);
";

echo "\nSQL to run in your database:\n";
echo str_replace('$hash', $hash, $sql);
?>
