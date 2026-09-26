<?php

namespace App\Http\Controllers;

use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Book::all(),
        ]);
    }
        public function show($id)
{
    if (!is_numeric($id) || (int) $id <= 0) {
        return response()->json([
            'status' => 'error',
            'message' => 'ID buku tidak valid.',
        ], 400);
    }

    $book = Book::find($id);

    if (!$book) {
        return response()->json([
            'status' => 'error',
            'message' => 'Buku tidak ditemukan.',
        ], 404);
    }

    return response()->json([
        'status' => 'success',
        'data' => $book,
    ]);

    }
}