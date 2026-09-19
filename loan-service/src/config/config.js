const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3002,
  BOOK_SERVICE_URL: process.env.BOOK_SERVICE_URL || 'http://localhost:3001',
  LOANS_FILE_PATH: path.join(__dirname, '../../data/loans.json')
};
