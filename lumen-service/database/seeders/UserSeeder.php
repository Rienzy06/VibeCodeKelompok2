<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Akun Student 1
        DB::table('users')->updateOrInsert(
            ['username' => 'student1'],
            [
                'password' => Hash::make('Student123!'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        // Akun Student 2
        DB::table('users')->updateOrInsert(
            ['username' => 'student2'],
            [
                'password' => Hash::make('Student123!'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );
    }
}