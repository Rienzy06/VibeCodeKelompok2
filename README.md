# Sistem Peminjaman Buku

Aplikasi Sistem Peminjaman Buku yang dikembangkan menggunakan arsitektur **microservice** untuk memisahkan pengelolaan data buku dan proses peminjaman.

## Fitur

- Melihat daftar dan ketersediaan buku
- Meminjam buku
- Maksimal 3 buku aktif per mahasiswa
- Masa peminjaman 7 hari
- Melihat informasi peminjaman

## Arsitektur

User
↓
Frontend

- Book Service (:3001)
- Loan Service (:3002)
  ↓
  Book Service

Frontend berkomunikasi dengan service menggunakan REST API, sedangkan Loan Service berkomunikasi dengan Book Service untuk mengecek dan memperbarui status buku.

Teknologi
HTML5, CSS3, Vanilla JavaScript
Node.js & Express.js
REST API
JSON File Storage
CORS
Struktur Project
VibeCodeKelompok2/
├── book-service/
├── loan-service/
├── frontend/
├── docs/
└── README.md
Dokumentasi

Dokumentasi arsitektur, testing, penggunaan AI Coding Tool, dan laporan tersedia di folder docs/.
