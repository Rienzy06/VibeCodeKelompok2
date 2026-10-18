<?php

/** @var \Laravel\Lumen\Routing\Router $router */

// ==========================================
// AUTENTIKASI
// ==========================================

// Login tidak memerlukan token
$router->post('/login', 'AuthController@login');

// Endpoint yang memerlukan autentikasi
$router->group(['middleware' => 'auth.token'], function () use ($router) {
    $router->get('/me', 'AuthController@me');
    $router->post('/logout', 'AuthController@logout');
});

// ==========================================
// DAFTAR BUKU
// ==========================================

$router->get('/books', 'BookController@index');
$router->get('/books/{id}', 'BookController@show');

// ========================================
// PEMINJAMAN BUKU DAN PENGEMBALIAN BUKU
// ========================================

$router->group(['middleware' => 'auth.token'], function () use ($router) {
    // Meminjam buku
    $router->post('/loans', 'LoanController@store');

    // Melihat peminjaman berdasarkan user ID
    $router->get('/loans/user/{userId}', 'LoanController@index');

    // Melihat riwayat peminjaman pengguna yang login
    $router->get('/loans/me', 'LoanController@myLoans');

    // Mengembalikan buku
    $router->post('/loans{id}/return', 'LoanController@returnBook');
});
