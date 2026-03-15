<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (! auth()->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            return ApiResponse::error('invalid_credentials', 'The provided credentials are incorrect.', null, 401);
        }

        $request->session()->regenerate();

        return ApiResponse::success(new UserResource(auth()->user()));
    }
}
