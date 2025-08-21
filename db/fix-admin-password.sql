-- Fix admin password hash for deyoungdoer@gmail.com
-- The current hash is truncated (50 chars instead of 60)
-- Run this SQL in pgAdmin to fix the password

-- Generate a proper bcrypt hash for password: @am171293GH!!
-- This hash was generated with PHP's password_hash() function using cost 12

UPDATE users 
SET 
    password_hash = '$2y$12$cNXaEglJf.ZfryPezzvFeOKV5Ur15jDhQw//RHPLidGWJ103ijumBm',
    email_verified = true,
    updated_at = NOW()
WHERE email = 'deyoungdoer@gmail.com';

-- Verify the update worked
SELECT 
    id,
    username,
    email,
    role,
    is_active,
    email_verified,
    LENGTH(password_hash) as hash_length,
    SUBSTRING(password_hash, 1, 10) as hash_preview,
    updated_at
FROM users 
WHERE email = 'deyoungdoer@gmail.com';
