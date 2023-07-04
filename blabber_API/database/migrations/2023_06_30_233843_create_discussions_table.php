<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscussionsTable extends Migration
{
    public function up()
    {
        Schema::create('discussions', function (Blueprint $table) {
            $table->id();
            $table->enum('tag', ['PRIVATE', 'GROUP'])->default('PRIVATE');
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->unsignedBigInteger('createdById');
            $table->timestamps();

            // Add foreign key constraints if needed
            $table->foreign('createdById')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('discussion_participants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('discussionId');
            $table->unsignedBigInteger('userId');
            $table->boolean('isAdmin')->default(false);
            $table->boolean('hasNewNotif')->default(false);
            $table->boolean('isArchivedChat')->default(false);
            $table->unsignedBigInteger('addedAt')->nullable();
            $table->timestamps();

            // Add foreign key constraints if needed
            $table->foreign('discussionId')->references('id')->on('discussions')->onDelete('cascade');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('discussion_participants');
        Schema::dropIfExists('discussions');
    }
}


