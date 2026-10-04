# Sistem Peminjaman Buku

Sistem Peminjaman Buku merupakan aplikasi berbasis web yang dikembangkan untuk membantu mahasiswa melihat ketersediaan buku dan melakukan peminjaman secara terstruktur. Proyek ini dikembangkan menggunakan pendekatan **AI-assisted development** dengan proses analisis kebutuhan, implementasi, pengujian, dan perbaikan secara bertahap.

## 1. Latar Belakang

Peminjaman buku membutuhkan informasi ketersediaan dan pencatatan transaksi yang terorganisasi. Oleh karena itu, sistem ini dikembangkan untuk mempermudah pengguna melihat daftar buku, meminjam buku yang tersedia, serta memantau informasi peminjaman.

Pada awal pengembangan, sistem dirancang menggunakan frontend dengan penyimpanan data sederhana. Setelah revisi berdasarkan arahan dosen, arsitektur dikembangkan menjadi satu backend service menggunakan Lumen, database MySQL, dan REST API sebagai media komunikasi antara frontend dan backend.

## 2. Tujuan Sistem

* Menampilkan daftar buku beserta status ketersediaannya.
* Memungkinkan mahasiswa meminjam buku yang tersedia.
* Membatasi peminjaman maksimal tiga buku aktif untuk setiap pengguna.
* Mencegah buku yang sedang dipinjam dipinjam kembali oleh pengguna lain.
* Menyimpan tanggal peminjaman dan tanggal jatuh tempo tujuh hari setelah peminjaman.
* Menampilkan informasi dan riwayat peminjaman pengguna.

## 3. Teknologi yang Digunakan

| Teknologi          | Fungsi                                          |
| ------------------ | ----------------------------------------------- |
| HTML5              | Menyusun struktur halaman web                   |
| CSS3               | Mengatur tampilan antarmuka                     |
| Vanilla JavaScript | Mengelola interaksi frontend dan permintaan API |
| Lumen 10           | Menyediakan backend service dan REST API        |
| MySQL/MariaDB      | Menyimpan data buku dan transaksi peminjaman    |
| Composer           | Mengelola dependensi PHP                        |
| Git dan GitHub     | Mengelola versi kode dan kolaborasi tim         |
| Thunder Client     | Menguji endpoint API                            |

## 4. Arsitektur Sistem

Sistem menggunakan satu backend service berbasis Lumen. Fungsi pengelolaan buku dan peminjaman berada dalam service yang sama, sedangkan MySQL digunakan sebagai penyimpanan data.

```text
Frontend
HTML + CSS + Vanilla JavaScript
              |
              | REST API
              v
       Lumen Service
       ├── Book API
       └── Loan API
              |
              v
       MySQL / MariaDB
       ├── books
       └── loans
```

Frontend mengirimkan permintaan melalui REST API. Lumen memproses permintaan, menjalankan aturan bisnis, berinteraksi dengan database, kemudian mengirimkan respons kepada frontend dalam format JSON.

## 5. Fitur Utama

### 5.1 Daftar Buku

Menampilkan daftar buku, informasi judul dan penulis, serta status ketersediaannya.

### 5.2 Detail Buku

Mengambil informasi sebuah buku berdasarkan ID melalui API.

### 5.3 Peminjaman Buku

Pengguna dapat meminjam buku yang berstatus tersedia.

### 5.4 Batas Peminjaman

Setiap pengguna dibatasi maksimal tiga buku dengan status peminjaman aktif.

### 5.5 Validasi Ketersediaan

Buku yang sedang dipinjam tidak dapat dipinjam kembali selama statusnya belum tersedia.

### 5.6 Informasi Peminjaman

Sistem mencatat ID pengguna, ID buku, tanggal peminjaman, tanggal jatuh tempo, dan status peminjaman.

## 6. Aturan Bisnis

1. Pengguna harus memasukkan User ID untuk melakukan peminjaman.
2. Buku harus tersedia agar dapat dipinjam.
3. Setiap pengguna hanya boleh memiliki maksimal tiga peminjaman aktif.
4. Buku yang sudah berstatus dipinjam tidak dapat dipinjam oleh pengguna lain.
5. Masa peminjaman ditetapkan selama tujuh hari.
6. Data buku dan transaksi disimpan dalam database MySQL/MariaDB.
7. Permintaan dari frontend diproses melalui REST API pada Lumen.

**Catatan:** Pada tahap ini, User ID digunakan sebagai identitas pengguna untuk transaksi dan bukan sebagai sistem autentikasi akun.

## 7. Struktur Database

Sistem menggunakan dua tabel utama.

### Tabel `books`

| Field        | Tipe Data       | Keterangan                  |
| ------------ | --------------- | --------------------------- |
| `id`         | BIGINT UNSIGNED | Primary key                 |
| `title`      | VARCHAR(255)    | Judul buku                  |
| `author`     | VARCHAR(150)    | Nama penulis                |
| `status`     | ENUM            | `available` atau `borrowed` |
| `created_at` | TIMESTAMP       | Waktu pembuatan data        |
| `updated_at` | TIMESTAMP       | Waktu pembaruan data        |

### Tabel `loans`

