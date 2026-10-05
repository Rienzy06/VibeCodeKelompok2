# Sistem Peminjaman Buku

Aplikasi berbasis web untuk melihat daftar buku, memeriksa ketersediaan, dan melakukan peminjaman buku.

## Teknologi

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Lumen 10
* **Database:** MySQL
* **API:** REST API

## Fitur

* Menampilkan daftar dan status ketersediaan buku.
* Melakukan peminjaman buku.
* Membatasi maksimal 3 peminjaman aktif per pengguna.
* Menetapkan masa peminjaman selama 7 hari.
* Menampilkan riwayat peminjaman.

## Struktur Sistem

```text
Frontend
   ↓ REST API
Lumen Service
   ↓
MySQL Database
```


## Endpoint API

| Method | Endpoint                   | Fungsi                     |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/books`               | Menampilkan daftar buku    |
| GET    | `/api/books/{id}`          | Menampilkan detail buku    |
| POST   | `/api/loans`               | Melakukan peminjaman       |
| GET    | `/api/loans/user/{userId}` | Melihat riwayat peminjaman |

## Tim Pengembang

Proyek ini dikembangkan secara berkelompok menggunakan Git dan GitHub untuk kolaborasi dan pengelolaan kode.
