<?php

namespace App\GraphQL\Mutations;

use App\Models\User;

final class Register
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user = User::create([
            'email' => $args['email'],
            'username' => $args['username'],
            'password' => $args['password']
        ]);

        $token = $user->createToken('myappToken')->plainTextToken;
        $user->remember_token = $token;

        $user->save();

        return $user;
    }
}
