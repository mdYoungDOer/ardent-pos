<?php
// Generate a clean 60-character hash for the password
$password = '@am171293GH!!';
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

echo "Clean Hash (60 chars): $hash\n";
echo "Length: " . strlen($hash) . "\n";

// Verify it works
$verify = password_verify($password, $hash);
echo "Verification: " . ($verify ? "SUCCESS" : "FAILED") . "\n";
?>
