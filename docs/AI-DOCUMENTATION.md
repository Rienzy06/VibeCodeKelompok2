# Dokumentasi Penggunaan AI
## Proyek Sistem Peminjaman Buku — VibeCodeKelompok2

## 1. Identitas Proyek

| Komponen | Keterangan |
|---|---|
| Nama proyek | Sistem Peminjaman Buku |
| Repositori | `Rienzy06/VibeCodeKelompok2` |
| Backend | PHP dengan Lumen 10 |
| Basis data | MySQL |
| Frontend | HTML, CSS, dan JavaScript |
| AI yang digunakan dalam alur kerja | Gemini dan ChatGPT |
| Tujuan dokumentasi | Mencatat peran AI, prompt kerja, proses review, verifikasi, serta batasan penggunaan AI |

## 2. Tujuan Penggunaan AI

Gemini dan ChatGPT digunakan sebagai alat bantu dalam memahami kebutuhan proyek, menyusun dan meninjau dokumentasi, menganalisis struktur API dan basis data, merancang skenario pengujian, serta membantu mengevaluasi konsistensi antara implementasi dan laporan.

AI tidak menjadi pengganti keputusan tim. Setiap saran yang berhubungan dengan kode, endpoint, struktur tabel, aturan bisnis, atau hasil pengujian harus diperiksa terhadap repository dan aplikasi yang dijalankan.

## 3. Pembagian Peran AI

| Alat | Peran dalam alur kerja |
|---|---|
| Gemini | Membantu tahap pengerjaan awal atau eksplorasi sesuai aktivitas yang benar-benar dilakukan tim, misalnya memahami kebutuhan dan menyusun solusi awal. |
| ChatGPT | Membantu peninjauan lanjutan, menyusun dokumentasi, mengidentifikasi ketidakkonsistenan, merancang checklist pengujian, serta merapikan laporan. |
| Anggota tim | Menentukan kebutuhan, memeriksa kode, menjalankan aplikasi dan pengujian, memutuskan saran yang diterapkan, serta memastikan laporan sesuai bukti. |

**Catatan akurasi:** Tabel ini menjelaskan pembagian peran yang digunakan untuk mendokumentasikan alur kerja. Jangan menyatakan bahwa suatu alat mengerjakan aktivitas tertentu jika aktivitas tersebut tidak benar-benar dilakukan. Jika pembagian aktual berbeda, sesuaikan tabel ini.

## 4. Prinsip Penggunaan AI

1. **Berbasis sumber proyek.** Analisis harus mengacu pada kode, route, migration, konfigurasi, dan hasil pengujian yang tersedia.
2. **Tidak mengarang hasil.** AI tidak boleh menyatakan endpoint tersedia, pengujian lulus, atau bug telah diperbaiki tanpa bukti.
3. **Review sebelum perubahan.** Saran AI diperiksa sebelum digunakan untuk mengubah kode atau dokumentasi.
4. **Validasi manual.** Tim menjalankan aplikasi dan pengujian yang relevan untuk memastikan perilaku aktual.
5. **Keamanan informasi.** Jangan memasukkan password, token, kredensial, isi `.env`, atau data pribadi ke prompt.
6. **Jejak keputusan.** Catat saran yang diterima, diubah, atau ditolak beserta alasan dan bukti pemeriksaannya.

## 5. Alur Kerja Penggunaan AI

Alur yang digunakan untuk mendokumentasikan bantuan AI adalah:

1. Menentukan kebutuhan dan ruang lingkup sistem.
2. Meminta bantuan AI untuk memahami atau menyusun solusi awal.
3. Memeriksa saran terhadap struktur proyek yang sebenarnya.
4. Meninjau endpoint, skema basis data, validasi, autentikasi, dan aturan bisnis.
5. Menyusun skenario pengujian berdasarkan kebutuhan dan implementasi.
6. Menjalankan pengujian secara langsung dan mencatat hasil aktual.
7. Membandingkan implementasi, hasil pengujian, dokumentasi API, ERD, skema SQL, dan laporan.
8. Memperbaiki dokumentasi jika ditemukan ketidaksesuaian.
9. Melakukan pemeriksaan akhir sebelum perubahan di-commit ke Git.