| Field         | Tipe Data       | Keterangan                   |
| ------------- | --------------- | ---------------------------- |
| `id`          | BIGINT UNSIGNED | Primary key                  |
| `user_id`     | VARCHAR(50)     | Identitas pengguna           |
| `book_id`     | BIGINT UNSIGNED | Foreign key ke tabel `books` |
| `borrow_date` | DATE            | Tanggal peminjaman           |
| `due_date`    | DATE            | Tanggal jatuh tempo          |
| `status`      | ENUM            | `active` atau `returned`     |
| `created_at`  | TIMESTAMP       | Waktu pembuatan data         |
| `updated_at`  | TIMESTAMP       | Waktu pembaruan data         |

Relasi database adalah **one-to-many** dari `books` ke `loans`. Satu data buku dapat memiliki beberapa catatan transaksi peminjaman dari waktu ke waktu.

## 8. Endpoint REST API

| Method | Endpoint                   | Fungsi                                |
| ------ | -------------------------- | ------------------------------------- |
| GET    | `/api/books`               | Mengambil daftar buku                 |
| GET    | `/api/books/{id}`          | Mengambil detail buku                 |
| POST   | `/api/loans`               | Membuat transaksi peminjaman          |
| GET    | `/api/loans/user/{userId}` | Mengambil riwayat peminjaman pengguna |

### Contoh Permintaan Peminjaman

```json
{
  "userId": "student1",
  "bookId": 1
}
```

Permintaan dikirim menggunakan metode `POST` ke `/api/loans`.

Respons berhasil menggunakan HTTP `201 Created`, sedangkan permintaan yang tidak memenuhi aturan bisnis akan menghasilkan respons kesalahan yang sesuai.

## 9. Persyaratan Sistem

* PHP dengan ekstensi PDO MySQL yang aktif.
* Composer.
* MySQL atau MariaDB.
* Browser web modern.
* Visual Studio Code atau editor kode sejenis.
* Git untuk mengambil dan mengelola source code.

## 10. Cara Menjalankan Proyek

### 10.1 Clone Repository

```bash
git clone <URL_REPOSITORY>
cd VibeCodeKelompok2
```

Ganti `<URL_REPOSITORY>` dengan URL repository GitHub kelompok.

### 10.2 Instal Dependensi

```bash
cd lumen-service
composer install
```

### 10.3 Konfigurasi Environment

Siapkan file `.env` berdasarkan `.env.example` jika file `.env` belum tersedia.

Atur konfigurasi database sesuai lingkungan lokal:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=buku_peminjaman
DB_USERNAME=root
DB_PASSWORD=
```

Sesuaikan username dan password dengan konfigurasi MySQL/MariaDB pada komputer masing-masing. Jangan mengunggah file `.env` yang berisi kredensial pribadi ke repository.

### 10.4 Buat Database

Buat database dengan nama:

```sql
CREATE DATABASE buku_peminjaman;
```

Pastikan MySQL/MariaDB sedang berjalan.

### 10.5 Jalankan Migration dan Seeder

Dari folder `lumen-service`, jalankan:

```bash
php artisan migrate
php artisan db:seed --class=BookSeeder
```

Migration digunakan untuk membuat struktur tabel, sedangkan seeder memasukkan data awal buku.

### 10.6 Jalankan Backend

```bash
php -S localhost:8000 -t public
```

Backend tersedia pada:

`http://localhost:8000`

### 10.7 Jalankan Frontend

Buka folder `frontend` menggunakan Visual Studio Code dan jalankan `index.html` melalui ekstensi Live Server atau server web lokal lainnya.

Pastikan konfigurasi `API_BASE_URL` pada `frontend/js/api.js` mengarah ke alamat backend yang benar.

## 11. Pengujian Sistem

Pengujian dilakukan terhadap endpoint API dan integrasi frontend dengan backend. Skenario pengujian meliputi:

* Mengambil daftar buku.
* Mengambil detail buku berdasarkan ID.
* Meminjam buku yang tersedia.
* Menolak peminjaman buku yang tidak tersedia.
* Menolak peminjaman keempat ketika tiga buku masih aktif.
* Menampilkan riwayat peminjaman pengguna.
* Memastikan tanggal jatuh tempo tujuh hari setelah tanggal peminjaman.
* Memastikan status buku diperbarui setelah transaksi peminjaman berhasil.

Hasil pengujian akhir perlu dicatat berdasarkan pelaksanaan pengujian yang benar-benar dilakukan pada versi repository yang digunakan.

## 12. Pengembangan Berbasis AI

AI digunakan sebagai alat bantu dalam proses pengembangan, termasuk analisis kebutuhan, penyusunan rancangan database, implementasi, penanganan kesalahan, dan penyusunan skenario pengujian.

Hasil yang diberikan AI ditinjau dan diuji kembali oleh anggota kelompok. Perubahan kode dan perbaikan dilakukan secara bertahap menggunakan Git agar proses pengembangan dapat ditelusuri.

## 13. Pengembang

Proyek ini dikerjakan secara berkelompok. Setiap anggota berkontribusi melalui pembagian tugas, pengembangan kode, pengujian, integrasi, dan pengelolaan repository menggunakan Git dan GitHub.

## 14. Status Proyek

Proyek dikembangkan melalui dua tahap utama:

1. **Sebelum revisi:** rancangan awal menggunakan pendekatan service terpisah dan penyimpanan data sederhana.
2. **Sesudah revisi:** satu backend service berbasis Lumen dengan MySQL sebagai database dan REST API sebagai jalur komunikasi dengan frontend.

Pengembangan selanjutnya mengikuti kebutuhan tugas dan hasil evaluasi pengujian.
