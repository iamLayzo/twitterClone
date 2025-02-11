<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Crea 15 usuarios utilizando la factory.
        User::factory()->count(15)->create();
    }
}
