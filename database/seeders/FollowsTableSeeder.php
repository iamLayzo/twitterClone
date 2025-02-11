<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class FollowsTableSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        $users->each(function ($user) use ($users) {
            // Excluir al usuario actual
            $others = $users->where('id', '!=', $user->id);
            $othersCount = $others->count();

            if ($othersCount > 0) {
                // Escoger un número aleatorio de usuarios a seguir (entre 3 y 8, sin exceder el total disponible)
                $followCount = min(rand(3, 8), $othersCount);
                // Seleccionar aleatoriamente esos usuarios
                $toFollow = $others->random($followCount);

                foreach ($toFollow as $followed) {
                    DB::table('follows')->insert([
                        'follower_id' => $user->id,
                        'followed_id' => $followed->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        });
    }
}
