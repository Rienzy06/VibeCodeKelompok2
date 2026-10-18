# API Contract — Sistem Peminjaman Buku

**Versi:** 1.0  
**Tanggal:** 18 Oktober 2026  
**Base URL:** `http://localhost:8000`  
**Format komunikasi:** HTTP dengan JSON  
**Autentikasi:** Bearer Token

## 1. Daftar Endpoint

| Layanan | Method | Endpoint | Fungsi | Autentikasi |
|---|---|---|---|---|
| Auth | POST | `/api/login` | Login pengguna dan memperoleh token autentikasi | Tidak |
| Auth | GET | `/api/me` | Mengambil informasi pengguna yang sedang login | Ya |
| Books | GET | `/api/books` | Mengambil daftar buku | Tidak |
| Books | GET | `/api/books/{id}` | Mengambil detail buku berdasarkan ID | Tidak |
| Loans | POST | `/api/loans` | Membuat transaksi peminjaman buku | Ya |
| Loans | GET | `/api/loans/user/{userId}` | Mengambil riwayat peminjaman berdasarkan ID pengguna | Ya |
| Loans | POST | `/api/loans/{id}/return` | Memproses pengembalian buku | Ya |

## 2. Autentikasi

Endpoint yang memerlukan autentikasi menggunakan token Bearer yang diperoleh dari endpoint login.

Header untuk endpoint terlindungi:

```http
Authorization: Bearer <TOKEN>
Accept: application/json
```

Untuk request dengan body JSON, gunakan header:

```http
Content-Type: application/json
```

Jangan memasukkan token autentikasi aktif ke dokumentasi atau repository.

## 3. Detail Endpoint

### 3.1 Login Pengguna

- **Method:** `POST`
- **Endpoint:** `/api/login`
- **Autentikasi:** Tidak diperlukan
- **Fungsi:** Memvalidasi kredensial pengguna dan menghasilkan token autentikasi.
- **Request body:**

```json
{
  "username": "student4",
  "password": "12345"
}
```

- **Response berhasil — `200 OK`:**

```json
{
  "status": "success",
  "message": "Login berhasil.",
  "data": {
    "token": "<TOKEN>",
    "token_type": "Bearer",
    "expires_in": 7200,
    "user": {
      "id": 2,
      "username": "student4"
    }
  }
}
```

### 3.2 Informasi Pengguna yang Sedang Login

- **Method:** `GET`
- **Endpoint:** `/api/me`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Mengembalikan identitas pengguna berdasarkan token autentikasi.
- **Request body:** Tidak ada.
- **Response berhasil — `200 OK`:**

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "username": "student4"
  }
}
```

### 3.3 Daftar Buku

- **Method:** `GET`
- **Endpoint:** `/api/books`
- **Autentikasi:** Tidak diperlukan
- **Fungsi:** Mengembalikan daftar buku beserta informasi dan status ketersediaannya.
- **Request body:** Tidak ada.
- **Response berhasil — `200 OK`:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Pemrograman Web Dasar",
      "author": "Budi Santoso",
      "status": "available",
      "created_at": null,
      "updated_at": null
    }
  ]
}
```

### 3.4 Detail Buku

- **Method:** `GET`
- **Endpoint:** `/api/books/{id}`
- **Autentikasi:** Tidak diperlukan
- **Fungsi:** Mengembalikan informasi satu buku berdasarkan ID buku.
- **Contoh URL:** `http://localhost:8000/api/books/1`
- **Request body:** Tidak ada.
- **Response berhasil — `200 OK`:**

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

### 3.5 Membuat Peminjaman Buku

- **Method:** `POST`
- **Endpoint:** `/api/loans`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Membuat transaksi peminjaman buku untuk pengguna.
- **Headers:**

```http
Authorization: Bearer <TOKEN>
Content-Type: application/json
Accept: application/json
```

- **Request body:**

```json
{
  "userId": 2,
  "bookId": 1
}
```

- **Response berhasil — `201 Created`:**

