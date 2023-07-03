<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ContactsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            DB::table('contacts')->insert([
                'userId1' => $faker->numberBetween(1, 10), // Remplacer 10 par l'ID maximal de la table "users"
                'userId2' => $faker->numberBetween(1, 10), // Remplacer 10 par l'ID maximal de la table "users"
                'blockedUser1' => $faker->boolean,
                'blockedUser2' => $faker->boolean,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
