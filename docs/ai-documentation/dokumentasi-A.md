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

[TEMPEL PROMPT ANALISIS AWAL YANG SUDAH KAMU PUNYA]

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

[TEMPEL PROMPT BOOK SERVICE YANG SUDAH KAMU PUNYA]

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

[TEMPEL PROMPT IMPLEMENTASI BOOK SERVICE YANG SUDAH KAMU PUNYA]

## 5.5 Ringkasan Hasil Implementasi

AI menghasilkan implementasi Book Service menggunakan Node.js dan Express.js.

Service menyediakan endpoint:

```text
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

[TEMPEL PROMPT IMPLEMENTASI LOAN SERVICE YANG SUDAH KAMU PUNYA]

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

[TEMPEL PROMPT FRONTEND PROMPT 1]

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

[TEMPEL PROMPT FRONTEND PROMPT 2]

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

[TEMPEL PROMPT DEBUGGING CORS YANG SUDAH KAMU PUNYA]

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

[TEMPEL PROMPT IMPLEMENTASI CORS YANG SUDAH KAMU PUNYA]

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
