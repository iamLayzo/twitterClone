<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Tweet;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::factory()->count(20)->create();

        $users->each(function ($user) {
            Tweet::factory()->count(10)->create([
                'user_id' => $user->id,
            ]);
        });

        // 3. Crear relaciones de follows
        // Cada usuario seguirá a todos los demás (sin seguirse a sí mismo)
        $users->each(function ($user) use ($users) {
            // Obtenemos todos los usuarios excepto el actual
            $others = $users->where('id', '!=', $user->id);
            foreach ($others as $other) {
                DB::table('follows')->insert([
                    'follower_id' => $user->id,
                    'followed_id' => $other->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }
}
