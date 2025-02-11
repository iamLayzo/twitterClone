<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Session\Middleware\StartSession;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // 🔥 Adaptado al estilo moderno de Laravel 11
        $middleware->web(append: [
            StartSession::class, // ✅ Necesario para sesiones en Inertia.js
            HandleInertiaRequests::class, // ✅ Middleware de Inertia
        ]);

        $middleware->api(EnsureFrontendRequestsAreStateful::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Validaciones incorrectas (Errores 422)
        $exceptions->renderable(function (\Illuminate\Validation\ValidationException $e, $request) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors(),
            ], 422);
        });

        // No autenticado (Errores 401)
        $exceptions->renderable(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'No autenticado'], 401);
            }
            // En solicitudes web normales, redirigimos al login
            return redirect()->guest(route('login'));
        });
        

        // No autorizado (Errores 403)
        $exceptions->renderable(function (\Illuminate\Auth\Access\AuthorizationException $e, $request) {
            return response()->json(['message' => 'No autorizado'], 403);
        });

        // Recurso no encontrado (Errores 404)
        $exceptions->renderable(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            return response()->json(['message' => 'No encontrado'], 404);
        });

        // Otros errores genéricos (Errores 500)
        $exceptions->renderable(function (\Throwable $e, $request) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage(),
            ], 500);
        });
    })
    ->create();
