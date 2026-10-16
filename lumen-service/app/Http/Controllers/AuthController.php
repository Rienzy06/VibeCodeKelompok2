<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Login pengguna dan menghasilkan token autentikasi.
     */
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Validasi input
        if (
            !is_string($username) ||
            trim($username) === '' ||
            !is_string($password) ||
            $password === ''
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username dan password wajib diisi.',
            ], 400);
        }

        // Mencari pengguna berdasarkan username
        $user = User::where('username', trim($username))->first();

        // Memeriksa username dan password
        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username atau password salah.',
            ], 401);
        }

        // Membuat token acak
        $plainToken = bin2hex(random_bytes(32));

        // Menyimpan hash token ke database
        PersonalAccessToken::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => date(
                'Y-m-d H:i:s',
                strtotime('+2 hours')
            ),
        ]);

        // Mengirim token kepada pengguna
        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil.',
            'data' => [
                'token' => $plainToken,
                'token_type' => 'Bearer',
                'expires_in' => 7200,
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                ],
            ],
        ], 200);
    }

    /**
     * Mengambil identitas pengguna yang sedang login.
     */
    public function me(Request $request)
    {
        // ID pengguna berasal dari middleware autentikasi
        $userId = $request->attributes->get(
            'authenticated_user_id'
        );

        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pengguna tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $user->id,
                'username' => $user->username,
            ],
        ], 200);
    }

    /**
     * Logout dan mencabut token yang sedang digunakan.
     */
    public function logout(Request $request)
    {
        $userId = $request->attributes->get(
            'authenticated_user_id'
        );

        $header = $request->header('Authorization');

        // Memastikan format token sesuai Bearer
        if (
            !$header ||
            !preg_match('/^Bearer\s+(\S+)$/i', $header, $matches)
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token autentikasi diperlukan.',
            ], 401);
        }

        $plainToken = $matches[1];

        // Menghapus token yang sedang digunakan
        $deleted = DB::table('personal_access_tokens')
            ->where('user_id', $userId)
            ->where(
                'token_hash',
                hash('sha256', $plainToken)
            )
            ->delete();

        if (!$deleted) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token tidak ditemukan.',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil.',
        ], 200);
    }
}