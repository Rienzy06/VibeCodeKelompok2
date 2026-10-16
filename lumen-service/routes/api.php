<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/books', 'BookController@index');
$router->get('/books/{id}', 'BookController@show');

$router->post('/loans', 'LoanController@store');
$router->get('/loans/user/{userId}', 'LoanController@index');