Alur tersebut merupakan prosedur dokumentasi dan review. Catatan aktivitas individual pada Bagian 8 harus diisi sesuai riwayat kerja yang benar-benar terjadi.

## 6. Kumpulan Prompt Kerja

Prompt berikut disediakan sebagai **prompt kerja yang dapat digunakan atau dilampirkan dalam laporan**. Prompt ini tidak otomatis membuktikan bahwa prompt yang sama pernah dikirim pada tanggal tertentu. Jika laporan mensyaratkan bukti penggunaan AI, gunakan riwayat percakapan asli atau tangkapan layar yang relevan.

### 6.1 Prompt untuk Gemini — Memahami Kebutuhan dan Struktur Proyek

```text
Saya sedang mengerjakan proyek Sistem Peminjaman Buku pada repository
VibeCodeKelompok2. Teknologi proyek yang diketahui adalah PHP dengan
Lumen 10, MySQL, HTML, CSS, dan JavaScript.

Bantu saya memahami proyek berdasarkan file dan informasi yang saya
berikan. Jangan mengarang file, endpoint, tabel, field, aturan bisnis,
atau hasil pengujian yang tidak terlihat dari sumber.

Tugas:
1. Ringkas tujuan dan fitur sistem berdasarkan sumber yang diberikan.
2. Identifikasi komponen frontend, backend, API, autentikasi, dan database.
3. Buat daftar file atau informasi yang masih perlu diperiksa.
4. Pisahkan fakta yang terlihat dari dugaan atau informasi yang belum
   dapat dipastikan.
5. Jangan mengubah kode terlebih dahulu. Berikan analisis dan daftar
   pemeriksaan yang perlu dilakukan.

Format jawaban:
- Ringkasan proyek
- Fakta yang didukung sumber
- Informasi yang belum terverifikasi
- Risiko atau ketidakkonsistenan yang ditemukan
- Langkah pemeriksaan berikutnya
```

### 6.2 Prompt untuk Gemini — Membantu Implementasi atau Pemecahan Masalah

```text
Bantu saya menganalisis masalah pada Sistem Peminjaman Buku.
Saya akan memberikan kode, pesan error, atau hasil request yang relevan.

Sebelum mengusulkan perubahan:
1. Jelaskan penyebab yang paling mungkin dan bukti pendukungnya.
2. Periksa apakah solusi sesuai dengan versi teknologi dan struktur proyek.
3. Sebutkan file yang perlu diubah dan alasan perubahan.
4. Hindari mengubah bagian yang tidak terkait.
5. Jangan mengklaim solusi berhasil sebelum saya menjalankan dan
   mengonfirmasi hasilnya.
6. Jika informasi belum cukup, tanyakan informasi yang diperlukan.

Berikan solusi yang spesifik, langkah penerapan, dan cara menguji hasilnya.
Jangan memasukkan kredensial atau data rahasia ke jawaban.
```

### 6.3 Prompt untuk ChatGPT — Review API dan Aturan Bisnis

```text
Bertindaklah sebagai reviewer teknis untuk proyek Sistem Peminjaman Buku
berbasis Lumen 10 dan MySQL. Gunakan hanya route, controller, middleware,
migration, model, contoh request/response, dan hasil pengujian yang saya
berikan.

Tinjau:
1. Kesesuaian endpoint dan metode HTTP.
2. Field request dan response serta validasinya.
3. Autentikasi dan otorisasi setiap endpoint yang memerlukan login.
4. Aturan peminjaman: ketersediaan buku, batas peminjaman aktif, tanggal
   pinjam, tanggal jatuh tempo, dan status peminjaman.
5. Aturan pengembalian dan perubahan ketersediaan buku.
6. Konsistensi relasi database dengan implementasi.
7. Potensi akses data milik pengguna lain.
8. Kesesuaian dokumentasi API dan laporan dengan implementasi.

Untuk setiap temuan, berikan:
- ID temuan
- Tingkat risiko (tinggi/sedang/rendah/informasi)
- Bukti dari sumber yang saya berikan
- Dampak
- Rekomendasi
- Cara verifikasi

Jangan menganggap endpoint atau fitur tersedia hanya karena disebut dalam
laporan. Jangan menganggap bug telah diperbaiki tanpa bukti pengujian.
Jika sumber tidak cukup, tulis "belum dapat diverifikasi".
```

