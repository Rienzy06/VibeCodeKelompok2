# Test Results

Dokumentasi ini berisi hasil pengujian terhadap fitur utama Sistem Peminjaman Buku setelah pengembangan menjadi arsitektur microservice.

## Hasil Pengujian

### TC-01 — Menampilkan Daftar Buku

**Skenario:**  
Pengguna membuka sistem dan melihat daftar buku.

**Expected Result:**  
Daftar buku dan status ketersediaannya ditampilkan.

**Actual Result:**  
Daftar buku berhasil ditampilkan beserta status ketersediaannya.

**Status:** PASS

---

### TC-02 — Melihat Detail Buku

**Skenario:**  
Pengguna meminta data buku berdasarkan ID buku.

**Expected Result:**  
Data buku yang sesuai dengan ID ditampilkan.

**Actual Result:**  
Data buku berhasil ditampilkan.

**Status:** PASS

---

### TC-03 — Meminjam Buku yang Tersedia

**Skenario:**  
Pengguna meminjam buku dengan status `available` dan jumlah buku aktif kurang dari 3.

**Expected Result:**  
Peminjaman berhasil dibuat dan status buku berubah menjadi `borrowed`.

**Actual Result:**  
Peminjaman berhasil dibuat dan status buku berubah menjadi `borrowed`.

**Status:** PASS

---

### TC-04 — Menolak Buku yang Sedang Dipinjam

**Skenario:**  
Pengguna mencoba meminjam buku yang statusnya `borrowed`.

**Expected Result:**  
Peminjaman ditolak dan sistem memberikan informasi bahwa buku tidak tersedia.

**Actual Result:**  
Peminjaman ditolak dengan kode `BOOK_NOT_AVAILABLE`.

**Status:** PASS

---

### TC-05 — Batas Maksimal 3 Buku Aktif

**Skenario:**  
Pengguna yang sudah memiliki 3 buku aktif mencoba meminjam buku lainnya.

**Expected Result:**  
Peminjaman ditolak karena pengguna telah mencapai batas maksimal 3 buku aktif.

**Actual Result:**  
Peminjaman ditolak dengan kode `MAX_LIMIT_REACHED` dan pesan bahwa batas maksimal peminjaman telah tercapai.

**Status:** PASS

---

### TC-06 — Masa Peminjaman 7 Hari

**Skenario:**  
Pengguna berhasil melakukan peminjaman buku.

**Expected Result:**  
Sistem menentukan `dueDate` 7 hari setelah `borrowDate`.

**Actual Result:**  
`dueDate` berhasil ditentukan 7 hari setelah tanggal peminjaman.

**Status:** PASS

---

### TC-07 — Melihat Informasi Peminjaman

**Skenario:**  
Pengguna meminta informasi peminjaman berdasarkan `userId`.

**Expected Result:**  
Sistem menampilkan data peminjaman pengguna.

**Actual Result:**  
Data peminjaman berhasil ditampilkan melalui Loan Service.

**Status:** PASS

---

### TC-08 — Komunikasi Antar-Service

**Skenario:**  
Loan Service melakukan proses peminjaman dan berkomunikasi dengan Book Service.

**Expected Result:**  
Loan Service dapat mengambil data buku dan memperbarui status buku melalui REST API.

**Actual Result:**  
Komunikasi antara Loan Service dan Book Service berhasil dilakukan.

**Status:** PASS

---

### TC-09 — Integrasi Frontend dengan Backend

**Skenario:**  
Frontend melakukan request ke Book Service dan Loan Service.

**Expected Result:**  
Frontend dapat mengambil data dan melakukan proses peminjaman melalui API.

**Actual Result:**  
Frontend berhasil berkomunikasi dengan kedua service setelah konfigurasi CORS diperbaiki.

**Status:** PASS

---

## Regression Testing

Setelah dilakukan debugging dan perbaikan, fitur utama diuji kembali untuk memastikan perubahan tidak mengganggu fungsi yang sudah berjalan.

Hasil regression testing:

- Menampilkan daftar buku — **PASS**
- Melihat status buku — **PASS**
- Meminjam buku tersedia — **PASS**
- Menolak buku yang sedang dipinjam — **PASS**
- Batas maksimal 3 buku — **PASS**
- Menampilkan informasi peminjaman — **PASS**
- Komunikasi antar-service — **PASS**
- Integrasi Frontend dengan backend — **PASS**

## Kesimpulan

Berdasarkan pengujian yang dilakukan, fitur utama Sistem Peminjaman Buku dapat berjalan sesuai dengan rancangan. Pengujian mencakup masing-masing service, proses peminjaman, aturan bisnis, komunikasi antar-service, integrasi Frontend, serta regression testing setelah debugging.