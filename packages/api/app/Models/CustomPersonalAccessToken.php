<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class CustomPersonalAccessToken extends SanctumPersonalAccessToken
{
    protected $primaryKey = 'id';

    protected $keyType='string';

    protected $table = 'personal_access_tokens';
}
