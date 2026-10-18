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
  const loginCardWrapper = document.getElementById("login-card-wrapper");
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

  // Elemen buku dan peminjaman
  const booksListContainer = document.getElementById("books-list");
  const loansListContainer = document.getElementById("loans-list");

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
      showMessage("Login berhasil.", "success");
    } catch (error) {
      clearToken();
      showLogin();

      showMessage(error.message || "Login gagal.", "error");
    } finally {
      btnLogin.disabled = false;
      btnLogin.textContent = "Login";
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
            result.message || "Registrasi berhasil. Silakan login.",
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
        btnRegister.textContent = "Daftar Akun";
      }
    });
  }

  // ==========================================
  // 4. LOGOUT
  // ==========================================

  btnLogout.addEventListener("click", async () => {
    hideMessage();

    btnLogout.disabled = true;
    btnLogout.textContent = "Memproses...";

    try {
      await logout();

      showLogin();

      currentUsername.textContent = "";
      booksListContainer.innerHTML = `
        <p class="info-text">Silakan login untuk melihat daftar buku.</p>
      `;

      loansListContainer.innerHTML = `
        <p class="info-text">
          Silakan login untuk melihat riwayat peminjaman.
        </p>
      `;

      showMessage("Logout berhasil.", "success");
    } catch (error) {
      showMessage(error.message || "Logout gagal.", "error");
    } finally {
      btnLogout.disabled = false;
      btnLogout.textContent = "Logout";
    }
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
    booksListContainer.innerHTML = `
      <p class="loading-text">Memuat daftar buku...</p>
    `;

    try {
      const books = await getBooks();
      renderBooks(books);
    } catch (error) {
      booksListContainer.innerHTML = `
        <p class="empty-text">
          Gagal memuat daftar buku.
        </p>
      `;

      showMessage(error.message, "error");
    }
  }

  // ==========================================
  // 7. MENAMPILKAN DAFTAR BUKU
  // ==========================================

  function renderBooks(books) {
    if (!Array.isArray(books) || books.length === 0) {
      booksListContainer.innerHTML = `
        <p class="empty-text">Belum ada buku yang tersedia.</p>
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

        const statusText = available ? "Tersedia" : "Tidak tersedia";

        return `
          <article class="book-card">
            <h3>${escapeHtml(title)}</h3>

            <p>
              <strong>Penulis:</strong>
              ${escapeHtml(author)}
            </p>

            <p>
              <strong>Status:</strong>
              <span class="${available ? "status-available" : "status-unavailable"}">
                ${statusText}
              </span>
            </p>

            <button
              type="button"
              class="btn-borrow"
              data-book-id="${escapeHtml(String(bookId))}"
              ${available ? "" : "disabled"}
            >
              ${available ? "Pinjam Buku" : "Tidak Tersedia"}
            </button>
          </article>
        `;
      })
      .join("");

    const borrowButtons = booksListContainer.querySelectorAll(".btn-borrow");

    borrowButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = button.dataset.bookId;

        handleBorrowBook(bookId, button);
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
      showMessage("Silakan login terlebih dahulu.", "error");
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
  // 9. MEMUAT RIWAYAT PEMINJAMAN
  // ==========================================

  async function loadUserLoans() {
    if (!getToken()) {
      loansListContainer.innerHTML = `
        <p class="info-text">
          Silakan login untuk melihat riwayat peminjaman.
        </p>
      `;
      return;
    }

    loansListContainer.innerHTML = `
      <p class="loading-text">Memuat riwayat peminjaman...</p>
    `;

    try {
      const loans = await getMyLoans();

      renderLoans(loans);
    } catch (error) {
      loansListContainer.innerHTML = `
        <p class="empty-text">
          Gagal memuat riwayat peminjaman.
        </p>
      `;

      showMessage(error.message || "Gagal memuat riwayat peminjaman.", "error");
    }
  }

  // ==========================================
  // 10. MENAMPILKAN RIWAYAT PEMINJAMAN
  // ==========================================

  function renderLoans(loans) {
    if (!Array.isArray(loans) || loans.length === 0) {
      loansListContainer.innerHTML = `
        <p class="empty-text">
          Belum ada riwayat peminjaman.
        </p>
      `;
      return;
    }

    loansListContainer.innerHTML = loans
      .map((loan) => {
        const bookTitle =
          loan.book_title ||
          loan.title ||
          `Buku ID ${loan.book_id ?? loan.bookId ?? "-"}`;

        const borrowDate = loan.borrow_date || loan.borrowDate || "-";

        const dueDate = loan.due_date || loan.dueDate || "-";

        const status = loan.status || "Tidak diketahui";

        const isActive = status.toLowerCase() === "active";

        const returnButton = isActive
          ? `
          <button
            type="button"
            class="btn-return"
            data-loan-id="${escapeHTML(String(loan.loanId ?? loan.id))}"
          >
            Kembalikan Buku
          </button>
          `
          : "";

        return `
          <article class="loan-card">
            <h3>${escapeHTML(String(bookTitle))}</h3>

            <p>
              <strong>Tanggal Pinjam:</strong>
              ${escapeHTML(String(borrowDate))}
            </p>

            <p>
              <strong>Tenggat Pengembalian:</strong>
              ${escapeHTML(String(dueDate))}
            </p>

            <p>
              <strong>Status:</strong>
              ${escapeHTML(String(status))}
            </p>

            ${returnButton}
          </article>
        `;
      })
      .join("");

    const returnButtons = loansListContainer.querySelectorAll(".btn-return");

    returnButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const loanId = button.dataset.loanId;

        if (!loanId) {
          showMessage("ID peminjaman tidak ditemukan.", "error");
          return;
        }

        const confirmed = window.confirm(
          "Apakah kamu yakin ingin mengembalikan buku ini?",
        );

        if (!confirmed) {
          return;
        }

        button.disabled = true;
        button.textContent = "Memproses...";

        try {
          await returnLoan(loanId);

          showMessage("Buku berhasil dikembalikan.", "success");

          await loadBooks();
          await loadUserLoans();
        } catch (error) {
          showMessage(error.message || "Gagal mengembalikan buku.", "error");

          if (button.isConnected) {
            button.disabled = false;
            button.textContent = "Kembalikan Buku";
          }
        }
      });
    });
  }

  // ==========================================
  // 11. PESAN NOTIFIKASI
  // ==========================================

  function showMessage(message, type = "info") {
    messageContainer.textContent = message;
    messageContainer.className = `message-box ${type}`;
    messageContainer.classList.remove("hidden");
  }

  function hideMessage() {
    messageContainer.textContent = "";
    messageContainer.className = "message-box hidden";
  }

  // ==========================================
  // 12. MENCEGAH HTML INJECTION
  // ==========================================

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ==========================================
  // 13. escapeHTML (untuk keamanan tambahan)
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
