<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('senderId');
            $table->unsignedBigInteger('discussionId');
            $table->text('text')->nullable();
            $table->json('reactions')->nullable();
            $table->json('file')->nullable();
            $table->unsignedBigInteger('responseToMessageId')->nullable();
            $table->timestamps();

            // Add foreign key constraints if needed
            // $table->foreign('senderId')->references('id')->on('users')->onDelete('cascade');
            // $table->foreign('discussionId')->references('id')->on('discussions')->onDelete('cascade');
            // $table->foreign('responseToMessageId')->references('id')->on('messages')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
