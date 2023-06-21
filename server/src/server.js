const express = require("express");
//const { MongoMemoryServer } = require("mongodb-memory-server");
const MONGO_ATLAS_URL = `mongodb+srv://jgtindreadm:jgtindreadm@tindre.ttxypph.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 3000;
const LINK_URL = "localhost";

const userRouter = require("./routes/Users.routes");

const setup = async () => {
  try {
    // se MongoMemoryServer
    // const mongoConnect = await MongoMemoryServer.create();
    //await mongoose.connect(`${mongoConnect.getUri()}tinder`);

    await mongoose.connect(MONGO_ATLAS_URL);
    console.log("You successfully connected to MongoDB!");

    const app = express();

    app.use(express.static("."));
    app.use(express.json());
    app.use(cors());

    app.use("/users", userRouter);

    app.get("/", (req, res) => {
      res.json({ message: "Welcome to tindre app!" });
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://${LINK_URL}:${PORT}`);
    });
  } catch (e) {
    console.log("Error on MongoDB conexion...", e);
  }
};

setup();
