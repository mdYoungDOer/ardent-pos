-- SQL Script to verify admin credentials for deyoungdoer@gmail.com
-- This script checks if the user exists and verifies password hash compatibility

-- 1. Check if the admin user exists
SELECT 
    id,
    username,
    email,
    first_name,
    last_name,
    role,
    is_active,
    email_verified,
    created_at,
    updated_at,
    LENGTH(password_hash) as hash_length,
    SUBSTRING(password_hash, 1, 7) as hash_prefix
FROM users 
WHERE email = 'deyoungdoer@gmail.com';

-- 2. Check all admin users in the system
SELECT 
    id,
    username,
    email,
    role,
    is_active,
    email_verified
FROM users 
WHERE role = 'admin'
ORDER BY created_at;

-- 3. Verify password hash format (should start with $2y$ for bcrypt)
SELECT 
    email,
    CASE 
        WHEN password_hash LIKE '$2y$%' THEN 'Valid bcrypt hash'
        WHEN password_hash LIKE '$2a$%' THEN 'Valid bcrypt hash (old format)'
        WHEN password_hash LIKE '$2b$%' THEN 'Valid bcrypt hash (alternative)'
        ELSE 'Invalid hash format'
    END as hash_status,
    LENGTH(password_hash) as hash_length
FROM users 
WHERE email = 'deyoungdoer@gmail.com';

-- 4. Check for any inactive or unverified admin accounts
SELECT 
    email,
    is_active,
    email_verified,
    CASE 
        WHEN NOT is_active THEN 'Account is inactive'
        WHEN NOT email_verified THEN 'Email not verified'
        ELSE 'Account status OK'
    END as status_message
FROM users 
WHERE email = 'deyoungdoer@gmail.com';

-- 5. Count total users and admin users
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_users
FROM users;