### 6.4 Prompt untuk ChatGPT — Review Skema Database dan ERD

```text
Tinjau dokumentasi ERD dan skema SQL proyek Sistem Peminjaman Buku.
Bandingkan dokumentasi dengan migration dan struktur database aktual yang
saya berikan.

Periksa:
1. Nama tabel dan kolom.
2. Tipe data, primary key, dan unique constraint.
3. Foreign key dan arah relasi.
4. Nullability, enum/status, timestamp, dan indeks.
5. Konsistensi antara ERD, schema.sql, migration, dan kode aplikasi.
6. Apakah ada relasi yang tidak memiliki foreign key atau perbedaan tipe
   data yang perlu dijelaskan.
7. Apakah file SQL merupakan dokumentasi skema atau script yang aman
   untuk langsung dieksekusi.

Sajikan tabel berisi: bagian, kondisi yang ditemukan, bukti sumber,
dampak, rekomendasi, dan status verifikasi. Jangan menambahkan relasi,
kolom, atau constraint yang tidak didukung sumber. Tandai asumsi secara
jelas dan jangan menyatakan skema sudah identik sebelum diverifikasi.
```

### 6.5 Prompt untuk ChatGPT — Menyusun Skenario Pengujian

```text
Berdasarkan kebutuhan, route, kode, dan aturan bisnis yang saya berikan,
susun skenario pengujian untuk Sistem Peminjaman Buku.

Untuk setiap skenario, tuliskan:
- ID pengujian
- Tujuan
- Prasyarat
- Langkah pengujian
- Data request yang diperlukan
- Hasil yang diharapkan
- Hasil aktual (biarkan kosong sampai pengujian dilakukan)
- Status (belum diuji/lulus/gagal)
- Bukti yang perlu disimpan

Cakup pengujian yang relevan untuk login, token tidak valid, daftar/detail
buku, peminjaman buku tersedia, peminjaman buku tidak tersedia, batas
peminjaman aktif, riwayat pengguna, pengembalian, serta akses terhadap
data pengguna lain.

Jangan mengisi hasil aktual atau status lulus berdasarkan perkiraan.
Pastikan skenario sesuai dengan endpoint yang benar-benar ada. Jika suatu
endpoint belum terkonfirmasi, tandai sebagai perlu verifikasi.
```

### 6.6 Prompt untuk ChatGPT — Pemeriksaan Konsistensi Laporan

```text
Bantu saya melakukan pemeriksaan konsistensi akhir untuk laporan proyek
Sistem Peminjaman Buku. Saya akan memberikan laporan, API-CONTRACT.md,
AI-DOCUMENTATION.md, CODE_REVIEW_LOG.md, erd.md, schema.sql, serta bukti
pengujian yang tersedia.

Bandingkan dokumen-dokumen tersebut dengan sumber implementasi yang
disediakan. Periksa:
1. Kesamaan nama fitur, endpoint, metode HTTP, request, dan response.
2. Kesamaan nama tabel, kolom, tipe data, dan relasi.
3. Kesamaan aturan bisnis dan alur peminjaman/pengembalian.
4. Kesesuaian status pengujian dengan bukti aktual.
5. Klaim keamanan dan perbaikan bug.
6. Perbedaan atau klaim yang belum memiliki bukti.

Buat tabel: klaim dalam laporan, sumber pembanding, hasil pemeriksaan,
bukti, dan tindakan yang diperlukan. Bedakan fakta, asumsi, dan hal yang
belum terverifikasi. Jangan menulis ulang hasil pengujian atau menyatakan
semua bagian benar jika sumbernya belum cukup.
```

### 6.7 Prompt untuk Review Akhir sebelum Push

