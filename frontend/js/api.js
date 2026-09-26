const API_BASE_URL = "http://localhost:8000";

/**
 * Mengambil daftar seluruh buku dari Lumen API.
 */
async function getBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books`);

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.message ||
          `Gagal mengambil data buku (Status: ${response.status})`,
      );
    }

    return result.data || [];
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

/**
 * Mengirimkan permintaan peminjaman buku ke Lumen API.
 * @param {string} userId
 * @param {string|number} bookId
 */
async function createLoan(userId, bookId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/loans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, bookId }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
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
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}

/**
 * Mengambil riwayat peminjaman pengguna dari Lumen API.
 * @param {string} userId
 */
async function getUserLoans(userId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/loans/user/${encodeURIComponent(userId)}`,
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.message ||
          `Gagal mengambil riwayat peminjaman (Status: ${response.status})`,
      );
    }

    return (result.data || []).map((loan) => ({
      loanId: loan.id,
      userId: loan.user_id,
      bookId: loan.book_id,
      borrowDate: loan.borrow_date,
      dueDate: loan.due_date,
      status: loan.status,
    }));
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Lumen Service sedang berjalan.",
      );
    }

    throw error;
  }
}
