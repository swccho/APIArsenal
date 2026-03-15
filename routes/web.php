<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes — SPA fallback
|--------------------------------------------------------------------------
| All routes serve the React SPA; API is under /api.
*/

Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
