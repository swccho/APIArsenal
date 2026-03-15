<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\MeController;
use App\Http\Controllers\Api\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Auth and API routes. Prefix: /api
|
*/

Route::prefix('auth')->middleware('web')->group(function () {
    // Auth (public)
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'login']);

    // Auth (protected)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LogoutController::class, 'logout']);
        Route::get('/me', [MeController::class, 'show']);
    });
});
