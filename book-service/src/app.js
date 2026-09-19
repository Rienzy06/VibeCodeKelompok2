const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());

app.use('/api', bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

module.exports = app;