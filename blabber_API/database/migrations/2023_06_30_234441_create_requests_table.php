<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('senderId');
            $table->unsignedBigInteger('recipientId');
            $table->string('status')->default('pending');
            $table->timestamps();

            // Add foreign key constraints if needed
            // $table->foreign('senderId')->references('id')->on('users')->onDelete('cascade');
            // $table->foreign('recipientId')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('requests');
    }
}
