<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('books')->insert([
            [
                'title' => 'Pemrograman Web Dasar',
                'author' => 'Budi Santoso',
                'status' => 'available',
            ],
            [
                'title' => 'Sistem Informasi Manajemen',
                'author' => 'Andi Wijaya',
                'status' => 'available',
            ],
            [
                'title' => 'Basis Data untuk Pemula',
                'author' => 'Dewi Lestari',
                'status' => 'available',
            ],
            [
                'title' => 'Analisis dan Perancangan Sistem',
                'author' => 'Rina Putri',
                'status' => 'available',
            ],
            [
                'title' => 'Rekayasa Perangkat Lunak',
                'author' => 'Fajar Nugraha',
                'status' => 'available',
            ],
        ]);
    }
}