document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DOM ELEMENTS
  // ==========================================

  const messageContainer = document.getElementById("message-container");

  // Elemen autentikasi (Login & Register)
  const loginSection = document.getElementById("login-section");
  const appSection = document.getElementById("app-section");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const btnLogin = document.getElementById("btn-login");
  const btnLogout = document.getElementById("btn-logout");
  const currentUsername = document.getElementById("current-username");

  // Elemen Form Register & Navigasi Toggle
  const loginFormContainer = document.getElementById("login-form-container");
  const registerFormContainer = document.getElementById(
    "register-form-container",
  );
  const registerForm = document.getElementById("register-form");
  const regUsernameInput = document.getElementById("reg-username");
  const regPasswordInput = document.getElementById("reg-password");
  const btnRegister = document.getElementById("btn-register");
  const linkToRegister = document.getElementById("link-to-register");
  const linkToLogin = document.getElementById("link-to-login");

  // Elemen buku, pencarian, ringkasan, dan peminjaman
  const booksListContainer = document.getElementById("books-list");
  const loansListContainer = document.getElementById("loans-list");
  const searchInput = document.getElementById("search-input");
  const countActiveEl = document.getElementById("count-active");
  const countReturnedEl = document.getElementById("count-returned");
  const filterTabs = document.querySelectorAll(".filter-tab");

  // Global Cache Data
  let allBooksCache = [];
  let allLoansCache = [];
  let currentLoanFilter = "all";

  // ==========================================
  // 1.1. TOGGLE LOGIN <-> REGISTER
  // ==========================================

  if (linkToRegister && linkToLogin) {
    linkToRegister.addEventListener("click", (e) => {
      e.preventDefault();
      hideMessage();
      loginFormContainer.classList.add("hidden");
      registerFormContainer.classList.remove("hidden");
    });

    linkToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      hideMessage();
      registerFormContainer.classList.add("hidden");
      loginFormContainer.classList.remove("hidden");
    });
  }

  // ==========================================
  // 1.2. FITUR SHOW / HIDE PASSWORD (TOGGLE)
  // ==========================================

  const eyeOpenSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;

  const eyeOffSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  `;

  const toggleButtons = document.querySelectorAll(".toggle-password-btn");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const passwordGroup = this.closest(".password-group");
      const passwordField = passwordGroup
        ? passwordGroup.querySelector("input")
        : null;

      if (passwordField) {
        const type =
          passwordField.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordField.setAttribute("type", type);
        this.innerHTML = type === "password" ? eyeOpenSVG : eyeOffSVG;
      }
    });
  });

  // ==========================================
  // 1.3. LIVE SEARCH FILTER
  // ==========================================

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const filteredBooks = allBooksCache.filter((book) => {
        const title = (book.title || "").toLowerCase();
        const author = (book.author || "").toLowerCase();
        return title.includes(keyword) || author.includes(keyword);
      });
      renderBooks(filteredBooks, keyword !== "");
    });
  }

  // ==========================================
  // 1.4. FILTER STATUS PEMINJAMAN (TABS)
  // ==========================================

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentLoanFilter = tab.dataset.filter;
      applyLoanFilterAndRender();
    });
  });

  function applyLoanFilterAndRender() {
    let filteredLoans = allLoansCache;
    if (currentLoanFilter === "active") {
      filteredLoans = allLoansCache.filter(
        (l) => (l.status || "").toLowerCase() === "active",
      );
    } else if (currentLoanFilter === "returned") {
      filteredLoans = allLoansCache.filter(
        (l) => (l.status || "").toLowerCase() !== "active",
      );
    }
    renderLoans(filteredLoans);
  }

  // ==========================================
  // 2. TAMPILAN LOGIN DAN APLIKASI
  // ==========================================

  function showLogin() {
    loginSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    if (registerFormContainer && loginFormContainer) {
      registerFormContainer.classList.add("hidden");
      loginFormContainer.classList.remove("hidden");
    }
  }

  function showApp(username) {
    loginSection.classList.add("hidden");
    appSection.classList.remove("hidden");

    currentUsername.textContent = username || "Pengguna";

    loadBooks();
    loadUserLoans();
  }

  // ==========================================
  // 3. LOGIN
  // ==========================================

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      showMessage("Username dan password wajib diisi.", "error");
      return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = "Memproses...";

    try {
      await login(username, password);
      const user = await getCurrentUser();

      passwordInput.value = "";

      showApp(user.username || username);
      showMessage("Login berhasil. Selamat datang di sistem.", "success");
    } catch (error) {
      clearToken();
      showLogin();
      showMessage(
        error.message || "Login gagal. Periksa kembali kredensial Anda.",
        "error",
      );
    } finally {
      btnLogin.disabled = false;
      btnLogin.textContent = "Masuk ke Sistem";
    }
  });

  // ==========================================
  // 3.1. REGISTER
  // ==========================================

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideMessage();

      const username = regUsernameInput.value.trim();
      const password = regPasswordInput.value;

      if (!username || !password) {
        showMessage("Username dan password wajib diisi.", "error");
        return;
      }

      if (password.length < 6) {
        showMessage("Password minimal harus 6 karakter.", "error");
        return;
      }

      btnRegister.disabled = true;
      btnRegister.textContent = "Memproses...";

      try {
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
          showMessage(
            result.message || "Registrasi berhasil. Silakan masuk.",
            "success",
          );
          registerForm.reset();

          registerFormContainer.classList.add("hidden");
          loginFormContainer.classList.remove("hidden");
        } else {
          throw new Error(result.message || "Gagal melakukan registrasi.");
        }
      } catch (error) {
        showMessage(error.message || "Terjadi kesalahan pada server.", "error");
      } finally {
        btnRegister.disabled = false;
        btnRegister.textContent = "Buat Akun Baru";
      }
    });
  }

  // ==========================================
  // 4. LOGOUT (DENGAN MODAL KONFIRMASI)
  // ==========================================

  btnLogout.addEventListener("click", () => {
    showConfirmModal(
      "Keluar Sesi",
      "Apakah Anda yakin ingin keluar dari akun Anda?",
      async () => {
        hideMessage();
        btnLogout.disabled = true;
        btnLogout.textContent = "Keluar...";

        try {
          await logout();
          showLogin();

          currentUsername.textContent = "";
          if (searchInput) searchInput.value = "";
          allBooksCache = [];
          allLoansCache = [];
          updateCounterBadges(0, 0);

          booksListContainer.innerHTML = `<p class="info-text">Silakan masuk untuk melihat daftar buku.</p>`;
          loansListContainer.innerHTML = `<p class="info-text">Silakan masuk untuk melihat riwayat peminjaman.</p>`;

          showMessage("Sesi berhasil diakhiri.", "success");
        } catch (error) {
          showMessage(error.message || "Gagal keluar sesi.", "error");
        } finally {
          btnLogout.disabled = false;
          btnLogout.textContent = "Keluar Sesi";
        }
      },
    );
  });

  // ==========================================
  // 5. MEMERIKSA SESI LOGIN
  // ==========================================

  async function initializeApp() {
    const token = getToken();

    if (!token) {
      showLogin();
      return;
    }

    try {
      const user = await getCurrentUser();
      showApp(user.username || "Pengguna");
    } catch (error) {
      clearToken();
      showLogin();
    }
  }

  // ==========================================
  // 6. MEMUAT DAFTAR BUKU
  // ==========================================

  async function loadBooks() {
    booksListContainer.innerHTML = `<p class="loading-text">Memuat data katalog buku...</p>`;

    try {
      const books = await getBooks();
      allBooksCache = Array.isArray(books) ? books : [];
      renderBooks(allBooksCache);
    } catch (error) {
      booksListContainer.innerHTML = `<p class="info-text">Gagal memuat katalog buku.</p>`;
      showMessage(error.message, "error");
    }
  }

  // ==========================================
  // 7. MENAMPILKAN DAFTAR BUKU
  // ==========================================

  function renderBooks(books, isSearchFiltered = false) {
    if (!Array.isArray(books) || books.length === 0) {
      booksListContainer.innerHTML = `
        <div class="empty-state">
          <p><strong>${isSearchFiltered ? "Pencarian tidak ditemukan." : "Belum ada koleksi buku yang tersedia."}</strong></p>
        </div>
      `;
      return;
    }

    booksListContainer.innerHTML = books
      .map((book) => {
        const bookId = book.id;
        const title = book.title || "Judul tidak tersedia";
        const author = book.author || "Penulis tidak diketahui";

        const available =
          book.status === "available" ||
          book.status === "tersedia" ||
          book.status === "Available";

        const statusText = available ? "Tersedia" : "Tidak Tersedia";

        return `
          <article class="book-card">
            <h3>${escapeHTML(title)}</h3>
            <p><strong>Penulis:</strong> ${escapeHTML(author)}</p>
            <p>
              <strong>Status:</strong>
              <span class="${available ? "status-available" : "status-unavailable"}">
                ${statusText}
              </span>
            </p>
            <button
              type="button"
              class="btn-borrow"
              data-book-id="${escapeHTML(String(bookId))}"
              data-book-title="${escapeHTML(title)}"
              ${available ? "" : "disabled"}
            >
              ${available ? "Pinjam Buku" : "Sedang Dipinjam"}
            </button>
          </article>
        `;
      })
      .join("");

    const borrowButtons = booksListContainer.querySelectorAll(".btn-borrow");
    borrowButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = button.dataset.bookId;
        const bookTitle = button.dataset.bookTitle || "buku ini";

        showConfirmModal(
          "Peminjaman Buku",
          `Apakah Anda yakin ingin meminjam "${bookTitle}"?`,
          () => {
            handleBorrowBook(bookId, button);
          },
        );
      });
    });
  }

  // ==========================================
  // 8. MEMINJAM BUKU
  // ==========================================

  async function handleBorrowBook(bookId, buttonElement) {
    hideMessage();

    if (!getToken()) {
      showLogin();
      showMessage("Silakan masuk terlebih dahulu.", "error");
      return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = "Memproses...";

    try {
      await createLoan(bookId);
      showMessage("Buku berhasil dipinjam.", "success");

      await loadBooks();
      await loadUserLoans();
    } catch (error) {
      showMessage(error.message || "Gagal meminjam buku.", "error");

      if (buttonElement.isConnected) {
        buttonElement.disabled = false;
        buttonElement.textContent = "Pinjam Buku";
      }
    }
  }

  // ==========================================
  // 9. MEMUAT RIWAYAT PEMINJAMAN & BADGE
  // ==========================================

  async function loadUserLoans() {
    if (!getToken()) {
      loansListContainer.innerHTML = `<p class="info-text">Silakan masuk untuk melihat riwayat peminjaman.</p>`;
      return;
    }

    loansListContainer.innerHTML = `<p class="loading-text">Memuat riwayat peminjaman...</p>`;

    try {
      const loans = await getMyLoans();
      allLoansCache = Array.isArray(loans) ? loans : [];

      // Perbarui Counter Ringkasan
      const activeCount = allLoansCache.filter(
        (l) => (l.status || "").toLowerCase() === "active",
      ).length;
      const returnedCount = allLoansCache.length - activeCount;
      updateCounterBadges(activeCount, returnedCount);

      applyLoanFilterAndRender();
    } catch (error) {
      loansListContainer.innerHTML = `<p class="info-text">Gagal memuat riwayat peminjaman.</p>`;
      showMessage(error.message || "Gagal memuat riwayat peminjaman.", "error");
    }
  }

  function updateCounterBadges(active, returned) {
    if (countActiveEl) countActiveEl.textContent = active;
    if (countReturnedEl) countReturnedEl.textContent = returned;
  }

  // ==========================================
  // 10. MENAMPILKAN RIWAYAT PEMINJAMAN
  // ==========================================

  function renderLoans(loans) {
    if (!Array.isArray(loans) || loans.length === 0) {
      loansListContainer.innerHTML = `
        <div class="empty-state">
          <p>Belum ada riwayat transaksi peminjaman pada kategori ini.</p>
        </div>
      `;
      return;
    }

    loansListContainer.innerHTML = loans
      .map((loan) => {
        const targetBookId = loan.book_id ?? loan.bookId ?? loan.book?.id;
        const foundBook = allBooksCache.find(
          (b) => String(b.id) === String(targetBookId),
        );

        const bookTitle =
          loan.book_title ||
          loan.title ||
          loan.book?.title ||
          (foundBook ? foundBook.title : null) ||
          `Buku ID ${targetBookId ?? "-"}`;

        const formatDate = (dateStr) => {
          if (!dateStr || dateStr === "-") return "-";
          try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          } catch (e) {
            return dateStr;
          }
        };

        const borrowDate = formatDate(loan.borrow_date || loan.borrowDate);
        const rawDueDate = loan.due_date || loan.dueDate;
        const dueDate = formatDate(rawDueDate);

        const returnDateRaw =
          loan.return_date || loan.returnDate || loan.returned_at;
        const returnDate = returnDateRaw ? formatDate(returnDateRaw) : null;

        const status = loan.status || "Tidak diketahui";
        const isActive = status.toLowerCase() === "active";
        const statusDisplay = isActive
          ? "Aktif (Dipinjam)"
          : "Sudah Dikembalikan";

        // Deteksi Peringatan Due Date (< 2 Hari)
        let isNearDue = false;
        if (isActive && rawDueDate) {
          const now = new Date();
          const dueTime = new Date(rawDueDate);
          const diffDays = (dueTime - now) / (1000 * 60 * 60 * 24);
          if (diffDays >= 0 && diffDays <= 2) {
            isNearDue = true;
          }
        }

        const returnInfoHTML = !isActive
          ? `<p><strong>Tanggal Dikembalikan:</strong> ${escapeHTML(String(returnDate || borrowDate))}</p>`
          : "";

        const returnButton = isActive
          ? `
            <button
              type="button"
              class="btn-return"
              data-loan-id="${escapeHTML(String(loan.loanId ?? loan.id))}"
              data-book-title="${escapeHTML(String(bookTitle))}"
            >
              Kembalikan Buku
            </button>
            `
          : "";

        const warningNotice = isNearDue
          ? `<p class="badge badge-warning" style="margin-top: 6px;">⚠️ Batas waktu pengembalian kurang dari 2 hari!</p>`
          : "";

        return `
          <article class="loan-card ${isNearDue ? "due-warning" : ""}">
            <h3>${escapeHTML(String(bookTitle))}</h3>
            <p><strong>Tanggal Pinjam:</strong> ${escapeHTML(String(borrowDate))}</p>
            <p><strong>Batas Tenggat (Deadline):</strong> ${escapeHTML(String(dueDate))}</p>
            ${returnInfoHTML}
            <p><strong>Status:</strong> <span class="badge ${isNearDue ? "badge-warning" : ""}">${escapeHTML(String(statusDisplay))}</span></p>
            ${warningNotice}
            ${returnButton}
          </article>
        `;
      })
      .join("");

    const returnButtons = loansListContainer.querySelectorAll(".btn-return");
    returnButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const loanId = button.dataset.loanId;
        const bookTitle = button.dataset.bookTitle || "buku ini";

        if (!loanId) {
          showMessage("ID peminjaman tidak ditemukan.", "error");
          return;
        }

        showConfirmModal(
          "Pengembalian Buku",
          `Apakah Anda yakin ingin mengembalikan "${bookTitle}" ke perpustakaan?`,
          async () => {
            button.disabled = true;
            button.textContent = "Memproses...";

            try {
              await returnLoan(loanId);
              showMessage("Buku berhasil dikembalikan.", "success");

              await loadBooks();
              await loadUserLoans();
            } catch (error) {
              showMessage(
                error.message || "Gagal mengembalikan buku.",
                "error",
              );
              if (button.isConnected) {
                button.disabled = false;
                button.textContent = "Kembalikan Buku";
              }
            }
          },
        );
      });
    });
  }

  // ==========================================
  // 11. CUSTOM CONFIRMATION MODAL HELPER
  // ==========================================

  function showConfirmModal(title, message, onConfirm) {
    const modal = document.getElementById("custom-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalMsg = document.getElementById("modal-message");
    const btnConfirm = document.getElementById("modal-btn-confirm");
    const btnCancel = document.getElementById("modal-btn-cancel");

    modalTitle.textContent = title;
    modalMsg.textContent = message;
    modal.classList.remove("hidden");

    // Clone node untuk menghapus listener lama
    const newConfirm = btnConfirm.cloneNode(true);
    const newCancel = btnCancel.cloneNode(true);
    btnConfirm.parentNode.replaceChild(newConfirm, btnConfirm);
    btnCancel.parentNode.replaceChild(newCancel, btnCancel);

    newConfirm.addEventListener("click", () => {
      modal.classList.add("hidden");
      onConfirm();
    });

    newCancel.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // ==========================================
  // 12. PESAN NOTIFIKASI DENGAN AUTO-CLOSE
  // ==========================================

  let messageTimer = null;

  function showMessage(message, type = "info") {
    if (messageTimer) clearTimeout(messageTimer);

    messageContainer.textContent = message;
    messageContainer.className = `message-box ${type}`;
    messageContainer.classList.remove("hidden");

    messageTimer = setTimeout(() => {
      hideMessage();
    }, 4000);
  }

  function hideMessage() {
    if (messageTimer) clearTimeout(messageTimer);
    messageContainer.textContent = "";
    messageContainer.className = "message-box hidden";
  }

  // ==========================================
  // 13. KEAMANAN & ESCAPE HTML
  // ==========================================

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================
  // 14. INISIALISASI APLIKASI
  // ==========================================

  initializeApp();
});
