<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DiscussionParticipant extends Model
{
    protected $table = 'discussion_participants';

    protected $fillable = [
        'discussion_id',
        'userId',
        'isAdmin',
        'hasNewNotif',
        'isArchivedChat',
        'addedAt',
    ];

    protected $casts = [
        'isAdmin' => 'boolean',
        'hasNewNotif' => 'boolean',
        'isArchivedChat' => 'boolean',
    ];

    public function discussion()
    {
        return $this->belongsTo(Discussion::class);
    }
}
