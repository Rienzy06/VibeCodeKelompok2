# Dokumentasi A

## Penggunaan AI Coding Tool

## 1. Pendahuluan

Dokumentasi ini menjelaskan penggunaan AI Coding Tool dalam pengembangan Sistem Peminjaman Buku menjadi arsitektur microservice.

AI digunakan sebagai alat bantu dalam proses analisis, perancangan, implementasi, dan debugging. Setiap hasil yang diberikan AI diperiksa melalui human review, kemudian diuji sebelum diterapkan ke dalam project.

---

## 2. AI Coding Tool yang Digunakan

AI Coding Tool yang digunakan dalam proses pengembangan adalah:

- Gemini
- ChatGPT

AI digunakan sebagai alat bantu untuk:

- analisis kebutuhan teknis;
- perancangan arsitektur microservice;
- perancangan struktur service;
- perancangan API;
- implementasi kode;
- analisis error;
- debugging;
- perbaikan kode.

AI tidak digunakan sebagai pengganti keputusan teknis. Setiap hasil AI tetap diperiksa dan divalidasi oleh anggota kelompok.

---

# 3. Tahapan Penggunaan AI

Penggunaan AI dilakukan secara bertahap agar setiap hasil dapat diperiksa sebelum dilanjutkan ke tahap berikutnya.

Alur penggunaan AI:

Requirement
↓
Prompt AI
↓
Hasil AI
↓
Human Review
↓
Keputusan Teknis
↓
Implementasi
↓
Testing
↓
Debugging
↓
Regression Testing

Tahapan tersebut diterapkan pada analisis awal, Book Service, Loan Service, Frontend & Integration, serta proses debugging.

---

# 4. Analisis Awal Arsitektur

## 4.1 Tujuan

Tahap pertama dilakukan untuk menganalisis perubahan arsitektur dari sistem sebelumnya yang masih menggunakan HTML, CSS, JavaScript, dan localStorage menjadi sistem berbasis microservice.

## 4.2 Prompt

### Prompt 1

Saya sedang mengembangkan tugas praktikum Sistem Peminjaman Buku.

Sistem sebelumnya merupakan aplikasi client-side sederhana yang menggunakan HTML, CSS, JavaScript, dan localStorage. Sekarang sistem tersebut akan dikembangkan menjadi sistem berbasis microservice.

Pada tahap awal ini, saya ingin kamu hanya membantu melakukan ANALISIS AWAL arsitektur sistem. Jangan langsung membuat kode dan jangan membuat dokumentasi final. Hasil analisis nantinya akan saya review dan tentukan sendiri sebelum masuk ke tahap implementasi.

## REQUIREMENT SISTEM YANG HARUS DIPERTAHANKAN

Sistem harus tetap memiliki 8 requirement berikut:

1. Mahasiswa harus login menggunakan simulasi auth/user ID.
2. Mahasiswa dapat melihat daftar buku.
3. Mahasiswa dapat melihat ketersediaan buku.
4. Mahasiswa dapat meminjam buku yang tersedia.
5. Maksimal 3 buku aktif dapat dipinjam oleh setiap mahasiswa.
6. Buku yang sedang dipinjam oleh seorang mahasiswa tidak dapat dipinjam oleh mahasiswa lain.
7. Masa peminjaman adalah 7 hari.
8. Sistem menampilkan informasi peminjaman.

## KONDISI SISTEM SAAT INI

Teknologi dan arsitektur sistem sebelumnya:

- HTML
- CSS
- JavaScript
- localStorage
- Seluruh data dan proses masih berada di sisi client-side.
- Belum menggunakan backend atau microservice.

Sistem akan dikembangkan menjadi minimal 2 microservice.

## TUJUAN ANALISIS

Lakukan analisis awal untuk menentukan kemungkinan pembagian service yang paling sesuai dengan requirement di atas.

Fokus utama analisis adalah:

1. Kemungkinan pembagian sistem menjadi minimal 2 microservice.
2. Tanggung jawab masing-masing service.
3. Data apa saja yang dikelola oleh masing-masing service.
4. Batas tanggung jawab (service boundary) setiap service.
5. Komponen utama yang dibutuhkan.
6. Bagaimana komunikasi antara Frontend dengan masing-masing service.
7. Bagaimana komunikasi antar-service ketika proses peminjaman buku terjadi.
8. Endpoint API yang kemungkinan dibutuhkan.
9. Storage atau penyimpanan data yang kemungkinan digunakan oleh setiap service.
10. Diagram arsitektur sistem sebelum dan sesudah menggunakan microservice.
11. Alur proses peminjaman buku dari awal sampai selesai.
12. Potensi masalah atau konflik data yang mungkin terjadi ketika satu buku dipinjam oleh mahasiswa.

## HAL YANG HARUS DIANALISIS

Berikan beberapa alternatif pembagian service jika memang diperlukan, kemudian jelaskan kelebihan, kekurangan, dan kesesuaiannya terhadap requirement.

Namun, jangan menentukan keputusan final jika masih terdapat bagian yang membutuhkan keputusan dari saya.

Jika terdapat keputusan yang belum dapat ditentukan berdasarkan informasi yang diberikan, tandai dengan jelas menggunakan:

"PERLU DIPUTUSKAN"

Contohnya:
- PERLU DIPUTUSKAN: jenis database yang akan digunakan.
- PERLU DIPUTUSKAN: apakah setiap service menggunakan database terpisah.
- PERLU DIPUTUSKAN: mekanisme komunikasi antar-service.

## FORMAT HASIL ANALISIS

Susun hasil analisis dengan struktur berikut:

### 1. Ringkasan Sistem Saat Ini
Jelaskan secara singkat bagaimana sistem bekerja sebelum menggunakan microservice.

### 2. Analisis Requirement
Petakan 8 requirement ke kebutuhan service yang relevan.

### 3. Kandidat Pembagian Microservice
Berikan minimal 2 alternatif pembagian service.

Untuk setiap alternatif jelaskan:
- Nama service
- Tanggung jawab
- Data yang dikelola
- Requirement yang ditangani
- Kelebihan
- Kekurangan

### 4. Analisis Service Boundary
Jelaskan batas tanggung jawab masing-masing service dan alasan pemisahannya.

