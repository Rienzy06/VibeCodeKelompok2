-- Rancangan awal skema SQL — Sistem Peminjaman Buku
-- PENTING: Periksa skema database proyek sebelum menjalankan file ini.
-- Jangan jalankan langsung pada database berisi data jika strukturnya berbeda.
-- Rancangan ini mengikuti template PRD yang menggunakan tabel `borrowings`.

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'available'
);

CREATE TABLE IF NOT EXISTS borrowings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    CONSTRAINT fk_borrowings_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_borrowings_book
        FOREIGN KEY (book_id) REFERENCES books(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX idx_borrowings_user_status
    ON borrowings (user_id, status);

CREATE INDEX idx_borrowings_book_status
    ON borrowings (book_id, status);
