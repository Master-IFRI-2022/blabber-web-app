<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'username' => $faker->userName,
                'email' => $faker->email,
                'password' => Hash::make('password123'),
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
