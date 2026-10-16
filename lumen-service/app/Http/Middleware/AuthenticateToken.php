<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessToken;
use Closure;

class AuthenticateToken
{
    public function handle($request, Closure $next)
    {
        $header = $request->header('Authorization');

        if (!$header || !preg_match('/^Bearer\s+(\S+)$/i', $header, $matches)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token autentikasi diperlukan.',
            ], 401);
        }

        $plainToken = $matches[1];

        $token = PersonalAccessToken::where(
            'token_hash',
            hash('sha256', $plainToken)
        )->first();

        if (!$token || strtotime($token->expires_at) <= time()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token tidak valid atau sudah kedaluwarsa.',
            ], 401);
        }

        $request->attributes->set('authenticated_user_id', $token->user_id);

        return $next($request);
    }
}