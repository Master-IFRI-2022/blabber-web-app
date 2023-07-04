<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'email',
        'username',
        'firstname',
        'lastname',
        'photoUrl',
        'password',
        'createdAt',
        'updatedAt'
    ];

    protected $hidden = [
        'password'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            // Password validation
            if ($user->password) {
                $strongRegex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/";
                if (!preg_match($strongRegex, $user->password)) {
                    throw new \InvalidArgumentException('Password must contain at least one uppercase character, one lowercase character, one numeric character, and one special character.');
                }
            }
        });

        static::saving(function ($user) {
            // Email validation
            if ($user->email) {
                $existingUser = self::where('email', $user->email)->first();
                if ($existingUser) {
                    throw new \InvalidArgumentException('Email is already used');
                }
            }

            // Username validation
            if ($user->username) {
                $existingUser = self::where('username', $user->username)->first();
                if ($existingUser) {
                    throw new \InvalidArgumentException('Username is already used');
                }
            }
        });
    }
}