```json
{
  "status": "success",
  "message": "Buku berhasil dipinjam.",
  "data": {
    "user_id": 2,
    "book_id": 1,
    "borrow_date": "2026-10-18T00:00:00.000000Z",
    "due_date": "2026-10-25T00:00:00.000000Z",
    "status": "active",
    "updated_at": "2026-10-18T02:56:50.000000Z",
    "created_at": "2026-10-18T02:56:50.000000Z",
    "id": 1
  }
}
```

- **Validasi:** `userId` dan `bookId` wajib diisi. Request tanpa kedua data wajib tersebut menghasilkan `400 Bad Request` dengan pesan `userId dan bookId wajib diisi.`

### 3.6 Riwayat Peminjaman Pengguna

- **Method:** `GET`
- **Endpoint:** `/api/loans/user/{userId}`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Mengembalikan daftar transaksi peminjaman berdasarkan ID pengguna.
- **Contoh URL:** `http://localhost:8000/api/loans/user/2`
- **Request body:** Tidak ada.
- **Response berhasil — `200 OK`:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "user_id": "2",
      "book_id": 1,
      "borrow_date": "2026-10-18T00:00:00.000000Z",
      "due_date": "2026-10-25T00:00:00.000000Z",
      "status": "active",
      "created_at": "2026-10-18T02:56:50.000000Z",
      "updated_at": "2026-10-18T02:56:50.000000Z"
    }
  ]
}
```

### 3.7 Pengembalian Buku

- **Method:** `POST`
- **Endpoint:** `/api/loans/{id}/return`
- **Autentikasi:** Bearer Token diperlukan
- **Fungsi:** Memproses pengembalian buku berdasarkan ID transaksi peminjaman.
- **Contoh URL:** `http://localhost:8000/api/loans/1/return`
- **Request body:** Tidak ada.
- **Response berhasil — `200 OK`:**

```json
{
  "status": "success",
  "message": "Buku berhasil dikembalikan.",
  "data": {
    "id": 1,
    "user_id": "2",
    "book_id": 1,
    "borrow_date": "2026-10-18T00:00:00.000000Z",
    "due_date": "2026-10-25T00:00:00.000000Z",
    "status": "returned",
    "created_at": "2026-10-18T02:56:50.000000Z",
    "updated_at": "2026-10-18T03:48:08.000000Z"
  }
}
```

## 4. Status Code

| Status code | Arti dalam API |
|---|---|
| `200 OK` | Request berhasil diproses, seperti login, pengambilan data, dan pengembalian buku. |
| `201 Created` | Transaksi peminjaman berhasil dibuat. |
| `400 Bad Request` | Request tidak memenuhi validasi, misalnya ID pengguna dan ID buku tidak dikirim saat membuat peminjaman. |
| `401 Unauthorized` | Autentikasi tidak berhasil atau token tidak diterima. |
| `404 Not Found` | Endpoint atau resource tidak ditemukan. |

## 5. Aturan Bisnis Peminjaman

1. Setiap pengguna dapat memiliki maksimal tiga peminjaman aktif.
2. Buku hanya dapat dipinjam jika statusnya `available`.
3. Tanggal jatuh tempo ditetapkan tujuh hari setelah tanggal peminjaman.
4. Setelah pengembalian berhasil, status transaksi berubah menjadi `returned` dan buku tersedia kembali.

## 6. Skenario Pengujian API

| ID | Skenario | Hasil |
|---|---|---|
| T-01 | Login dengan kredensial valid | Berhasil, `200 OK` |
| T-02 | Mengambil informasi pengguna dengan token valid | Berhasil, `200 OK` |
| T-03 | Mengambil daftar buku | Berhasil, `200 OK` |
| T-04 | Mengambil detail buku berdasarkan ID | Berhasil |
| T-05 | Meminjam buku dengan data yang valid | Berhasil, `201 Created` |
| T-06 | Membuat peminjaman tanpa ID wajib | Ditolak, `400 Bad Request` |
| T-07 | Mengambil riwayat peminjaman pengguna | Berhasil, `200 OK` |
| T-08 | Mengembalikan buku | Berhasil, `200 OK`; status transaksi menjadi `returned` |