### 5. Komunikasi Sistem
Jelaskan:
- Frontend berkomunikasi dengan service apa.
- Service mana yang berkomunikasi dengan service lain.
- Informasi apa yang dikirimkan.
- Kapan komunikasi terjadi.

### 6. Kandidat Endpoint API
Buat tabel yang berisi:
- Method
- Endpoint
- Service
- Fungsi
- Request
- Response secara singkat

Jangan membuat implementasi kode.

### 7. Storage
Analisis kebutuhan penyimpanan data setiap service.

Jelaskan apakah data sebaiknya:
- berada pada satu storage,
- atau setiap service memiliki storage sendiri.

Jika belum dapat diputuskan, tandai "PERLU DIPUTUSKAN".

### 8. Diagram Arsitektur
Buat diagram sederhana menggunakan teks/ASCII yang menunjukkan:

Frontend
↓
Microservice
↓
Storage

serta hubungan antar-service jika ada.

Buat dua diagram:
- Arsitektur sistem sebelum microservice.
- Arsitektur sistem setelah microservice.

### 9. Alur Peminjaman Buku
Jelaskan langkah demi langkah proses ketika mahasiswa meminjam buku, mulai dari:
login → melihat buku → mengecek ketersediaan → melakukan peminjaman → validasi maksimal 3 buku → pencatatan peminjaman → menampilkan informasi peminjaman.

Jelaskan juga komunikasi antar-service yang terjadi pada proses tersebut.

### 10. Potensi Masalah
Identifikasi kemungkinan masalah dalam arsitektur microservice, terutama:
- dua mahasiswa mencoba meminjam buku yang sama,
- batas maksimal 3 buku,
- konsistensi data,
- kegagalan komunikasi antar-service.

Berikan analisis solusi secara konseptual, tanpa membuat kode.

### 11. Hal yang Masih Perlu Diputuskan
Buat daftar keputusan yang belum dapat ditentukan dari requirement yang diberikan.

### 12. Rekomendasi Arsitektur untuk Ditinjau
Berikan satu rancangan arsitektur yang paling sesuai berdasarkan requirement, tetapi jangan menyebutnya sebagai keputusan final.

Jelaskan alasan teknisnya secara objektif agar saya dapat melakukan review dan menentukan apakah rancangan tersebut akan digunakan.

## BATASAN

Jangan:
- Menambahkan fitur di luar 8 requirement.
- Membuat authentication service terpisah.
- Membuat fitur admin.
- Membuat fitur pengembalian buku.
- Membuat fitur history/riwayat terpisah.
- Membuat fitur pencarian.
- Membuat fitur filter.
- Membuat dashboard.
- Membuat notifikasi.
- Membuat pembayaran.
- Membuat fitur tambahan lainnya.

Jangan membuat kode implementasi.

Jangan menentukan teknologi yang terlalu kompleks.

Jangan mengubah requirement yang sudah diberikan.

Jika terdapat keputusan teknis yang belum memiliki informasi cukup, tandai sebagai "PERLU DIPUTUSKAN" dan jelaskan pilihan yang tersedia.

## TUJUAN AKHIR

Tujuan dari prompt ini hanya untuk mendapatkan ANALISIS AWAL arsitektur microservice.

Saya sendiri yang akan mereview hasil analisis tersebut dan menentukan keputusan final sebelum sistem mulai diimplementasikan.

## 4.3 Ringkasan Hasil AI

AI memberikan analisis mengenai pembagian tanggung jawab service, komunikasi antar-service, kebutuhan API, storage, arsitektur sebelum dan sesudah, serta alur peminjaman.

Hasil analisis kemudian digunakan sebagai bahan untuk menentukan rancangan Book Service dan Loan Service.

## 4.4 Human Review

Hasil AI diperiksa berdasarkan requirement dari project sebelumnya.

Keputusan teknis yang ditetapkan:

- Frontend tetap menjadi client.
- Book Service bertanggung jawab terhadap katalog dan status buku.
- Loan Service bertanggung jawab terhadap transaksi peminjaman.
- Book Service menggunakan port 3001.
- Loan Service menggunakan port 3002.
- Komunikasi antar-service menggunakan REST API.
- Data disimpan menggunakan file JSON.
- Tidak dibuat Authentication Service terpisah.
- Tidak menambahkan fitur di luar scope project.

---

# 5. Book Service

## 5.1 Prompt Analisis

### Prompt 1
Saya sudah melakukan review terhadap analisis awal yang kamu berikan sebelumnya. Saya ingin mempersempit dan memperjelas rancangan sistem agar sesuai dengan kebutuhan tugas dan tidak terlalu kompleks.

Gunakan 8 requirement sebelumnya sebagai requirement final yang tidak boleh diubah.

Keputusan rancangan yang sudah kami tetapkan:
1.	Sistem terdiri dari Frontend, Book Service, dan Loan Service.
2.	Book Service menggunakan Port 3001.
3.	Loan Service menggunakan Port 3002.
4.	Book Service mengelola master data buku: id, title, author, dan status available/borrowed.
5.	Loan Service mengelola transaksi peminjaman, validasi maksimal 3 buku aktif berdasarkan userId, borrowDate, dueDate +7 hari, data peminjaman aktif, dan komunikasi dengan Book Service.
6.	Storage menggunakan file JSON lokal: data/books.json dan data/loans.json.
7.	Tidak menggunakan in-memory murni, SQLite, SQL, atau database terpisah.
8.	Tidak membuat Authentication Service terpisah.
9.	Tidak ada history/riwayat terpisah; hanya data peminjaman aktif.
10.	Frontend tidak boleh mengakses file JSON secara langsung.
11.	Perubahan status buku dilakukan Book Service berdasarkan request Loan Service.

API:
BOOK SERVICE:
-	GET /api/books
-	GET /api/books/:id
-	PATCH /api/books/:id/status

LOAN SERVICE:
-	POST /api/loans
-	GET /api/loans/user/:userId

Alur:
Frontend → POST /api/loans → Loan Service mengecek jumlah aktif jika >=3 return 400 MAX_LIMIT_REACHED
→ jika belum, cek buku melalui GET /api/books/:bookId → jika tidak tersedia return 400 BOOK_NOT_AVAILABLE → jika valid, buat transaksi minta Book Service mengubah status menjadi borrowed → jika berhasil return 201 Created.

