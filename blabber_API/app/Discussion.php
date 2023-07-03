<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    protected $table = 'discussions';

    protected $fillable = [
        'tag',
        'name',
        'description',
        'createdById',
        'participants',
        'lastMessage',
        'createdAt',
        'updatedAt',
    ];

    protected $casts = [
        'participants' => 'json',
        'lastMessage' => 'json',
    ];

    public function participants()
    {
        return $this->hasMany(DiscussionParticipant::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($discussion) {
            foreach ($discussion->participants as $participant) {
                $exitUser = User::find($participant['userId']);
                if (!$exitUser) {
                    throw new \InvalidArgumentException("User {$participant['userId']} does not exist");
                }
            }
        });

        static::saving(function ($discussion) {
            foreach ($discussion->participants as $participant) {
                $exitUser = User::find($participant['userId']);
                if (!$exitUser) {
                    throw new \InvalidArgumentException("User {$participant['userId']} does not exist");
                }
            }
        });
    }
}
