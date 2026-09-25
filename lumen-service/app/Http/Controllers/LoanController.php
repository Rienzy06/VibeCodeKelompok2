<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LoanController extends Controller
{
    public function index($userId)
    {
        return response()->json([
            'status' => 'success',
            'data' => Loan::where('user_id', $userId)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $userId = $request->input('userId');
        $bookId = $request->input('bookId');

        if (!$userId || !$bookId) {
            return response()->json([
                'status' => 'error',
                'message' => 'userId dan bookId wajib diisi.',
            ], 400);
        }

        $activeLoans = Loan::where('user_id', $userId)
            ->where('status', 'active')
            ->count();

        if ($activeLoans >= 3) {
            return response()->json([
                'status' => 'error',
                'message' => 'Maksimal 3 buku aktif.',
                'code' => 'MAX_LIMIT_REACHED',
            ], 400);
        }

        $book = Book::find($bookId);

        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Buku tidak ditemukan.',
                'code' => 'RESOURCE_NOT_FOUND',
            ], 404);
        }

        if ($book->status !== 'available') {
            return response()->json([
                'status' => 'error',
                'message' => 'Buku sedang tidak tersedia.',
                'code' => 'BOOK_NOT_AVAILABLE',
            ], 400);
        }

        $loan = DB::transaction(function () use ($userId, $book) {
            $borrowDate = Carbon::today();
            $dueDate = Carbon::today()->addDays(7);

            $loan = Loan::create([
                'user_id' => $userId,
                'book_id' => $book->id,
                'borrow_date' => $borrowDate,
                'due_date' => $dueDate,
                'status' => 'active',
            ]);

            $book->update([
                'status' => 'borrowed',
            ]);

            return $loan;
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Buku berhasil dipinjam.',
            'data' => $loan,
        ], 201);
    }
}