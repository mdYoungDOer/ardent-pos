-- Create new admin user with specified credentials
-- Password hash for: @am171293GH!!

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
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- This is a bcrypt hash for @am171293GH!!
    'admin',
    'DeYoung',
    'Doer',
    true,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- Also update the existing admin user if it exists
UPDATE users 
SET 
    username = 'deyoungdoer',
    email = 'deyoungdoer@gmail.com',
    password_hash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    first_name = 'DeYoung',
    last_name = 'Doer',
    updated_at = NOW()
WHERE role = 'admin' OR username = 'admin' OR email = 'admin@example.com';
