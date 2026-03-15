<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\UserResource;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class MeController extends Controller
{
    public function show(): JsonResponse
    {
        return ApiResponse::success(new UserResource(auth()->user()));
    }
}
