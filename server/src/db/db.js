const mongoose = require("mongoose");

require("dotenv").config();
const currentEnv = process.env;

//const { MongoMemoryServer } = require("mongodb-memory-server");

const { DB_PROTOCOL, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_OPTIONS } =
  currentEnv;
const URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;
let db;

module.exports = {
  connect: async () => {
    try {
      // if want MongoMemoryServer:
      // const mongoConnect = await MongoMemoryServer.create();
      //db = await mongoose.connect(`${mongoConnect.getUri()}tinder`);

      db = await mongoose.connect(URI);
      console.log("You successfully connected on MongoDB!");
    } catch (error) {
      console.log("\n");
      console.log(" Error to connect on MongoDB: " + error);
    }
  },

  getDB: () => db,
};
