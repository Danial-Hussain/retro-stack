<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Post;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_id' => fake()->randomElement(User::pluck('id')->toArray()),
            'post_id' => fake()->randomElement(Post::pluck('id')->toArray()),
            'reply' => fake()->text()
        ];
    }
}
