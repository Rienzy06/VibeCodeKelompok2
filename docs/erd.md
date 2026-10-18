# ERD — Sistem Peminjaman Buku

```mermaid
erDiagram
    USERS ||--o{ BORROWINGS : melakukan
    BOOKS ||--o{ BORROWINGS : tercatat_dalam

    USERS {
        BIGINT id PK
        VARCHAR username
        VARCHAR password
    }

    BOOKS {
        BIGINT id PK
        VARCHAR title
        VARCHAR author
        VARCHAR status
    }

    BORROWINGS {
        BIGINT id PK
        BIGINT user_id FK
        BIGINT book_id FK
        DATE borrow_date
        DATE due_date
        DATE return_date
        VARCHAR status
    }
```

## Keterangan relasi

- Satu pengguna (`users`) dapat memiliki banyak transaksi peminjaman (`borrowings`).
- Satu buku (`books`) dapat muncul dalam banyak transaksi peminjaman pada waktu yang berbeda.
- `borrowings.user_id` mengacu pada `users.id`.
- `borrowings.book_id` mengacu pada `books.id`.

## Catatan

Ini adalah rancangan awal berdasarkan template PRD. Cocokkan nama tabel, kolom, tipe data, dan aturan status dengan database proyek sebelum dijadikan dokumentasi final. Jika implementasi memakai tabel `loans`, ganti `borrowings` di diagram dan SQL agar konsisten.
