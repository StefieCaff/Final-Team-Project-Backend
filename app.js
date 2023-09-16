const express = require('express');
const { session, sess } = require('./middlewares');
const logger = require('morgan');
const cors = require('cors');
const { caloriesRouter, userRouter, foodRouter } = require('./routes/api');
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.static('public'))
app.use(session(sess));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api", caloriesRouter, userRouter, foodRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Hey there! Server is running" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// http://localhost:5000/api