Revisi analisis sebelumnya berdasarkan keputusan tersebut. Hasilkan arsitektur sebelum/sesudah, pembagian tanggung jawab, storage, endpoint, alur komunikasi, diagram alur, dan pemetaan ke 8 requirement. Jangan membuat kode implementasi dan jangan menambahkan fitur baru.

## 5.2 Ringkasan Hasil AI

AI mengusulkan Book Service sebagai service yang bertanggung jawab terhadap katalog buku dan status ketersediaan buku.

Struktur service yang diusulkan terdiri dari:

- data/books.json
- app.js
- server.js
- bookRoutes.js
- bookController.js
- package.json

AI juga menganalisis endpoint, validasi, penyimpanan JSON, serta komunikasi dengan Loan Service.

## 5.3 Human Review

Hasil AI diperiksa dan disesuaikan dengan rancangan sistem.

Keputusan yang ditetapkan:

- Port: 3001.
- Storage: `data/books.json`.
- ID buku menggunakan String seperti `b1`, `b2`, dan `b3`.
- Status buku hanya `available` dan `borrowed`.
- Endpoint hanya:
  - `GET /api/books`
  - `GET /api/books/:id`
  - `PATCH /api/books/:id/status`
- Book Service tidak menangani transaksi peminjaman.
- Book Service tidak menggunakan database.

## 5.4 Prompt Implementasi

### Prompt 2
Saya sudah melakukan review terhadap rancangan sebelumnya dan sekarang ingin memfinalisasi dokumentasi TAHAP 1 - ANALISIS DAN PERANCANGAN SISTEM. Gunakan seluruh keputusan yang telah kami tetapkan sebagai source of truth. Jangan mengubah atau menambahkan keputusan baru.

Requirement tetap:
1.	Mahasiswa harus login (simulasi auth user ID).
2.	Mahasiswa dapat melihat daftar buku.
3.	Mahasiswa dapat melihat ketersediaan buku.
4.	Mahasiswa dapat meminjam buku yang tersedia.
5.	Maksimal 3 buku aktif per mahasiswa.
6.	Buku yang sedang dipinjam tidak dapat dipinjam mahasiswa lain.
7.	Masa peminjaman adalah 7 hari.
8.	Sistem menampilkan informasi peminjaman.
Sistem lama: HTML, CSS, JavaScript, localStorage. Sistem baru:
-	Frontend
-	Book Service, Port 3001
-	Loan Service, Port 3002

Book Service:
-	master data id, title, author
-	status available/borrowed
-	data/books.json
-	GET /api/books
-	GET /api/books/:id
-	PATCH /api/books/:id/status

Loan Service:
-	transaksi peminjaman
-	validasi maksimal 3 buku aktif berdasarkan userId
-	borrowDate, dueDate +7 hari kalender
-	data peminjaman aktif
-	data/loans.json
-	POST /api/loans
-	GET /api/loans/user/:userId
-	komunikasi dengan Book Service

Frontend tidak mengakses JSON langsung. Loan Service menggunakan REST/Internal API ke Book Service untuk mengecek ketersediaan dan memperbarui status buku.

Jika PATCH ke Book Service gagal setelah transaksi loan dibuat, gunakan Compensating Action/Rollback: Loan Service menghapus transaksi loan baru berdasarkan loanId dan mengembalikan
SYNC_FAILED_ROLLBACK.

Dokumen final harus mencakup:
1.	Requirements
2.	Arsitektur sebelum
3.	Arsitektur setelah
4.	Pembagian microservice
5.	Book Service
6.	Loan Service
7.	API Design/Endpoints
8.	API Request dan Response
9.	Alur Kerja Peminjaman
10.	Alur Komunikasi Internal Antar-Service
11.	Error Handling/Partial Failure Strategy
12.	Prinsip Komunikasi dan Pembagian Tanggung Jawab

Gunakan bahasa Indonesia formal untuk laporan praktikum. Pertahankan endpoint, port, storage, status, HTTP response, JSON response, dan alur. Jangan mengubah requirement, jangan menambahkan fitur, jangan membuat Authentication Service, dan jangan membuat kode implementasi.

## 5.5 Ringkasan Hasil Implementasi

AI menghasilkan implementasi Book Service menggunakan Node.js dan Express.js.

Service menyediakan endpoint:

GET   /api/books
GET   /api/books/:id
PATCH /api/books/:id/status

Data buku disimpan dalam data/books.json.

5.6 Human Review dan Testing

Kode hasil AI diperiksa dan dijalankan secara manual.

Pengujian yang dilakukan:

Pengujian	Hasil
GET daftar buku	PASS
GET detail buku	PASS
PATCH status buku	PASS
6. Loan Service
6.1 Prompt Analisis
Prompt 1

[TEMPEL PROMPT LOAN SERVICE YANG SUDAH KAMU PUNYA]

6.2 Ringkasan Hasil AI

AI menganalisis Loan Service sebagai service yang bertanggung jawab terhadap transaksi peminjaman.

Tanggung jawab utama:

membuat transaksi peminjaman;
mengecek maksimal 3 buku aktif;
menentukan borrowDate;
menentukan dueDate 7 hari;
menyimpan transaksi;
berkomunikasi dengan Book Service;
melakukan rollback apabila sinkronisasi status buku gagal.
6.3 Human Review

Hasil AI diperiksa dan keputusan teknis ditetapkan:

Port: 3002.
Storage: data/loans.json.
Menggunakan native fetch.
Maksimal 3 buku aktif per user.
Durasi peminjaman 7 hari.
Loan Service melakukan GET ke Book Service untuk mengecek buku.
Loan Service melakukan PATCH ke Book Service untuk mengubah status.
Jika PATCH gagal, transaksi yang baru dibuat dihapus melalui rollback.
6.4 Prompt Implementasi
Prompt 2

prompt 2
Saya melanjutkan pengembangan Loan Service berdasarkan hasil analisis dan Human Review sebelumnya.

Gunakan keputusan berikut sebagai SOURCE OF TRUTH. Jangan mengubah keputusan ini dan jangan menambahkan fitur di luar spesifikasi.

PROJECT:
Sistem Peminjaman Buku berbasis microservice.

ARSITEKTUR:
- Frontend
- Book Service
- Loan Service

BOOK SERVICE:
- Port: 3001
- Base URL: http://localhost:3001

LOAN SERVICE:
- Port: 3002
- Base URL: http://localhost:3002

