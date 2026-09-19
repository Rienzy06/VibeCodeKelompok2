document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const userIdInput = document.getElementById("user-id");
  const btnLoadLoans = document.getElementById("btn-load-loans");
  const booksListContainer = document.getElementById("books-list");
  const loansListContainer = document.getElementById("loans-list");
  const messageContainer = document.getElementById("message-container");

  // Initial Load
  loadBooks();

  // Event Listeners
  btnLoadLoans.addEventListener("click", handleLoadUserLoans);

  /**
   * Memuat daftar buku dari API dan merender ke UI.
   */
  async function loadBooks() {
    try {
      const books = await getBooks();
      renderBooks(books);
    } catch (error) {
      showMessage(error.message, "error");
      booksListContainer.innerHTML = `<p class="empty-text">Tidak dapat memuat daftar buku.</p>`;
    }
  }

  /**
   * Merender array buku ke dalam kontainer grid.
   * @param {Array} books
   */
  function renderBooks(books) {
    booksListContainer.innerHTML = "";

    if (!books || books.length === 0) {
      booksListContainer.innerHTML =
        '<p class="empty-text">Tidak ada buku yang tersedia.</p>';
      return;
    }

    books.forEach((book) => {
      const isAvailable = book.status === "available";

      const card = document.createElement("div");
      card.className = "book-card";

      const statusClass = isAvailable ? "status-available" : "status-borrowed";
      const statusText = isAvailable ? "Tersedia" : "Dipinjam";

      card.innerHTML = `
                <div>
                    <div class="book-title">${escapeHtml(book.title)}</div>
                    <div class="book-author">Penulis: ${escapeHtml(book.author)}</div>
                    <span class="book-status ${statusClass}">${statusText}</span>
                </div>
            `;

      // Hanya tampilkan tombol "Pinjam" jika buku statusnya available
      if (isAvailable) {
        const borrowBtn = document.createElement("button");
        borrowBtn.type = "button";
        borrowBtn.className = "btn-borrow";
        borrowBtn.textContent = "Pinjam";
        borrowBtn.addEventListener("click", () =>
          handleBorrowBook(book.id, borrowBtn),
        );
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
      showMessage("Silakan masukkan User ID terlebih dahulu.", "error");
      userIdInput.focus();
      return;
    }

    // Pencegahan Double Submit: Nonaktifkan tombol saat request berjalan
    buttonElement.disabled = true;
    buttonElement.textContent = "Memproses...";

    try {
      await createLoan(userId, bookId);
      showMessage("Buku berhasil dipinjam.", "success");

      // Synchronize UI State
      await loadBooks();
      await loadUserLoans(userId);
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      // Mengaktifkan kembali tombol jika masih terpasang di DOM
      if (buttonElement && buttonElement.isConnected) {
        buttonElement.disabled = false;
        buttonElement.textContent = "Pinjam";
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
      showMessage("Silakan masukkan User ID terlebih dahulu.", "error");
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
    loansListContainer.innerHTML =
      '<p class="loading-text">Memuat riwayat peminjaman...</p>';

    try {
      const loans = await getUserLoans(userId);
      renderLoans(loans);
    } catch (error) {
      showMessage(error.message, "error");
      loansListContainer.innerHTML = `<p class="empty-text">Gagal memuat riwayat peminjaman.</p>`;
    }
  }

  /**
   * Merender daftar riwayat peminjaman ke dalam tabel.
   * @param {Array} loans
   */
  function renderLoans(loans) {
    loansListContainer.innerHTML = "";

    if (!loans || loans.length === 0) {
      loansListContainer.innerHTML =
        '<p class="empty-text">Pengguna ini belum memiliki riwayat peminjaman.</p>';
      return;
    }

    const table = document.createElement("table");
    table.className = "loan-table";
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
                ${loans
                  .map(
                    (loan) => `
                    <tr>
                        <td>${escapeHtml(loan.loanId || "-")}</td>
                        <td>${escapeHtml(loan.bookId || "-")}</td>
                        <td>${escapeHtml(loan.borrowDate || "-")}</td>
                        <td>${escapeHtml(loan.dueDate || "-")}</td>
                        <td>${escapeHtml(loan.status || "-")}</td>
                    </tr>
                `,
                  )
                  .join("")}
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
    messageContainer.textContent = "";
    messageContainer.className = "message-box hidden";
  }

  /**
   * Helper untuk mencegah XSS sederhana pada output teks.
   */
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
