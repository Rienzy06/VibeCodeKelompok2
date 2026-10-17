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
// PEMINJAMAN BUKU
// ========================================

$router->group(['middleware' => 'auth.token'], function () use ($router) {
    $router->post('/loans', 'LoanController@store');
    $router->get('/loans/user/{userId}', 'LoanController@index');
    $router->get('/loans/me', 'LoanController@myLoans');
});