const loanService = require('../services/loanService');

async function createLoanHandler(req, res) {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        status: 'error',
        code: 'BAD_REQUEST',
        message: 'Gagal: userId dan bookId wajib diisi.'
      });
    }

    const result = await loanService.createLoan(userId, bookId);
    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Terjadi kesalahan internal pada server.'
    });
  }
}

async function getLoansByUserHandler(req, res) {
  try {
    const { userId } = req.params;
    const loans = await loanService.getLoansByUserId(userId);
    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Terjadi kesalahan internal pada server.'
    });
  }
}

module.exports = {
  createLoanHandler,
  getLoansByUserHandler
};
