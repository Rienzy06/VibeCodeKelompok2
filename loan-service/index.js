const app = require('./src/app');
const { PORT } = require('./src/config/config');

app.listen(PORT, () => {
  console.log(`Loan Service running on port ${PORT}`);
});