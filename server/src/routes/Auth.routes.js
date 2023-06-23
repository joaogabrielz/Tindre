const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/User");

const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const jwt = require("jsonwebtoken");

require("dotenv").config();
require("process");

const secret = process.env.SECRET;

router.post("/sign-up", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing Credencials!" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists!" });
    }

    const user = await User.create({
      email,
      password,
      profile: {
        firstname: "",
        lastname: "",
        birthday: "",
        profile_pic: "",
        interests: [],
        gender: "",
      },
    });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      secret
    );

    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing Credencials!" });
    }

    password = Base64.stringify(sha256(password));

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      secret
    );

    return res.status(200).send({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ops something went wrong.." });
  }
});

module.exports = router;