```text
Lakukan review akhir terhadap perubahan dokumentasi proyek sebelum di-push
ke Git. Periksa API-CONTRACT.md, AI-DOCUMENTATION.md, CODE_REVIEW_LOG.md,
erd.md, dan schema.sql.

Pastikan:
- nama dan istilah konsisten;
- tidak ada endpoint, tabel, kolom, atau aturan bisnis yang dikarang;
- contoh request/response diberi keterangan jika hanya ilustrasi;
- hasil review dibedakan dari hasil pengujian;
- klaim lulus memiliki bukti;
- placeholder sudah diisi atau dihapus;
- tidak ada password, token, kredensial, atau data pribadi;
- tidak ada instruksi yang dapat menyebabkan database terhapus atau
  berubah tanpa sengaja.

Keluarkan daftar temuan berdasarkan tingkat risiko. Jangan menyatakan
review selesai jika ada temuan kritis atau informasi penting yang belum
dapat diverifikasi. Jangan mengubah file; berikan rekomendasi terlebih
dahulu.
```

## 7. Checklist Review Teknis

Checklist berikut digunakan untuk mengarahkan review. Status harus diisi berdasarkan pemeriksaan aktual.

| ID | Area review | Hal yang diperiksa | Status aktual |
|---|---|---|---|
| R-01 | API | Endpoint dan metode HTTP sesuai route aktual | [belum diperiksa/terverifikasi] |
| R-02 | Request | Nama field dan validasi sesuai controller | [belum diperiksa/terverifikasi] |
| R-03 | Auth | Token diperiksa dan identitas pengguna ditentukan dengan benar | [belum diperiksa/terverifikasi] |
| R-04 | Otorisasi | Pengguna tidak dapat membaca atau mengubah data pengguna lain tanpa hak | [belum diperiksa/terverifikasi] |
| R-05 | Peminjaman | Validasi buku tersedia dan batas peminjaman aktif sesuai kebutuhan | [belum diperiksa/terverifikasi] |
| R-06 | Jatuh tempo | Perhitungan tanggal jatuh tempo sesuai aturan sistem | [belum diperiksa/terverifikasi] |
| R-07 | Pengembalian | Status pinjaman dan ketersediaan buku berubah secara konsisten | [belum diperiksa/terverifikasi] |
| R-08 | Database | ERD, schema SQL, migration, dan kode konsisten | [belum diperiksa/terverifikasi] |
| R-09 | Dokumentasi | API contract dan laporan sesuai perilaku aktual | [belum diperiksa/terverifikasi] |
| R-10 | Keamanan | Tidak ada rahasia atau data pribadi di dokumentasi/repository | [belum diperiksa/terverifikasi] |

## 8. Catatan Hasil Review

Gunakan tabel ini untuk mencatat hasil review yang benar-benar dilakukan. Jika tidak ditemukan masalah, tuliskan bahwa tidak ditemukan masalah **pada ruang lingkup dan sumber yang diperiksa**, bukan bahwa sistem sepenuhnya bebas bug.

| Tanggal | Reviewer/alat | Ruang lingkup | Temuan | Keputusan/tindakan | Bukti verifikasi |
|---|---|---|---|---|---|
| [tanggal] | [Gemini/ChatGPT/manual] | [bagian yang diperiksa] | [temuan atau tidak ada temuan pada ruang lingkup ini] | [diterima/diubah/ditolak/tidak ada perubahan] | [file, test, log, atau screenshot] |

### Format satu temuan review

- **ID:** [R-xx]
- **Tanggal:** [tanggal]
- **Sumber yang diperiksa:** [file/endpoint/hasil test]
- **Temuan:** [uraian faktual]
- **Bukti:** [kutipan singkat, hasil request, atau lokasi kode]
- **Dampak:** [risiko]
- **Rekomendasi:** [tindakan yang disarankan]
- **Keputusan tim:** [diterima/diubah/ditolak]
- **Hasil verifikasi setelah tindakan:** [hasil aktual atau belum diuji]

## 9. Pencatatan Pengujian

Skenario pengujian yang disarankan harus dipisahkan dari hasil yang benar-benar diperoleh. Isi hasil aktual berdasarkan request atau tindakan yang dijalankan pada aplikasi.

