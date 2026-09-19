const express = require('express');
const { createLoanHandler, getLoansByUserHandler } = require('./controllers/loanController');

const app = express();

app.use(express.json());

app.post('/api/loans', createLoanHandler);
app.get('/api/loans/user/:userId', getLoansByUserHandler);

module.exports = app;