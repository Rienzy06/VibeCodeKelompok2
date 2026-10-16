const API_BASE_URL = "http://localhost:8000";

// ==========================================
// 1. MANAJEMEN TOKEN AUTENTIKASI
// ==========================================

function saveToken(token) {
  sessionStorage.setItem("auth_token", token);
}

function getToken() {
  return sessionStorage.getItem("auth_token");
}

function clearToken() {
  sessionStorage.removeItem("auth_token");
}

// ==========================================
// 2. LOGIN
// ==========================================

async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || "Login gagal.");
    }

    const token = result.data?.token;

    if (!token) {
      throw new Error("Token tidak ditemukan pada respons login.");
    }

    saveToken(token);

    return result.data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

// ==========================================
// 3. IDENTITAS PENGGUNA
// ==========================================

async function getCurrentUser() {
  const token = getToken();

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        clearToken();
      }

      throw new Error(result.message || "Gagal mengambil identitas pengguna.");
    }

    return result.data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

// ==========================================
// 4. LOGOUT
// ==========================================

async function logout() {
  const token = getToken();

  try {
    if (token) {
      const response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Logout dari server gagal.");
      }
    }
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  } finally {
    clearToken();
  }
}

// ==========================================
// 5. MENGAMBIL DAFTAR BUKU
// ==========================================

async function getBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books`, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.message ||
          `Gagal mengambil data buku (Status: ${response.status})`,
      );
    }

    return result.data || [];
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

// ==========================================
// 6. MEMINJAM BUKU
// ==========================================

async function createLoan(bookId) {
  const token = getToken();

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/loans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        bookId,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        clearToken();
        throw new Error("Sesi login berakhir. Silakan login kembali.");
      }

      if (result.code === "MAX_LIMIT_REACHED") {
        throw new Error(
          "Anda sudah mencapai batas maksimal peminjaman (3 buku).",
        );
      }

      if (result.code === "BOOK_NOT_AVAILABLE") {
        throw new Error("Buku ini tidak tersedia untuk dipinjam.");
      }

      if (result.code === "RESOURCE_NOT_FOUND") {
        throw new Error("Buku yang dipilih tidak ditemukan.");
      }

      throw new Error(result.message || "Gagal melakukan peminjaman buku.");
    }

    return result.data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

// ==========================================
// 7. MENGAMBIL RIWAYAT PEMINJAMAN SENDIRI
// ==========================================

async function getMyLoans() {
  const token = getToken();

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/loans/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        clearToken();
        throw new Error("Sesi login berakhir. Silakan login kembali.");
      }

      throw new Error(
        result.message ||
          `Gagal mengambil riwayat peminjaman (Status: ${response.status})`,
      );
    }

    return (result.data || []).map((loan) => ({
      loanId: loan.id,
      userId: loan.user_id,
      bookId: loan.book_id,
      bookTitle: loan.book_title || loan.title || null,
      borrowDate: loan.borrow_date,
      dueDate: loan.due_date,
      status: loan.status,
    }));
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

// ==========================================
// 8. MENGAMBIL RIWAYAT BERDASARKAN USER ID
// ==========================================

async function getUserLoans(userId) {
  const token = getToken();

  if (!token) {
    throw new Error("Silakan login terlebih dahulu.");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/loans/user/${encodeURIComponent(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        clearToken();
        throw new Error("Sesi login berakhir. Silakan login kembali.");
      }

      throw new Error(
        result.message ||
          `Gagal mengambil riwayat peminjaman (Status: ${response.status})`,
      );
    }

    return (result.data || []).map((loan) => ({
      loanId: loan.id,
      userId: loan.user_id,
      bookId: loan.book_id,
      bookTitle: loan.book_title || loan.title || null,
      borrowDate: loan.borrow_date,
      dueDate: loan.due_date,
      status: loan.status,
    }));
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}
