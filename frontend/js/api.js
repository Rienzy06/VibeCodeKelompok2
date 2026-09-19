const BOOK_SERVICE_URL = "http://localhost:3001";
const LOAN_SERVICE_URL = "http://localhost:3002";

/**
 * Mengambil daftar seluruh buku dari Book Service.
 */
async function getBooks() {
  try {
    const response = await fetch(`${BOOK_SERVICE_URL}/api/books`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Gagal mengambil data buku (Status: ${response.status})`,
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Book Service dan Loan Service sedang berjalan.",
      );
    }
    throw error;
  }
}

/**
 * Mengirimkan permintaan peminjaman buku ke Loan Service.
 * @param {string} userId
 * @param {string} bookId
 */
async function createLoan(userId, bookId) {
  try {
    const response = await fetch(`${LOAN_SERVICE_URL}/api/loans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, bookId }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Pemetaan pesan error ramah pengguna jika backend mengirimkan kode error terstruktur
      if (data.code === "MAX_LIMIT_REACHED") {
        throw new Error(
          "Anda sudah mencapai batas maksimal peminjaman (3 buku).",
        );
      }
      if (data.code === "BOOK_NOT_AVAILABLE") {
        throw new Error("Buku ini tidak tersedia untuk dipinjam.");
      }

      throw new Error(data.message || "Gagal melakukan peminjaman buku.");
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Book Service dan Loan Service sedang berjalan.",
      );
    }
    throw error;
  }
}

/**
 * Mengambil riwayat peminjaman milik pengguna berdasarkan userId dari Loan Service.
 * @param {string} userId
 */
async function getUserLoans(userId) {
  try {
    const response = await fetch(
      `${LOAN_SERVICE_URL}/api/loans/user/${encodeURIComponent(userId)}`,
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Gagal mengambil riwayat peminjaman (Status: ${response.status})`,
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Gagal terhubung ke layanan. Pastikan Book Service dan Loan Service sedang berjalan.",
      );
    }
    throw error;
  }
}