TECHNOLOGY:
- Node.js
- Express.js
- REST API
- JSON file storage
- Native fetch untuk komunikasi HTTP dengan Book Service
- Tidak menggunakan axios atau node-fetch.

STORAGE:
data/loans.json

TANGGUNG JAWAB LOAN SERVICE:
1. Membuat transaksi peminjaman.
2. Mengecek maksimal 3 buku aktif per user.
3. Mengecek ketersediaan buku melalui Book Service.
4. Menentukan borrowDate.
5. Menentukan dueDate 7 hari setelah borrowDate.
6. Menyimpan transaksi dengan status "active".
7. Mengambil informasi peminjaman berdasarkan userId.
8. Mengubah status buku melalui Book Service setelah transaksi berhasil dibuat.
9. Melakukan rollback jika sinkronisasi status buku gagal.

ENDPOINT LOAN SERVICE:

1. POST /api/loans

Request:
{
  "userId": "student1",
  "bookId": "b1"
}

Alur:
1. Validasi userId dan bookId.
2. Baca data loans.json.
3. Hitung jumlah loan aktif milik userId.
4. Jika jumlah >= 3, tolak dengan HTTP 400.
5. Panggil:
   GET http://localhost:3001/api/books/:bookId
6. Jika buku tidak ditemukan, return HTTP 404.
7. Jika status buku bukan "available", return HTTP 400.
8. Jika tersedia, buat borrowDate.
9. Buat dueDate tepat 7 hari setelah borrowDate.
10. Buat ID transaksi berupa String dengan format:
    loan-{timestamp}
11. Simpan transaksi dengan status "active".
12. Panggil:
    PATCH http://localhost:3001/api/books/:bookId/status

    Body:
    {
      "status": "borrowed"
    }

13. Jika PATCH berhasil, return HTTP 201.
14. Jika PATCH gagal, hapus transaksi yang baru dibuat dari loans.json sebagai compensating action/rollback.
15. Setelah rollback, return error kepada client.

2. GET /api/loans/user/:userId

- Baca loans.json.
- Filter berdasarkan userId.
- Return HTTP 200.
- Jika tidak ada data, return [].

FORMAT DATA LOAN:

{
  "loanId": "loan-1710000000000",
  "userId": "student1",
  "bookId": "b1",
  "borrowDate": "2026-09-19T00:00:00.000Z",
  "dueDate": "2026-09-26T00:00:00.000Z",
  "status": "active"
}

Gunakan ID transaksi sebagai String.

FORMAT RESPONSE:

SUCCESS POST:
{
  "status": "success",
  "message": "Buku berhasil dipinjam.",
  "data": {
    "loanId": "...",
    "userId": "...",
    "bookId": "...",
    "borrowDate": "...",
    "dueDate": "...",
    "status": "active"
  }
}

ERROR MAXIMUM:
{
  "status": "error",
  "code": "MAX_LIMIT_REACHED",
  "message": "Gagal: Anda sudah mencapai batas maksimal peminjaman (3 buku)."
}

ERROR BOOK NOT AVAILABLE:
{
  "status": "error",
  "code": "BOOK_NOT_AVAILABLE",
  "message": "Gagal: Buku sedang dipinjam atau tidak tersedia."
}

ERROR NOT FOUND:
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Data buku tidak ditemukan."
}

ERROR ROLLBACK:
{
  "status": "error",
  "code": "SYNC_FAILED_ROLLBACK",
  "message": "Gagal sinkronisasi status buku. Transaksi peminjaman dibatalkan (rollback)."
}

STRUKTUR FOLDER:

loan-service/
├── data/
│   └── loans.json
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── loanController.js
│   ├── services/
│   │   ├── loanService.js
│   │   └── bookService.js
│   ├── utils/
│   │   └── fileHandler.js
│   └── app.js
├── package.json
└── index.js

Gunakan struktur tersebut jika memang diperlukan. Jangan menambahkan layer atau folder lain tanpa alasan teknis yang jelas.

BATASAN:
- Jangan menggunakan database.
- Jangan menggunakan SQLite.
- Jangan menggunakan MongoDB.
- Jangan membuat Authentication Service.
- Jangan membuat JWT.
- Jangan membuat admin.
- Jangan membuat fitur return book.
- Jangan membuat dashboard.
- Jangan membuat search/filter.
- Jangan membuat notification.
- Jangan membuat payment.
- Jangan membuat file-locking atau concurrency mechanism khusus.
- Jangan membuat fitur lain yang tidak disebutkan.

IMPLEMENTASI HARUS:
- menangani error file JSON;
- menangani Book Service tidak dapat diakses;
- menangani response HTTP error dari Book Service;
- melakukan rollback jika transaksi sudah tersimpan tetapi PATCH Book Service gagal;
- memastikan transaksi yang gagal tidak tersisa di loans.json;
- menggunakan async/await;
- menggunakan native fetch;
- menggunakan Express JSON middleware.

Sebelum memberikan hasil akhir, periksa kembali seluruh implementasi terhadap semua keputusan di atas.

Buatkan file yang diperlukan dan jelaskan fungsi setiap file.

Setelah kode selesai, berikan langkah menjalankan Loan Service dan daftar endpoint yang dapat diuji.

Jangan menambahkan fitur di luar source of truth.

6.5 Ringkasan Hasil Implementasi

Loan Service menyediakan:

POST /api/loans
GET  /api/loans/user/:userId

Loan Service menyimpan transaksi pada:

data/loans.json

Alur peminjaman melibatkan komunikasi:

Frontend
   ↓
Loan Service
   ↓
Book Service
6.6 Testing
Pengujian	Hasil
Peminjaman buku tersedia	PASS
Buku tidak tersedia	PASS
Maksimal 3 buku aktif	PASS
Komunikasi dengan Book Service	PASS
Informasi tanggal jatuh tempo	PASS
7. Frontend & Integration
7.1 Prompt Analisis
Prompt 1

hasil AI 2
Berikut adalah implementasi lengkap untuk bagian **Frontend & Integration** sesuai dengan spesifikasi dan *Source of Truth* yang ditentukan.

---

