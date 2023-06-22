const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();
require("process");

const secret = process.env.SECRET;

const authMiddleWare = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Access error" });
  }
  try {
    const tokenPayload = jwt.verify(token, secret);
    const user = await User.findById(tokenPayload.id);

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials!" });
    }

    req.currentUser = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: "Access error!" });
  }
};

module.exports = authMiddleWare;
