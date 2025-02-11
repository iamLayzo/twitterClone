<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\FollowController;
use Illuminate\Session\Middleware\StartSession;

// 🔥 Middleware para sesiones en rutas públicas
Route::middleware([StartSession::class])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// 🔥 Rutas protegidas con Sanctum (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // 📌 Rutas de Tweets
    Route::prefix('tweets')->group(function () {
        Route::get('/', [TweetController::class, 'index']); // 🔥 Tweets de usuario + seguidos + seguidores
        Route::post('/', [TweetController::class, 'store']); // 🔥 Crear un tweet
        Route::get('/user/{username}', [TweetController::class, 'userTweets']); // 🔥 Obtener tweets de un usuario en específico
    });

    // 📌 Rutas de Seguimiento (Followers/Following)
    Route::prefix('follow')->group(function () {
        Route::post('/{username}', [FollowController::class, 'follow']); // 🔥 Seguir usuario
        Route::delete('/{username}', [FollowController::class, 'unfollow']); // 🔥 Dejar de seguir
        Route::get('/followers/{username}', [FollowController::class, 'listFollowers']); // 🔥 Lista de seguidores
        Route::get('/followings/{username}', [FollowController::class, 'listFollowings']); // 🔥 Lista de seguidos
        Route::get('/stats/{username}', [FollowController::class, 'getFollowStats']); // 🔥 Estadísticas de seguidores y seguidos
    });
});
