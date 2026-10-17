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
            // 3 Buku Tambahan Baru:
            [
                'title' => 'Algoritma dan Pemrograman',
                'author' => 'Ahmad Fauzi',
                'status' => 'available',
            ],
            [
                'title' => 'Jaringan Komputer Lanjut',
                'author' => 'Siti Aminah',
                'status' => 'available',
            ],
            [
                'title' => 'Kecerdasan Buatan',
                'author' => 'Eko Prasetyo',
                'status' => 'available',
            ],
            [
                'title' => 'Data Mining',
                'author' => 'Dr. Hendra Gunawan',
                'status' => 'available',
            ],
            [
                'title' => 'Rekayasa Bisnis Proses',
                'author' => 'Prof. Maya Indriani',
                'status' => 'available',
            ],
        ]);
    }
}