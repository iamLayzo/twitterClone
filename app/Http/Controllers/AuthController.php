<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Registro de usuario.
     */
    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::login($user);

            return response()->json([
                'message' => 'Usuario registrado y logueado con éxito',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Inicio de sesión.
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('username', 'password');
    
        if (Auth::attempt($credentials)) { 
            $request->session()->regenerate();
    
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'message' => 'Login exitoso',
                'user' => $user,
                'token' => $token,
                'redirect' => route('home') // 🔥 Redirección a Home
            ]);
        }
    
        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }
    
    /**
     * Cierre de sesión.
     */
    public function logout(Request $request)
    {
        // Revoca el token actual, si existe
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
    
        return response()->json(['message' => 'Logout exitoso']);
    }
    
    
}
