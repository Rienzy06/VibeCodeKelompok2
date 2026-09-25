<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/test-books', function () {
    return response()->json([
        'success' => true,
        'data' => \App\Models\Book::all(),
    ]);
});

$router->get('/api/books', 'BookController@index');

$router->get('/api/books/{id}', 'BookController@show');

$router->post('/api/loans', 'LoanController@store');

$router->get('/api/loans/user/{userId}', 'LoanController@index');