const express = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server");
// Trade when i back home, to MongoDB Atlas
const mongoose = require("mongoose");
const cors = require("cors")

const PORT = 3000;
const LINK_URL = "localhost";

const userRouter = require("./routes/Users.routes");
//const matchRouter = require("./routes/Matches.routes");
const authMiddleWare = require("../src/middlewares/auth.middleware");

const setup = async () => {
    try {
        const mongoConnect = await MongoMemoryServer.create();
        await mongoose.connect(`${mongoConnect.getUri()}tinder`);

        const app = express();
        
        app.use(express.static('.'))
        app.use(express.json());
        app.use(cors());
    
        
        app.use("/users", userRouter);
        //app.use("/users/:id/match", authMiddleWare, matchRouter);
        // app.use("/posts", postRouter);


        app.get("/", (req, res) => {
            res.json({message: "Welcome to tindre app!"});
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://${LINK_URL}:${PORT}`);
        })
    } catch(e){
        console.log("Error on MongoDB conexion...", e);
    }
}

setup();