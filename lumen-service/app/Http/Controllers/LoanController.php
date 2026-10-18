<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LoanController extends Controller
{
    // Mengambil peminjaman berdasarkan parameter userId di URL
    public function index($userId)
    {
        return response()->json([
            'status' => 'success',
            'data' => Loan::where('user_id', $userId)->get(),
        ]);
    } // <-- Kurung kurawal penutup index() yang tadinya kurang tepat

    /**
     * Mengambil riwayat peminjaman pengguna yang sedang login.
     */
    public function myLoans(Request $request)
    {
        $userId = $request->attributes->get('authenticated_user_id');

        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Autentikasi pengguna diperlukan.',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'data' => Loan::where('user_id', $userId)
                ->orderBy('borrow_date', 'desc')
                ->get(),
        ], 200);
    }

    public function store(Request $request)
    {
        $userId = $request->attributes->get('authenticated_user_id');
        $bookId = $request->input('bookId');

        // Perbaikan validasi sesuai instruksi foto:
        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Silakan login terlebih dahulu.',
            ], 401);
        }

        if (!$bookId) {
            return response()->json([
                'status' => 'error',
                'message' => 'bookId wajib diisi.',
            ], 400);
        }

        if (!is_numeric($bookId) || (int) $bookId <= 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'bookId harus berupa angka positif.',
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
     /**
     * Mengembalikan buku yang sedang dipinjam.
     */
    public function returnBook(Request $request, $id)
    {
        $userId = $request->attributes->get('authenticated_user_id');

        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Silakan login terlebih dahulu.',
            ], 401);
        }

        $loan = Loan::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$loan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data peminjaman tidak ditemukan.',
            ], 404);
        }

        if ($loan->status !== 'active') {
            return response()->json([
                'status' => 'error',
                'message' => 'Buku sudah dikembalikan atau tidak sedang dipinjam.',
            ], 400);
        }

        $book = Book::find($loan->book_id);

        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data buku tidak ditemukan.',
            ], 404);
        }

        DB::transaction(function () use ($loan, $book) {
            $loan->update([
                'status' => 'returned',
            ]);

            $book->update([
                'status' => 'available',
            ]);
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Buku berhasil dikembalikan.',
            'data' => $loan->fresh(),
        ], 200);
    }
}

