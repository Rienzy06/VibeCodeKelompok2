<?php

require __DIR__ . '/vendor/autoload.php';

$app = require __DIR__ . '/bootstrap/app.php';

// Inisialisasi aplikasi Lumen.
$app->boot();

// Ambil koneksi database.
$db = $app->make('db');

// Periksa apakah username sudah terdaftar.
$existingUser = $db->table('users')
    ->where('username', 'student1')
    ->first();

if ($existingUser) {
    echo "Username student1 sudah terdaftar.\n";
    exit;
}

// Buat password hash menggunakan bcrypt.
$passwordHash = password_hash('Student123!', PASSWORD_BCRYPT);

// Masukkan pengguna ke database.
$userId = $db->table('users')->insertGetId([
    'username' => 'student1',
    'password' => $passwordHash,
    'created_at' => date('Y-m-d H:i:s'),
    'updated_at' => date('Y-m-d H:i:s'),
]);

echo "Akun pengujian berhasil dibuat!\n";
echo "Username: student1\n";
echo "Password: Student123!\n";
echo "User ID: {$userId}\n";