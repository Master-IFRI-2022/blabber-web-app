<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';

    protected $fillable = [
        'senderId',
        'discussionId',
        'text',
        'reactions',
        'file',
        'responseToMessageId',
        'createdAt',
        'updatedAt',
    ];

    protected $casts = [
        'reactions' => 'json',
        'file' => 'json',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'senderId');
    }

    public function responseToMessage()
    {
        return $this->belongsTo(Message::class, 'responseToMessageId');
    }

    public function discussion()
    {
        return $this->belongsTo(Discussion::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($message) {
            foreach ($message->reactions as $reaction) {
                $exitUser = User::find($reaction['userId']);
                if (!$exitUser) {
                    throw new \InvalidArgumentException("User {$reaction['userId']} does not exist");
                }
            }

            if ($message->responseToMessageId) {
                $exitMessage = Message::find($message->responseToMessageId);
                if (!$exitMessage) {
                    throw new \InvalidArgumentException("Message {$message->responseToMessageId} does not exist");
                }
            }

            $exitDiscussion = Discussion::find($message->discussionId);
            if (!$exitDiscussion) {
                throw new \InvalidArgumentException("Discussion {$message->discussionId} does not exist");
            }
        });

        static::saving(function ($message) {
            foreach ($message->reactions as $reaction) {
                $exitUser = User::find($reaction['userId']);
                if (!$exitUser) {
                    throw new \InvalidArgumentException("User {$reaction['userId']} does not exist");
                }
            }

            if ($message->responseToMessageId) {
                $exitMessage = Message::find($message->responseToMessageId);
                if (!$exitMessage) {
                    throw new \InvalidArgumentException("Message {$message->responseToMessageId} does not exist");
                }
            }

            $exitDiscussion = Discussion::find($message->discussionId);
            if (!$exitDiscussion) {
                throw new \InvalidArgumentException("Discussion {$message->discussionId} does not exist");
            }
        });
    }
}
