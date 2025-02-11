<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tweet;
use App\Models\User;

class TweetsTableSeeder extends Seeder
{
    public function run(): void
    {
        // Obtiene todos los usuarios
        $users = User::all();

        // Para cada usuario, crea entre 10 y 20 tweets
        $users->each(function ($user) {
            Tweet::factory()->count(rand(10, 20))->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
