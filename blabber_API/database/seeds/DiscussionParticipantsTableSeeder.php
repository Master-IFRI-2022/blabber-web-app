<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DiscussionParticipantsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            DB::table('discussionparticipants')->insert([
                'discussion_id' => $faker->numberBetween(1, 20),
                'user_id' => $faker->numberBetween(1, 10),
                'is_admin' => $faker->boolean,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
