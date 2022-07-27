const express = require("express");
const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();

const app = express();

const superherosRouter = require("./routes/api/superheroes");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/superheroes", superherosRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
