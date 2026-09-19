const { readLoans, writeLoans } = require('../utils/fileHandler');
const { getBookById, updateBookStatus } = require('./bookService');

async function createLoan(userId, bookId) {
  // 1. Baca data loans.json
  const loans = await readLoans();

  // 2. Hitung jumlah loan aktif milik userId
  const activeLoansCount = loans.filter(
    (loan) => loan.userId === userId && loan.status === 'active'
  ).length;

  if (activeLoansCount >= 3) {
    return {
      status: 400,
      body: {
        status: 'error',
        code: 'MAX_LIMIT_REACHED',
        message: 'Gagal: Anda sudah mencapai batas maksimal peminjaman (3 buku).'
      }
    };
  }

  // 3. Panggil Book Service untuk mengecek ketersediaan buku
  const bookResult = await getBookById(bookId);

  if (!bookResult.success) {
    if (bookResult.statusCode === 404) {
      return {
        status: 404,
        body: {
          status: 'error',
          code: 'RESOURCE_NOT_FOUND',
          message: 'Data buku tidak ditemukan.'
        }
      };
    }
    return {
      status: 500,
      body: {
        status: 'error',
        code: 'BOOK_SERVICE_UNAVAILABLE',
        message: bookResult.message
      }
    };
  }

  const bookData = bookResult.data.data || bookResult.data;
  if (bookData.status !== 'available') {
    return {
      status: 400,
      body: {
        status: 'error',
        code: 'BOOK_NOT_AVAILABLE',
        message: 'Gagal: Buku sedang dipinjam atau tidak tersedia.'
      }
    };
  }

  // 4. Kalkulasi tanggal dan buat data transaksi peminjaman
  const now = new Date();
  const borrowDateObj = new Date(now);
  const dueDateObj = new Date(now);
  dueDateObj.setDate(dueDateObj.getDate() + 7);

  const loanId = `loan-${Date.now()}`;
  const newLoan = {
    loanId,
    userId,
    bookId,
    borrowDate: borrowDateObj.toISOString(),
    dueDate: dueDateObj.toISOString(),
    status: 'active'
  };

  // 5. Simpan transaksi sementara ke loans.json
  loans.push(newLoan);
  await writeLoans(loans);

  // 6. Minta Book Service untuk mengubah status buku menjadi "borrowed"
  const patchResult = await updateBookStatus(bookId, 'borrowed');

  // 7. Jika PATCH gagal, lakukan Compensating Action / Rollback
  if (!patchResult.success) {
    const currentLoans = await readLoans();
    const updatedLoans = currentLoans.filter((loan) => loan.loanId !== loanId);
    await writeLoans(updatedLoans);

    return {
      status: 500,
      body: {
        status: 'error',
        code: 'SYNC_FAILED_ROLLBACK',
        message: 'Gagal sinkronisasi status buku. Transaksi peminjaman dibatalkan (rollback).'
      }
    };
  }

  // 8. Berhasil
  return {
    status: 201,
    body: {
      status: 'success',
      message: 'Buku berhasil dipinjam.',
      data: newLoan
    }
  };
}

async function getLoansByUserId(userId) {
  const loans = await readLoans();
  const userLoans = loans.filter((loan) => loan.userId === userId);
  return userLoans;
}

module.exports = {
  createLoan,
  getLoansByUserId
};