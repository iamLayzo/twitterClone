<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');                 // Nombre completo
            $table->string('username')->unique();   // Nombre de usuario único
            $table->string('email')->unique();      // Email único
            $table->string('password');             // Contraseña (hash)
            $table->rememberToken();                // Token para recordar sesión
            $table->timestamps();                   // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
