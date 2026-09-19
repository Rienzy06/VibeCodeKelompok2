const app = require('./app');

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Book Service berjalan pada port ${PORT}`);
});