### 1. `frontend/index.html`

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Peminjaman Buku</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>Sistem Peminjaman Buku</h1>
    </header>

    <main class="container">
        <!-- Area Notifikasi / Pesan Status -->
        <div id="message-container" class="message-box hidden"></div>

        <!-- Section Pengguna -->
        <section class="user-section card-box">
            <h2>Identitas Pengguna</h2>
            <div class="form-group">
                <label for="user-id">User ID:</label>
                <input type="text" id="user-id" placeholder="Masukkan User ID (contoh: student1)">
                <button type="button" id="btn-load-loans">Muat Riwayat Peminjaman</button>
            </div>
        </section>

        <!-- Section Katalog Buku -->
        <section class="books-section">
            <h2>Daftar Buku</h2>
            <div id="books-list" class="books-grid">
                <p class="loading-text">Memuat daftar buku...</p>
            </div>
        </section>

        <!-- Section Riwayat Peminjaman -->
        <section class="loans-section">
            <h2>Riwayat Peminjaman Pengguna</h2>
            <div id="loans-list" class="loans-container">
                <p class="info-text">Masukkan User ID dan klik "Muat Riwayat Peminjaman" untuk melihat data.</p>
            </div>
        </section>
    </main>

    <script src="js/api.js"></script>
    <script src="js/app.js"></script>
</body>
</html>

```

---

### 2. `frontend/css/style.css`

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f4f6f9;
    color: #333;
    line-height: 1.6;
    padding-bottom: 40px;
}

header {
    background-color: #2c3e50;
    color: #ffffff;
    text-align: center;
    padding: 20px 10px;
    margin-bottom: 25px;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 15px;
}

.card-box {
    background: #ffffff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 25px;
}

/* Form Styles */
.user-section h2, .books-section h2, .loans-section h2 {
    margin-bottom: 15px;
    color: #2c3e50;
    font-size: 1.3rem;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 8px;
}

.form-group {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}

.form-group label {
    font-weight: bold;
}

.form-group input {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.95rem;
}

button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 9px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background 0.2s;
}

button:hover {
    background-color: #2980b9;
}

button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

/* Notification Box */
.message-box {
    padding: 12px 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    font-weight: bold;
}

.message-box.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.message-box.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.hidden {
    display: none;
}

/* Books Grid */
.books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.book-card {
    background: #ffffff;
    border: 1px solid #e1e8ed;
    border-radius: 6px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.book-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
}

.book-author {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-bottom: 15px;
}

.book-status {
    display: inline-block;
    padding: 3px 8px;
    font-size: 0.8rem;
    border-radius: 3px;
    font-weight: bold;
    margin-bottom: 15px;
    width: fit-content;
}

.status-available {
    background-color: #2ecc71;
    color: #fff;
}

.status-borrowed {
    background-color: #e74c3c;
    color: #fff;
}

.btn-borrow {
    background-color: #27ae60;
    width: 100%;
}

.btn-borrow:hover {
    background-color: #219150;
}

/* Loans Table / List */
.loans-container {
    background: #ffffff;
    border-radius: 6px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.loan-table {
    width: 100%;
    border-collapse: collapse;
}

.loan-table th, .loan-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    font-size: 0.9rem;
}

.loan-table th {
    background-color: #f2f2f2;
}

.loading-text, .info-text, .empty-text {
    color: #666;
    font-style: italic;
}

```

---

### 3. `frontend/js/api.js`

```javascript
const BOOK_SERVICE_URL = 'http://localhost:3001';
const LOAN_SERVICE_URL = 'http://localhost:3002';

/**
 * Mengambil daftar seluruh buku dari Book Service.
 */
async function getBooks() {
    try {
        const response = await fetch(`${BOOK_SERVICE_URL}/api/books`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Gagal mengambil data buku (Status: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error("Gagal terhubung ke layanan. Pastikan Book Service dan Loan Service sedang berjalan.");
        }
        throw error;
    }
}

/**
 * Mengirimkan permintaan peminjaman buku ke Loan Service.
 * @param {string} userId 
 * @param {string} bookId 
 */
async function createLoan(userId, bookId) {
    try {
        const response = await fetch(`${LOAN_SERVICE_URL}/api/loans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, bookId })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            // Pemetaan pesan error ramah pengguna jika backend mengirimkan kode error terstruktur
            if (data.code === 'MAX_LIMIT_REACHED') {
                throw new Error("Anda sudah mencapai batas maksimal peminjaman (3 buku).");
            }
            if (data.code === 'BOOK_NOT_AVAILABLE') {
                throw new Error("Buku ini tidak tersedia untuk dipinjam.");
            }
            
            throw new Error(data.message || "Gagal melakukan peminjaman buku.");
        }

        return data;
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error("Gagal terhubung ke layanan. Pastikan Book Service dan Loan Service sedang berjalan.");
        }
        throw error;
    }
}

/**
 * Mengambil riwayat peminjaman milik pengguna berdasarkan userId dari Loan Service.
 * @param {string} userId 
 */
