const fs = require('fs').promises;
const path = require('path');
const { LOANS_FILE_PATH } = require('../config/config');

async function ensureFileExists() {
  try {
    await fs.access(LOANS_FILE_PATH);
  } catch (error) {
    const dir = path.dirname(LOANS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(LOANS_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

async function readLoans() {
  await ensureFileExists();
  try {
    const data = await fs.readFile(LOANS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeLoans(loans) {
  await ensureFileExists();
  await fs.writeFile(LOANS_FILE_PATH, JSON.stringify(loans, null, 2), 'utf-8');
}

module.exports = {
  readLoans,
  writeLoans
};