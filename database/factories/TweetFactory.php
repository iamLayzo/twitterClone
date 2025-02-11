<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tweet>
 */
class TweetFactory extends Factory
{
    protected $model = \App\Models\Tweet::class;

    public function definition()
    {
        return [
            // Genera un texto de hasta 280 caracteres
            'content' => $this->faker->text(280),
            // El campo user_id se asignará en el seeder
        ];
    }
}
