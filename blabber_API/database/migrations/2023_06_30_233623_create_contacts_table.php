<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId1');
            $table->unsignedBigInteger('userId2');
            $table->boolean('blockedUser1')->default(false);
            $table->boolean('blockedUser2')->default(false);
            $table->timestamps();

            $table->foreign('userId1')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('userId2')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
