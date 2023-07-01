<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    protected $table = 'requests';

    protected $fillable = [
        'senderId',
        'receiverId',
        'accepted',
        'createdAt',
        'updatedAt'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'senderId');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiverId');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($request) {
            // Check if senderId and receiverId exist
            $exitUser = User::find($request->senderId);
            if (!$exitUser) {
                throw new \InvalidArgumentException('Sender does not exist');
            }

            $exitUser = User::find($request->receiverId);
            if (!$exitUser) {
                throw new \InvalidArgumentException('Receiver does not exist');
            }
        });

        static::saving(function ($request) {
            // Check if senderId and receiverId exist
            $exitUser = User::find($request->senderId);
            if (!$exitUser) {
                throw new \InvalidArgumentException('Sender does not exist');
            }

            $exitUser = User::find($request->receiverId);
            if (!$exitUser) {
                throw new \InvalidArgumentException('Receiver does not exist');
            }
        });
    }
}
