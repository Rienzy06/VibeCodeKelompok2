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