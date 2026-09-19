const express = require("express");
const cors = require("cors");
const {
  createLoanHandler,
  getLoansByUserHandler,
} = require("./controllers/loanController");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

app.use(express.json());

app.post("/api/loans", createLoanHandler);
app.get("/api/loans/user/:userId", getLoansByUserHandler);

module.exports = app;
