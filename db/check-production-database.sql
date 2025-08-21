-- SQL queries to check production PostgreSQL database
-- Run these queries in pgAdmin to verify admin user credentials

-- 1. Check if admin user exists
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
    LENGTH(password_hash) as hash_length,
    SUBSTRING(password_hash, 1, 10) as hash_preview
FROM users 
WHERE email = 'deyoungdoer@gmail.com';

-- 2. Check all admin users
SELECT 
    id,
    username,
    email,
    role,
    is_active,
    email_verified,
    created_at
FROM users 
WHERE role = 'admin'
ORDER BY created_at;

-- 3. Verify password hash format
SELECT 
    email,
    CASE 
        WHEN password_hash LIKE '$2y$%' THEN 'Valid bcrypt hash'
        WHEN password_hash LIKE '$2a$%' THEN 'Valid bcrypt hash (old format)'
        WHEN password_hash LIKE '$2b$%' THEN 'Valid bcrypt hash (alternative)'
        ELSE 'Invalid hash format: ' || SUBSTRING(password_hash, 1, 10)
    END as hash_status,
    LENGTH(password_hash) as hash_length
FROM users 
WHERE email = 'deyoungdoer@gmail.com';

-- 4. Count total users
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
    COUNT(CASE WHEN is_active = true THEN 1 END) as active_users,
    COUNT(CASE WHEN email_verified = true THEN 1 END) as verified_users
FROM users;

-- 5. Check for duplicate emails
SELECT 
    email,
    COUNT(*) as count
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;
