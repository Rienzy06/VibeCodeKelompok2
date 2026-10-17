# Sistem Peminjaman Buku

Aplikasi berbasis web untuk melihat katalog buku, memeriksa ketersediaan,
melakukan peminjaman, dan melihat riwayat peminjaman.

## Teknologi
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Lumen 10
- **Database:** MySQL
- **API:** REST API

## Fitur
- Menampilkan daftar buku dan status ketersediaannya.
- Menampilkan detail buku.
- Login dan autentikasi pengguna menggunakan token.
- Melakukan peminjaman buku.
- Membatasi maksimal 3 peminjaman aktif per pengguna.
- Menetapkan masa peminjaman selama 7 hari.
- Memperbarui status buku setelah dipinjam.
- Menampilkan riwayat peminjaman pengguna.
- Logout dan mengakhiri sesi autentikasi.

## Struktur Sistem
```text
VibeCodeKelompok2/
├── docs/
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
├── lumen-service/
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── public/
├── README.md
└── package-lock.json
````

## Arsitektur Sistem
```text
Pengguna
   |
   v
Frontend (HTML, CSS, JavaScript)
   |
   | REST API
   v
Lumen Service
   |
   | Query database
   v
MySQL Database
```

## Endpoint API

### Autentikasi

| Method | Endpoint      | Fungsi                       | Autentikasi |
| ------ | ------------- | ---------------------------- | ----------- |
| POST   | `/api/login`  | Login dan memperoleh token   | Tidak       |
| GET    | `/api/me`     | Mengambil identitas pengguna | Ya          |
| POST   | `/api/logout` | Logout dan mencabut token    | Ya          |

### Buku

| Method | Endpoint          | Fungsi                  | Autentikasi |
| ------ | ----------------- | ----------------------- | ----------- |
| GET    | `/api/books`      | Menampilkan daftar buku | Tidak       |
| GET    | `/api/books/{id}` | Menampilkan detail buku | Tidak       |

### Peminjaman

| Method | Endpoint                   | Fungsi                                  | Autentikasi |
| ------ | -------------------------- | --------------------------------------- | ----------- |
| POST   | `/api/loans`               | Melakukan peminjaman buku               | Ya          |
| GET    | `/api/loans/me`            | Melihat riwayat peminjaman sendiri      | Ya          |
| GET    | `/api/loans/user/{userId}` | Melihat riwayat berdasarkan ID pengguna | Ya          |

## Aturan Peminjaman
1. Pengguna harus login untuk melakukan peminjaman.
2. Buku harus tersedia agar dapat dipinjam.
3. Setiap pengguna dapat memiliki maksimal 3 peminjaman aktif.
4. Masa peminjaman adalah 7 hari.
5. Status buku diperbarui setelah peminjaman berhasil.
6. Pengguna dapat melihat riwayat peminjamannya.

## Konfigurasi Database
Aplikasi menggunakan MySQL.

Sebelum menjalankan aplikasi:
1. Pastikan MySQL aktif.
2. Buat database sesuai konfigurasi proyek.
3. Sesuaikan pengaturan koneksi database pada file `.env` backend.
4. Pastikan tabel dan data yang diperlukan tersedia.

## Menjalankan Backend
1. Masuk ke folder `lumen-service`.
2. Pastikan dependensi PHP telah terpasang.
3. Pastikan konfigurasi database pada `.env` sudah sesuai.
4. Jalankan server Lumen:

   ```bash
   php -S 127.0.0.1:8000 -t public
   ```

Backend dapat diakses melalui:

`http://127.0.0.1:8000`

## Menjalankan Frontend

Jalankan frontend menggunakan server statis, misalnya Live Server di Visual Studio Code.

Pada konfigurasi pengembangan yang digunakan, frontend berjalan melalui port `5500`, sedangkan backend berjalan melalui port `8000`.

Pastikan konfigurasi URL API pada frontend mengarah ke backend yang benar.

## Pengujian
Pengujian aplikasi perlu mencakup:

* Login dengan kredensial yang benar dan salah.
* Pengambilan daftar buku.
* Peminjaman buku yang tersedia.
* Penolakan peminjaman buku yang tidak tersedia.
* Batas maksimal 3 peminjaman aktif.
* Masa peminjaman selama 7 hari.
* Pengambilan riwayat peminjaman.
* Logout dan autentikasi ulang.

## Tim Pengembang
Proyek Sistem Peminjaman Buku dikembangkan secara berkelompok menggunakan Git dan GitHub untuk kolaborasi, pengelolaan kode, serta integrasi hasil pengembangan.
