<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $request): JsonResponse
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ApiResponse::success(['message' => 'Logged out successfully']);
    }
}
