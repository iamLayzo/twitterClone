<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

// Redirigir a /dashboard por defecto
Route::redirect('/', '/home');

// Rutas protegidas
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/home', fn() => Inertia::render('Home'))->name('home');

    // ✅ Ruta dinámica para perfiles
    Route::get('/profile/{username}', fn($username) => Inertia::render('Profile', [
        'username' => $username // Solo pasamos el username, los datos vendrán de la API
    ]))->name('profile');

    Route::get('/profile/{username}/followers', fn($username) => Inertia::render('Followers', [
        'username' => $username
    ]))->name('followers');

    Route::get('/profile/{username}/followings', fn($username) => Inertia::render('Followings', [
        'username' => $username
    ]))->name('followings');
});

// Rutas públicas
Route::get('/login', fn() => Inertia::render('Login'))->name('login')->middleware('guest');
Route::get('/register', fn() => Inertia::render('SignUp'))->name('register')->middleware('guest');

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
