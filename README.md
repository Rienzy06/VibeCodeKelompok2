VIBE CODING KELOMPOK 2
# Sistem Peminjaman Buku

Sistem Peminjaman Buku merupakan aplikasi yang digunakan untuk membantu mahasiswa melihat daftar buku, mengetahui ketersediaan buku, dan melakukan peminjaman buku.

Pada pengembangan ini, sistem sebelumnya yang menggunakan HTML, CSS, JavaScript, dan localStorage dikembangkan menjadi sistem berbasis microservice. Pengembangan dilakukan dengan memisahkan fungsi pengelolaan data buku dan proses peminjaman ke dalam service yang berbeda.

## Fitur Sistem

Sistem memiliki beberapa fitur utama, yaitu melihat daftar buku, melihat status ketersediaan buku, melakukan peminjaman buku yang tersedia, membatasi maksimal tiga buku aktif untuk setiap mahasiswa, menolak peminjaman buku yang sedang dipinjam, serta menampilkan informasi peminjaman dengan masa peminjaman selama tujuh hari.

## Arsitektur

Sistem terdiri dari Frontend, Book Service, dan Loan Service.

Frontend digunakan sebagai antarmuka pengguna untuk melihat buku dan melakukan peminjaman. Book Service bertanggung jawab mengelola data buku serta status ketersediaannya. Loan Service bertanggung jawab mengelola transaksi peminjaman dan melakukan komunikasi dengan Book Service ketika proses peminjaman berlangsung.

Frontend berkomunikasi dengan Book Service dan Loan Service menggunakan REST API. Loan Service juga berkomunikasi dengan Book Service untuk mengecek ketersediaan buku dan memperbarui status buku setelah peminjaman berhasil.

Book Service berjalan pada port `3001`, sedangkan Loan Service berjalan pada port `3002`.

## Teknologi

Sistem dikembangkan menggunakan HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js, REST API, Fetch API, JSON File Storage, dan CORS.

## Struktur Project

Project terdiri dari tiga bagian utama, yaitu `frontend` sebagai antarmuka pengguna, `book-service` sebagai service pengelolaan data buku, dan `loan-service` sebagai service pengelolaan transaksi peminjaman.

Dokumentasi arsitektur, pengujian, penggunaan AI Coding Tool, dan laporan project tersedia pada folder `docs`.

## Menjalankan Sistem

Book Service dijalankan pada:

`http://localhost:3001`

Loan Service dijalankan pada:

`http://localhost:3002`

Frontend dapat dijalankan menggunakan Live Server atau web server lainnya.

## Dokumentasi

Dokumentasi lengkap mengenai arsitektur, proses pengujian, debugging, penggunaan AI Coding Tool, dan laporan pengembangan tersedia di dalam folder `docs`.
