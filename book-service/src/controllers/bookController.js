const fs = require('fs').promises;
const path = require('path');

const booksFilePath = path.join(__dirname, '../../data/books.json');

async function readBooks() {
  const data = await fs.readFile(booksFilePath, 'utf-8');
  return JSON.parse(data);
}

async function writeBooks(books) {
  await fs.writeFile(
    booksFilePath,
    JSON.stringify(books, null, 2),
    'utf-8'
  );
}

exports.getAllBooks = async (req, res) => {
  try {
    const books = await readBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal membaca data buku'
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await readBooks();
    const book = books.find((b) => b.id === id);

    if (!book) {
      return res.status(404).json({
        message: 'Buku tidak ditemukan'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal membaca data buku'
    });
  }
};

exports.updateBookStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !status ||
      (status !== 'available' && status !== 'borrowed')
    ) {
      return res.status(400).json({
        message: 'Status harus "available" atau "borrowed"'
      });
    }

    const books = await readBooks();
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        message: 'Buku tidak ditemukan'
      });
    }

    books[bookIndex].status = status;

    await writeBooks(books);

    return res.status(200).json(books[bookIndex]);
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal memperbarui status buku'
    });
  }
};