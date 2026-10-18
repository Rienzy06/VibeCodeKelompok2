from pathlib import Path

content = r'''# API Contract — Sistem Peminjaman Buku

**Versi:** 1.0  
**Tanggal:** 18 Oktober 2026  
**Base URL pengembangan:** `http://localhost:8000`  
**Format komunikasi:** HTTP dengan JSON  
**Autentikasi:** Bearer Token

Dokumen ini mendeskripsikan endpoint API yang digunakan pada sistem peminjaman buku. Contoh respons merupakan ilustrasi format respons; nilai data dapat berbeda sesuai isi database dan hasil request.

## 1. Daftar Endpoint

| Layanan | Method | Endpoint | Fungsi | Autentikasi |
|---|---|---|---|---|
| Auth | `POST` | `/api/login` | Memvalidasi kredensial dan menghasilkan token autentikasi | Tidak |
| Auth | `GET` | `/api/me` | Mengambil identitas pengguna berdasarkan token | Ya |
| Auth | `POST` | `/api/logout` | Mengakhiri autentikasi dengan mencabut token pengguna | Ya |
| Books | `GET` | `/api/books` | Mengambil daftar buku dan status ketersediaannya | Tidak |
| Books | `GET` | `/api/books/{id}` | Mengambil detail buku berdasarkan ID | Tidak |
| Loans | `POST` | `/api/loans` | Membuat transaksi peminjaman buku | Ya |
| Loans | `GET` | `/api/loans/me` | Mengambil riwayat peminjaman pengguna yang sedang login | Ya |
| Loans | `GET` | `/api/loans/user/{userId}` | Mengambil transaksi berdasarkan ID pengguna pada URL | Ya |
| Loans | `POST` | `/api/loans/{id}/return` | Memproses pengembalian berdasarkan ID transaksi | Ya |

**Ketentuan:** endpoint pada tabel di atas harus tetap sesuai dengan route backend yang ada di `routes/api.php`. Endpoint `/api/loans/me` digunakan oleh frontend untuk mengambil riwayat pengguna yang sedang login.

## 2. Format Request dan Autentikasi

Endpoint yang memerlukan autentikasi harus menyertakan token Bearer pada header:

```http
Authorization: Bearer <TOKEN>
Accept: application/json
```

Request yang mengirim body JSON juga harus menyertakan:

```http
Content-Type: application/json
```

Token autentikasi aktif dan kredensial rahasia tidak boleh disimpan dalam dokumentasi atau di-commit ke repository.

## 3. Detail Endpoint

### 3.1 Login Pengguna

- **Method:** `POST`
- **Endpoint:** `/api/login`
- **Autentikasi:** Tidak diperlukan
- **Fungsi:** Memvalidasi username dan password, kemudian menghasilkan token autentikasi apabila kredensial benar.

**Request body:**

```json
{
  "username": "student1",
  "password": "<PASSWORD_UJI>"
}
```

**Respons berhasil — `200 OK` (contoh):**

```json
{
  "status": "success",
  "message": "Login berhasil.",
  "data": {
    "token": "<TOKEN>",
    "token_type": "Bearer",
    "expires_in": 7200,
    "user": {
      "id": 1,
      "username": "student1"
    }
  }
}
```

Kredensial di atas merupakan placeholder akun uji. Gunakan akun uji yang tersedia pada database saat melakukan pengujian.

### 3.2 Informasi Pengguna yang Sedang Login

- **Method:** `GET`
- **Endpoint:** `/api/me`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Mengambil identitas pengguna yang terkait dengan token autentikasi.
- **Request body:** Tidak ada.

**Respons berhasil — `200 OK` (contoh):**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "username": "student1"
  }
}
```

### 3.3 Logout Pengguna

- **Method:** `POST`
- **Endpoint:** `/api/logout`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Mengakhiri autentikasi dengan mencabut token yang digunakan untuk request.
- **Request body:** Tidak ada.

Respons berhasil mengikuti format JSON yang dikembalikan oleh endpoint logout pada backend.

### 3.4 Daftar Buku

- **Method:** `GET`
- **Endpoint:** `/api/books`
- **Autentikasi:** Tidak diperlukan
- **Fungsi:** Mengambil daftar buku beserta informasi judul, penulis, dan status ketersediaan.
- **Request body:** Tidak ada.

**Respons berhasil — `200 OK` (contoh):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Pemrograman Web Dasar",
      "author": "Budi Santoso",
      "status": "available"
    }
  ]
}
```

Nilai pada contoh di atas adalah data ilustrasi. Field respons aktual mengikuti data yang dikembalikan backend.

### 3.5 Detail Buku

- **Method:** `GET`
- **Endpoint:** `/api/books/{id}`
- **Autentikasi:** Tidak diperlukan
- **Fungsi:** Mengambil satu data buku berdasarkan ID.
- **Contoh URL:** `http://localhost:8000/api/books/1`
- **Request body:** Tidak ada.

**Respons berhasil — `200 OK` (contoh):**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Pemrograman Web Dasar",
    "author": "Budi Santoso",
    "status": "available"
  }
}
```

ID buku yang tidak valid atau tidak ditemukan ditangani sesuai respons validasi dan resource-not-found pada backend.

### 3.6 Membuat Peminjaman Buku

- **Method:** `POST`
- **Endpoint:** `/api/loans`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Membuat transaksi peminjaman untuk pengguna yang teridentifikasi melalui token.
- **Request body:** Hanya berisi ID buku. Identitas pengguna ditentukan oleh backend dari token autentikasi.

**Request body:**

```json
{
  "bookId": 1
}
```

**Respons berhasil — `201 Created` (contoh):**

```json
{
  "status": "success",
  "message": "Buku berhasil dipinjam.",
  "data": {
    "user_id": 1,
    "book_id": 1,
    "borrow_date": "2026-10-18",
    "due_date": "2026-10-25",
    "status": "active",
    "id": 1
  }
}
```

**Validasi peminjaman:**

- `bookId` wajib diisi dan harus berupa ID buku yang valid.
- Buku harus tersedia untuk dipinjam.
- Pengguna tidak boleh memiliki lebih dari tiga peminjaman aktif.
- Tanggal jatuh tempo ditetapkan tujuh hari setelah tanggal peminjaman.
- Identitas pengguna tidak dikirim melalui body request; backend menggunakan identitas dari token.

Backend menolak request yang tidak memenuhi validasi dan mengembalikan status error sesuai implementasi.

### 3.7 Riwayat Peminjaman Pengguna yang Sedang Login

- **Method:** `GET`
- **Endpoint:** `/api/loans/me`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Mengambil transaksi milik pengguna yang sedang login berdasarkan identitas pada token.
- **Request body:** Tidak ada.

**Contoh URL:** `http://localhost:8000/api/loans/me`

**Respons berhasil — `200 OK` (contoh):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "user_id": "1",
      "book_id": 1,
      "borrow_date": "2026-10-18",
      "due_date": "2026-10-25",
      "status": "active"
    }
  ]
}
```

### 3.8 Riwayat Peminjaman Berdasarkan ID Pengguna

- **Method:** `GET`
- **Endpoint:** `/api/loans/user/{userId}`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Mengambil transaksi berdasarkan nilai `userId` pada URL.
- **Contoh URL:** `http://localhost:8000/api/loans/user/1`
- **Request body:** Tidak ada.

Endpoint ini berbeda dari `/api/loans/me` karena ID pengguna diberikan melalui URL. Akses ke data harus mengikuti aturan otorisasi yang diterapkan backend. Jangan menganggap autentikasi token saja sebagai bukti bahwa pengguna berhak membaca riwayat pengguna lain.

### 3.9 Pengembalian Buku

- **Method:** `POST`
- **Endpoint:** `/api/loans/{id}/return`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Memproses pengembalian berdasarkan ID transaksi peminjaman.
- **Contoh URL:** `http://localhost:8000/api/loans/1/return`
- **Request body:** Tidak ada.

**Respons berhasil — `200 OK` (contoh):**

```json
{
  "status": "success",
  "message": "Buku berhasil dikembalikan.",
  "data": {
    "id": 1,
    "user_id": "1",
    "book_id": 1,
    "borrow_date": "2026-10-18",
    "due_date": "2026-10-25",
    "status": "returned"
  }
}
```

Setelah pengembalian berhasil, status transaksi menjadi `returned` dan status buku menjadi `available`. Respons aktual mengikuti field yang dikembalikan controller.

## 4. Status HTTP

| Status | Makna |
|---|---|
| `200 OK` | Request berhasil diproses, misalnya login, pengambilan data, logout, atau pengembalian. |
| `201 Created` | Transaksi peminjaman berhasil dibuat. |
| `400 Bad Request` | Request tidak memenuhi validasi atau aturan bisnis, misalnya `bookId` tidak valid, buku tidak tersedia, atau batas peminjaman tercapai. |
| `401 Unauthorized` | Token tidak ada, tidak valid, atau kredensial login ditolak sesuai endpoint. |
| `404 Not Found` | Resource yang diminta tidak ditemukan. |

Status dan isi pesan error yang persis harus mengikuti respons dari backend.

## 5. Aturan Bisnis Peminjaman

1. Setiap pengguna dapat memiliki maksimal tiga peminjaman aktif.
2. Buku hanya dapat dipinjam apabila statusnya `available`.
3. Tanggal jatuh tempo ditetapkan tujuh hari setelah tanggal peminjaman.
4. Transaksi peminjaman menggunakan status `active`.
5. Setelah pengembalian berhasil, status transaksi berubah menjadi `returned` dan status buku menjadi `available`.

## 6. Skenario Pengujian API

| ID | Skenario | Hasil yang diharapkan |
|---|---|---|
| T-01 | Login dengan kredensial valid | Token autentikasi diterima dengan `200 OK`. |
| T-02 | Login dengan kredensial salah | Login ditolak. |
| T-03 | Mengambil informasi pengguna dengan token valid | Identitas pengguna dikembalikan dengan `200 OK`. |
| T-04 | Mengambil daftar buku | Daftar buku dikembalikan dengan `200 OK`. |
| T-05 | Mengambil detail buku dengan ID valid | Detail buku dikembalikan dengan `200 OK`. |
| T-06 | Meminjam buku yang tersedia dengan token valid | Transaksi dibuat dengan `201 Created`. |
| T-07 | Mengirim peminjaman tanpa `bookId` yang valid | Request ditolak dengan respons validasi. |
| T-08 | Meminjam buku yang tidak tersedia | Request ditolak dan transaksi baru tidak dibuat. |
| T-09 | Mencoba meminjam ketika sudah memiliki tiga peminjaman aktif | Request ditolak sesuai aturan batas peminjaman. |
| T-10 | Mengambil riwayat melalui `/api/loans/me` | Riwayat pengguna yang sedang login dikembalikan. |
| T-11 | Mengembalikan transaksi peminjaman yang valid | Status transaksi menjadi `returned` dan buku menjadi `available`. |
| T-12 | Mengakses endpoint terlindungi tanpa token valid | Request ditolak dengan `401 Unauthorized`. |

Hasil setiap skenario dicatat berdasarkan pengujian aktual menggunakan Thunder Client atau Postman. Lampirkan bukti request dan response pada direktori pengujian proyek.
'''
path = Path("/mnt/data/API-CONTRACT.md")
path.write_text(content, encoding="utf-8")
print(f"Created {path} ({path.stat().st_size} bytes)")