async function getUserLoans(userId) {
    try {
        const response = await fetch(`${LOAN_SERVICE_URL}/api/loans/user/${encodeURIComponent(userId)}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Gagal mengambil riwayat peminjaman (Status: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error("Gagal terhubung ke layanan. Pastikan Book Service dan Loan Service sedang berjalan.");
        }
        throw error;
    }
}

```

---

### 4. `frontend/js/app.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userIdInput = document.getElementById('user-id');
    const btnLoadLoans = document.getElementById('btn-load-loans');
    const booksListContainer = document.getElementById('books-list');
    const loansListContainer = document.getElementById('loans-list');
    const messageContainer = document.getElementById('message-container');

    // Initial Load
    loadBooks();

    // Event Listeners
    btnLoadLoans.addEventListener('click', handleLoadUserLoans);

    /**
     * Memuat daftar buku dari API dan merender ke UI.
     */
    async function loadBooks() {
        try {
            const books = await getBooks();
            renderBooks(books);
        } catch (error) {
            showMessage(error.message, 'error');
            booksListContainer.innerHTML = `<p class="empty-text">Tidak dapat memuat daftar buku.</p>`;
        }
    }

    /**
     * Merender array buku ke dalam kontainer grid.
     * @param {Array} books 
     */
    function renderBooks(books) {
        booksListContainer.innerHTML = '';

        if (!books || books.length === 0) {
            booksListContainer.innerHTML = '<p class="empty-text">Tidak ada buku yang tersedia.</p>';
            return;
        }

        books.forEach(book => {
            const isAvailable = book.status === 'available';
            
            const card = document.createElement('div');
            card.className = 'book-card';

            const statusClass = isAvailable ? 'status-available' : 'status-borrowed';
            const statusText = isAvailable ? 'Tersedia' : 'Dipinjam';

            card.innerHTML = `
                <div>
                    <div class="book-title">${escapeHtml(book.title)}</div>
                    <div class="book-author">Penulis: ${escapeHtml(book.author)}</div>
                    <span class="book-status ${statusClass}">${statusText}</span>
                </div>
            `;

            // Hanya tampilkan tombol "Pinjam" jika buku statusnya available
            if (isAvailable) {
                const borrowBtn = document.createElement('button');
                borrowBtn.type = 'button';
                borrowBtn.className = 'btn-borrow';
                borrowBtn.textContent = 'Pinjam';
                borrowBtn.addEventListener('click', () => handleBorrowBook(book.id, borrowBtn));
                card.appendChild(borrowBtn);
            }

            booksListContainer.appendChild(card);
        });
    }

    /**
     * Menangani aksi peminjaman buku saat tombol "Pinjam" diklik.
     * @param {string} bookId 
     * @param {HTMLButtonElement} buttonElement 
     */
    async function handleBorrowBook(bookId, buttonElement) {
        hideMessage();
        const userId = userIdInput.value.trim();

        if (!userId) {
            showMessage('Silakan masukkan User ID terlebih dahulu.', 'error');
            userIdInput.focus();
            return;
        }

        // Pencegahan Double Submit: Nonaktifkan tombol saat request berjalan
        buttonElement.disabled = true;
        buttonElement.textContent = 'Memproses...';

        try {
            await createLoan(userId, bookId);
            showMessage('Buku berhasil dipinjam.', 'success');

            // Synchronize UI State
            await loadBooks();
            await loadUserLoans(userId);
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            // Mengaktifkan kembali tombol jika masih terpasang di DOM
            if (buttonElement && buttonElement.isConnected) {
                buttonElement.disabled = false;
                buttonElement.textContent = 'Pinjam';
            }
        }
    }

    /**
     * Handler untuk tombol "Muat Riwayat Peminjaman".
     */
    async function handleLoadUserLoans() {
        hideMessage();
        const userId = userIdInput.value.trim();

        if (!userId) {
            showMessage('Silakan masukkan User ID terlebih dahulu.', 'error');
            userIdInput.focus();
            return;
        }

        await loadUserLoans(userId);
    }

    /**
     * Memuat dan merender riwayat peminjaman pengguna.
     * @param {string} userId 
     */
    async function loadUserLoans(userId) {
        loansListContainer.innerHTML = '<p class="loading-text">Memuat riwayat peminjaman...</p>';

        try {
            const loans = await getUserLoans(userId);
            renderLoans(loans);
        } catch (error) {
            showMessage(error.message, 'error');
            loansListContainer.innerHTML = `<p class="empty-text">Gagal memuat riwayat peminjaman.</p>`;
        }
    }

    /**
     * Merender daftar riwayat peminjaman ke dalam tabel.
     * @param {Array} loans 
     */
    function renderLoans(loans) {
        loansListContainer.innerHTML = '';

        if (!loans || loans.length === 0) {
            loansListContainer.innerHTML = '<p class="empty-text">Pengguna ini belum memiliki riwayat peminjaman.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'loan-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Loan ID</th>
                    <th>Book ID</th>
                    <th>Tanggal Pinjam</th>
                    <th>Tenggat Pengembalian</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${loans.map(loan => `
                    <tr>
                        <td>${escapeHtml(loan.loanId || '-')}</td>
                        <td>${escapeHtml(loan.bookId || '-')}</td>
                        <td>${escapeHtml(loan.borrowDate || '-')}</td>
                        <td>${escapeHtml(loan.dueDate || '-')}</td>
                        <td>${escapeHtml(loan.status || '-')}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        loansListContainer.appendChild(table);
    }

    /**
     * Menampilkan pesan notifikasi ke layar.
     * @param {string} msg 
     * @param {'success' | 'error'} type 
     */
    function showMessage(msg, type) {
        messageContainer.textContent = msg;
        messageContainer.className = `message-box ${type}`;
    }

    /**
     * Menyembunyikan pesan notifikasi.
     */
    function hideMessage() {
        messageContainer.textContent = '';
        messageContainer.className = 'message-box hidden';
    }

    /**
     * Helper untuk mencegah XSS sederhana pada output teks.
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return str;
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});

```

---

### Penjelasan File & Cara Menjalankan

#### 1. Penjelasan File

* **`index.html`**: Menyediakan tata letak sederhana yang terdiri dari form User ID, area notifikasi, grid katalog buku, dan kontainer riwayat peminjaman.
* **`css/style.css`**: Mengatur tata letak visual, warna status (*green* untuk `available`, *red* untuk `borrowed`), pesan balasan, serta tombol dinamis secara responsif tanpa library eksternal.
* **`js/api.js`**: Tempat terisolasi untuk menangani panggilan REST API menggunakan `fetch` & `async/await` ke Book Service (`http://localhost:3001`) dan Loan Service (`http://localhost:3002`). File ini juga menangani pencetakan pesan kesalahan jika koneksi gagal atau dibatalkan oleh backend.
* **`js/app.js`**: Mengelola seluruh interaksi pengguna, event listener, validasi User ID di sisi client, penanganan pencegahan *double-submit* pada tombol, serta re-render tampilan (*katalog buku* & *riwayat peminjaman*) secara otomatis setiap kali transaksi berhasil.

#### 2. Cara Menjalankan untuk Pengujian

1. **Jalankan Microservice Backend:**
* Pastikan **Book Service** berjalan di `http://localhost:3001`
* Pastikan **Loan Service** berjalan di `http://localhost:3002`


2. **Jalankan Frontend:**
* Anda dapat membuka file `frontend/index.html` secara langsung menggunakan browser web (misalnya Chrome/Firefox), **atau**
* Menggunakan static file server lokal sederhana, seperti extension *Live Server* di VS Code atau command terminal:
```bash
npx serve frontend

```




3. **Langkah Pengujian Sistem:**
* Isikan **User ID** pada kolom yang tersedia (misal: `student1`).
* Klik tombol **"Pinjam"** pada salah satu buku yang berstatus **Tersedia**.
* Perhatikan bahwa tombol akan dinonaktifkan sementara (*disabled*) saat request berjalan.
* Setelah sukses:
* Pesan `"Buku berhasil dipinjam."` akan muncul.
* Status buku yang dipinjam akan diperbarui otomatis menjadi **Dipinjam** dan tombol **Pinjam** disembunyikan.
* Riwayat peminjaman pengguna akan langsung dimuat di bagian bawah.

7.2 Ringkasan Hasil AI

AI menganalisis kebutuhan frontend dan mengusulkan struktur:

frontend/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    └── app.js

Frontend menggunakan HTML5, CSS3, Vanilla JavaScript, Fetch API, dan async/await.

7.3 Human Review

Hasil AI diperiksa dan diputuskan bahwa:

Frontend hanya menjadi client.
Frontend menggunakan REST API.
Frontend tidak mengubah status buku secara langsung.
Proses peminjaman dikirim ke Loan Service.
Tidak menggunakan localStorage sebagai database utama.
Tidak menambahkan fitur di luar scope.
7.4 Prompt Implementasi
Prompt 2

Human Review 2 — Hasil Review Implementasi Frontend

Hasil implementasi dari Prompt 2 telah diperiksa oleh kelompok berdasarkan rancangan yang telah disepakati pada Human Review 1. Implementasi terdiri dari index.html, style.css, api.js, dan app.js, sesuai dengan struktur frontend yang telah ditentukan.

Dari sisi integrasi, api.js telah memisahkan komunikasi REST API dengan Book Service pada port 3001 dan Loan Service pada port 3002. Endpoint yang digunakan juga sesuai dengan rancangan, yaitu GET /api/books, POST /api/loans, dan GET /api/loans/user/:userId.

Pada bagian tampilan, frontend telah menyediakan input userId, daftar buku, status ketersediaan, tombol peminjaman, area notifikasi, serta tampilan riwayat peminjaman. Tombol peminjaman hanya ditampilkan untuk buku dengan status available.

Alur peminjaman juga telah sesuai dengan rancangan. Ketika tombol "Pinjam" ditekan, frontend mengirim userId dan bookId ke Loan Service. Tombol dinonaktifkan selama proses berlangsung untuk mencegah pengiriman request berulang. Setelah peminjaman berhasil, daftar buku dan riwayat peminjaman dimuat kembali agar tampilan mengikuti kondisi terbaru dari service.

Penanganan response error juga telah diterapkan, termasuk MAX_LIMIT_REACHED dan BOOK_NOT_AVAILABLE, serta pesan ketika service tidak dapat diakses.

Catatan hasil review: implementasi secara struktur dan fungsi telah sesuai dengan Source of Truth. Namun, sebelum dinyatakan final, frontend perlu dijalankan dan diuji bersama Book Service dan Loan Service. Khususnya, kelompok perlu memverifikasi apakah komunikasi dari frontend ke kedua service dapat berjalan tanpa kendala CORS. Kelompok tidak melakukan perubahan pada backend hanya berdasarkan asumsi; apabila CORS benar-benar muncul saat pengujian, perbaikan dilakukan berdasarkan error yang ditemukan.

Keputusan kelompok: kode dapat dilanjutkan ke tahap implementasi lokal dan pengujian integrasi. Tidak ditemukan kebutuhan untuk menambahkan fitur di luar scope.

7.5 Ringkasan Hasil Implementasi

Frontend berhasil mengintegrasikan:

Book Service;
Loan Service;
daftar buku;
status buku;
proses peminjaman;
informasi peminjaman;
pesan error dari API.
8. Debugging dan Perbaikan CORS
8.1 Masalah yang Ditemukan

Saat integration testing menggunakan Live Server, frontend mengalami error CORS ketika mengakses Book Service.

Error:

Access to fetch at 'http://localhost:3001/api/books'
from origin 'http://127.0.0.1:5500' has been blocked by CORS policy.
8.2 Prompt Analisis Debugging
Prompt 3
Saya sedang mengembangkan sistem peminjaman buku berbasis microservices.

Saat melakukan integration testing, ditemukan error aktual pada frontend:

Access to fetch at 'http://localhost:3001/api/books' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Console juga menunjukkan:

GET http://localhost:3001/api/books net::ERR_FAILED 200 (OK)

Hasil pengujian langsung menunjukkan:
- http://localhost:3001/api/books dapat diakses langsung melalui browser dan mengembalikan data buku.
- http://localhost:3002/api/loans/user/student1 dapat diakses langsung melalui browser dan mengembalikan data peminjaman.
- Frontend berjalan melalui http://127.0.0.1:5500.
- Masalah terjadi ketika JavaScript frontend menggunakan fetch() untuk mengakses service backend.

Arsitektur:
Frontend
├── Book Service :3001
└── Loan Service :3002

Book Service:
- Node.js
- Express
- REST API
- GET /api/books
- GET /api/books/:id
- PATCH /api/books/:id/status

Loan Service:
- Node.js
- Express
- REST API
- POST /api/loans
- GET /api/loans/user/:userId

Source of truth:
- Frontend menggunakan HTML, CSS, dan Vanilla JavaScript.
- Backend menggunakan Node.js dan Express.
- Book Service dan Loan Service tetap merupakan service terpisah.
- Tidak boleh mengubah endpoint yang sudah ditentukan.
- Tidak boleh menambahkan database, authentication, JWT, atau fitur baru.
- Jangan mengubah business logic peminjaman.
- Frontend tetap menggunakan fetch().
- Perbaikan harus seminimal mungkin dan hanya untuk mengatasi masalah integrasi yang ditemukan.

Tugas:
Analisis penyebab error CORS tersebut dan jelaskan:
1. Mengapa request langsung melalui browser berhasil tetapi fetch dari frontend gagal.
2. Service mana saja yang perlu menangani CORS.
3. Solusi teknis yang paling sesuai untuk arsitektur ini.
4. File apa saja yang kemungkinan perlu diubah.
5. Apakah diperlukan dependency tambahan.
6. Apakah perubahan tersebut berpengaruh terhadap endpoint atau business logic yang sudah ada.
7. Hal-hal yang perlu diuji setelah perbaikan.

Jangan menulis atau mengubah kode terlebih dahulu.
Berikan analisis dan rekomendasi debugging saja.
Jangan menambahkan fitur di luar scope.


8.3 Ringkasan Hasil AI

AI menganalisis bahwa request dari frontend diblokir oleh browser karena frontend dan backend menggunakan origin yang berbeda.

AI merekomendasikan konfigurasi CORS pada service backend.

8.4 Human Review

Hasil analisis diperiksa berdasarkan error aktual.

Keputusan:

CORS diterapkan pada Book Service.
CORS diterapkan pada Loan Service.
Frontend tidak perlu diubah.
Endpoint tidak diubah.
Business logic tidak diubah.
Perubahan dilakukan seminimal mungkin.
8.5 Prompt Implementasi Perbaikan
Prompt 4
prompt 4
Berdasarkan hasil analisis dan Human Review 3, lakukan implementasi perbaikan CORS pada project sistem peminjaman buku.

Error aktual yang ditemukan saat integration testing:

Access to fetch at 'http://localhost:3001/api/books' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Hasil verifikasi:
- GET http://localhost:3001/api/books dapat diakses langsung dan mengembalikan HTTP 200.
- GET http://localhost:3002/api/loans/user/student1 dapat diakses langsung dan mengembalikan data.
- Frontend berjalan pada http://127.0.0.1:5500.
- Masalah hanya terjadi ketika frontend menggunakan fetch() ke backend.

Keputusan Human Review 3:
- Tambahkan dukungan CORS pada Book Service dan Loan Service.
- Gunakan middleware cors untuk Express.
- Frontend tidak perlu diubah.
- Jangan mengubah endpoint.
- Jangan mengubah business logic.
- Jangan mengubah struktur JSON.
- Jangan menambahkan authentication, JWT, database, atau fitur baru.
- Perubahan harus seminimal mungkin.

Tugas:

1. Tambahkan dependency `cors` pada Book Service.
2. Tambahkan dependency `cors` pada Loan Service.
3. Konfigurasikan middleware CORS pada masing-masing Express service.
4. Izinkan origin frontend yang sedang digunakan, yaitu:
   http://127.0.0.1:5500
5. Pastikan konfigurasi tidak menghapus atau mengubah endpoint yang sudah ada.
6. Jangan mengubah kode `frontend/js/api.js` atau `frontend/js/app.js`.
7. Jangan mengubah business logic Book Service maupun Loan Service.
8. Tampilkan file yang perlu diubah secara lengkap setelah perubahan.
9. Jelaskan perintah instalasi dependency yang perlu dijalankan.
10. Jelaskan cara menjalankan ulang kedua service.
11. Jelaskan pengujian yang harus dilakukan setelah implementasi.

Perhatikan bahwa frontend dan backend menggunakan origin berbeda karena hostname/port berbeda. Jangan menambahkan solusi workaround pada browser.

Setelah perubahan, pastikan endpoint berikut tetap tersedia:
Book Service:
- GET /api/books
- GET /api/books/:id
- PATCH /api/books/:id/status

Loan Service:
- POST /api/loans
- GET /api/loans/user/:userId

Jangan melakukan perubahan lain di luar masalah CORS.


8.6 Hasil Perbaikan

Setelah konfigurasi CORS diterapkan:

daftar buku dapat ditampilkan;
frontend dapat mengakses Book Service;
frontend dapat mengakses Loan Service;
proses peminjaman dapat dilakukan.
9. Masalah Selama Implementasi

Beberapa masalah ditemukan selama proses pengembangan dan pengujian.

Masalah	Penyelesaian
File service belum terisi lengkap	File diperiksa dan dilengkapi
Nama file tidak sesuai	Nama file disesuaikan
ReferenceError akibat teks yang masuk ke kode	Teks yang tidak diperlukan dihapus
Dependency Express belum tersedia	Menjalankan npm install
CORS error	Menambahkan konfigurasi CORS

Masalah tersebut diperiksa dan diperbaiki sebelum dilakukan pengujian ulang.

10. Human Review

Hasil AI tidak langsung digunakan ke dalam project.

Human review dilakukan dengan cara:

Membandingkan hasil AI dengan requirement.
Memeriksa rancangan arsitektur.
Memeriksa tanggung jawab setiap service.
Memeriksa struktur kode.
Memeriksa endpoint API.
Menjalankan service.
Menguji endpoint.
Menguji komunikasi antar-service.
Memeriksa error yang ditemukan.
Melakukan perbaikan.
Melakukan pengujian ulang.
11. Regression Testing

Setelah implementasi dan debugging selesai, fitur utama diuji kembali.

Fitur	Hasil
Menampilkan daftar buku	PASS
Menampilkan status buku	PASS
Meminjam buku tersedia	PASS
Menolak buku yang sedang dipinjam	PASS
Batas maksimal 3 buku	PASS
Menampilkan informasi peminjaman	PASS
Komunikasi antar-service	PASS
Frontend terhubung dengan backend	PASS

````

12. Daftar Teknologi yang Digunakan

HTML5 — membuat struktur antarmuka Frontend.
CSS3 — mengatur tampilan dan layout Frontend.
Vanilla JavaScript — menangani logika dan interaksi pada Frontend.
Node.js — runtime untuk menjalankan service backend.
Express.js — framework untuk membangun Book Service dan Loan Service.
REST API — komunikasi antara Frontend dengan service dan antar-service.
Fetch API — melakukan request HTTP dari Frontend dan Loan Service.
JSON — penyimpanan data buku dan data peminjaman.
CORS — memungkinkan komunikasi Frontend dengan backend pada origin yang berbeda.
Git — version control project.
GitHub — repository dan kolaborasi project.
Gemini — AI Coding Tool untuk membantu analisis, implementasi, dan debugging.
ChatGPT — AI Coding Tool untuk membantu analisis, penyusunan, dan pengembangan dokumentasi.

13. Kesimpulan
AI Coding Tool membantu proses pengembangan Sistem Peminjaman Buku pada tahap analisis, perancangan, implementasi, dan debugging.
Penggunaan AI dilakukan secara bertahap. Setiap hasil AI melalui proses human review sebelum diterapkan. Kode yang dihasilkan kemudian dijalankan dan diuji untuk memastikan kesesuaiannya dengan requirement sistem.
Dengan pendekatan tersebut, AI digunakan sebagai alat bantu dalam pengembangan, sedangkan keputusan teknis, pemeriksaan kode, pengujian, dan validasi akhir tetap dilakukan oleh anggota kelompok.
```
