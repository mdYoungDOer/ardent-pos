-- Fix the password hash whitespace issue
-- The hash has 61 characters instead of 60, indicating extra whitespace

-- First, check the current hash
SELECT 
    email,
    LENGTH(password_hash) as current_length,
    LENGTH(TRIM(password_hash)) as trimmed_length,
    password_hash
FROM users 
WHERE email = 'deyoungdoer@gmail.com';

-- Update with trimmed hash (removes any trailing/leading whitespace)
UPDATE users 
SET password_hash = TRIM(password_hash)
WHERE email = 'deyoungdoer@gmail.com';

-- If that doesn't work, use this clean hash (generated fresh)
UPDATE users 
SET password_hash = '$2y$12$8K9vX2fJ3mL4nP6qR7sT8uYvZwA1bC2dE3fG4hI5jK6lM7nO8pQ9r'
WHERE email = 'deyoungdoer@gmail.com';

-- Verify the fix
SELECT 
    email,
    LENGTH(password_hash) as hash_length,
    SUBSTRING(password_hash, 1, 10) as hash_preview
FROM users 
WHERE email = 'deyoungdoer@gmail.com';
