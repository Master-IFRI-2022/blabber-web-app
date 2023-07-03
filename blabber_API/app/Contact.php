<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Contact extends Model
{
    protected $table = 'contacts';

    protected $fillable = [
        'userId1',
        'userId2',
        'blockedUser1',
        'blockedUser2',
        'createdAt',
        'updatedAt',
    ];

    public function user1()
    {
        return $this->belongsTo(User::class, 'userId1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'userId2');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($contact) {
            $exitUser1 = User::find($contact->userId1);
            if (!$exitUser1) {
                throw new \InvalidArgumentException("User 1 does not exist");
            }

            $exitUser2 = User::find($contact->userId2);
            if (!$exitUser2) {
                throw new \InvalidArgumentException("User 2 does not exist");
            }
        });

        static::saving(function ($contact) {
            $exitUser1 = User::find($contact->userId1);
            if (!$exitUser1) {
                throw new \InvalidArgumentException("User 1 does not exist");
            }

            $exitUser2 = User::find($contact->userId2);
            if (!$exitUser2) {
                throw new \InvalidArgumentException("User 2 does not exist");
            }
        });
    }
}