| ID | Skenario | Hasil yang diharapkan | Hasil aktual | Status | Bukti |
|---|---|---|---|---|---|
| T-01 | Login dengan kredensial valid | Autentikasi berhasil dan respons sesuai kontrak API | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-02 | Request tanpa token atau dengan token tidak valid | Akses ditolak sesuai kebijakan autentikasi | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-03 | Melihat daftar buku | Data buku dikembalikan sesuai kontrak API | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-04 | Meminjam buku yang tersedia | Peminjaman dibuat jika semua aturan terpenuhi | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-05 | Meminjam buku yang tidak tersedia | Permintaan ditolak sesuai aturan | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-06 | Melampaui batas pinjaman aktif | Permintaan ditolak sesuai batas sistem | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-07 | Melihat riwayat pinjaman pengguna | Riwayat hanya menampilkan data yang berhak diakses pengguna | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |
| T-08 | Mengembalikan buku | Status pinjaman dan buku berubah sesuai aturan | [isi setelah diuji] | [belum diuji/lulus/gagal] | [file/screenshot/log] |

Skenario di atas merupakan daftar pemeriksaan yang disarankan. Hapus atau sesuaikan skenario yang tidak relevan dengan implementasi. Status lulus hanya boleh diberikan setelah pengujian dilakukan dan bukti disimpan.

## 10. Batasan dan Risiko Penggunaan AI

AI dapat menghasilkan informasi yang tidak akurat, menyimpulkan sesuatu dari konteks yang tidak lengkap, atau memberikan contoh yang tidak sesuai dengan implementasi. Oleh karena itu:

- contoh respons AI bukan bukti bahwa API menghasilkan respons tersebut;
- saran review bukan bukti bahwa bug benar-benar ada atau telah diperbaiki;
- dokumentasi yang dibuat dengan bantuan AI harus dibandingkan dengan kode dan database aktual;
- klaim keamanan perlu diuji dan tidak dapat dijamin hanya dari review teks;
- jika sumber tidak cukup, hasil review harus menyebutkan bahwa hal tersebut belum dapat diverifikasi.

## 11. Privasi dan Keamanan Data

Saat menggunakan Gemini atau ChatGPT:

- jangan mengunggah file `.env`, password, token, API key, atau kredensial database;
- samarkan data pribadi dan data uji yang sensitif;
- hapus rahasia dari screenshot, log, dan potongan kode;
- periksa perintah yang diusulkan AI sebelum dijalankan;
- buat cadangan sebelum menjalankan perubahan database yang berisiko;
- tinjau setiap perubahan kode sebelum dimasukkan ke branch utama.

## 12. Kesimpulan

Gemini dan ChatGPT dapat membantu proses pengembangan melalui penjelasan teknis, analisis, review, perancangan pengujian, dan penyusunan dokumentasi. Namun, kualitas hasil akhir ditentukan oleh verifikasi anggota tim terhadap sumber proyek dan perilaku aplikasi yang sebenarnya. Dokumentasi ini menjadi catatan transparansi penggunaan AI dan harus mencerminkan aktivitas, keputusan, serta bukti yang benar-benar tersedia.

## 13. Catatan untuk Laporan

Untuk laporan akademik, gunakan dokumen ini sebagai penjelasan proses penggunaan AI. Lampirkan bukti yang tersedia, misalnya tangkapan layar prompt dan respons, hasil request API, hasil pengujian, atau commit Git. Jangan menganggap tabel prompt yang disediakan di dokumen ini sebagai bukti historis bahwa semua prompt tersebut pernah digunakan.

Jika prompt di Bagian 6 digunakan selama proses review, catat tanggal, alat, ringkasan hasil, keputusan tim, dan bukti yang sesuai pada Bagian 8. Jika prompt hanya disiapkan sebagai template, nyatakan sebagai template.

## 14. Riwayat Dokumen

| Versi | Keterangan |
|---|---|
| Final | Dokumentasi penggunaan Gemini dan ChatGPT untuk mendukung proses analisis, review, pengujian, dan dokumentasi proyek. |
