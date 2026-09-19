const { BOOK_SERVICE_URL } = require('../config/config');

async function getBookById(bookId) {
  try {
    const response = await fetch(`${BOOK_SERVICE_URL}/api/books/${bookId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 404) {
      return { success: false, statusCode: 404, message: 'Data buku tidak ditemukan.' };
    }

    if (!response.ok) {
      return { success: false, statusCode: response.status, message: 'Gagal mengambil data dari Book Service.' };
    }

    const data = await response.json();
    return { success: true, statusCode: 200, data };
  } catch (error) {
    return { success: false, statusCode: 500, message: 'Book Service tidak dapat diakses.' };
  }
}

async function updateBookStatus(bookId, status) {
  try {
    const response = await fetch(`${BOOK_SERVICE_URL}/api/books/${bookId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      return { success: false, statusCode: response.status };
    }

    return { success: true, statusCode: response.status };
  } catch (error) {
    return { success: false, statusCode: 500 };
  }
}

module.exports = {
  getBookById,
  updateBookStatus
};
