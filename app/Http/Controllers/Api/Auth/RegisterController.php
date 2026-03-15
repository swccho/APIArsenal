<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::query()->create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => $request->validated('password'),
        ]);

        auth()->login($user);

        return ApiResponse::success(new UserResource($user), 201);
    }
}
