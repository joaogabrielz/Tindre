const express = require("express");
const app = express();
const cors = require("cors");

const authRouter = require("./routes/Auth.routes");
const userRouter = require("./routes/Users.routes");

const db = require('./db/db');

const setup = () => {
  db.connect();

  app.use(express.static("."));
  app.use(express.json());
  app.use(cors());

  app.use("/users", authRouter);
  app.use("/users", userRouter);

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to tindre app!" });
  });
};
setup();

module.exports = app;