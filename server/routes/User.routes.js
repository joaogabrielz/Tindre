const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/User");
const authMiddleWare = require("../middlewares/auth.middleware");

const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const jwt = require("jsonwebtoken");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

const secret = "UH@3vs,MEd,3lqLDQkb')[}J";

router.post("/sign-up", async (req, res) => {
  let { email, password } = req.body;


  let user = await User.create({
    email,
    password,
    profile: {
      firstname: "",
      lastname: "",
      birthday: new Date(),
      profile_pic: "",
      interests: [],
    },
  });

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    secret
  );

  // console.log(user); //

  res.json({ token: token });
});

router.post("/sign-in", async (req, res) => {
  let { email, password } = req.body;

  password = Base64.stringify(sha256(password));

  const userLoggedIn = await User.findOne({ email, password });

  if (userLoggedIn) {
    const token = jwt.sign(
      {
        email: userLoggedIn.email,
        id: userLoggedIn._id,
      },
      secret
    );

   // console.log(userLoggedIn); //

    return res.send({ token: token });
  }

  res.status(401).json({ error: "Invalid Credentials" });
});

router.put("/me", authMiddleWare, upload.single("avatar"), async (req, res) => {
  // ^router.put("/:id" - precisa do id? se ja tem req.userLoggedIn perguntar prof.. so visual..?
  // ou do me, nao servindo pra nd

  let userAuth = req.userLoggedIn;

    let { firstname, lastname, birthday, interests } =
      req.body;

    if(!firstname && !lastname && !birthday && !interests){
      res.json({ error: "Faltando credenciais!" });
    }
  
    if (firstname) {
      userAuth.profile.firstname = firstname;
    }
    if (lastname) {
      userAuth.profile.lastname = lastname;
    }
    if (birthday) {
      const formatedDate = new Date(birthday);
      userAuth.profile.birthday = formatedDate;
    }
    if (req?.file && req?.file?.path) {
      userAuth.profile.profile_pic =  `http://localhost:3000/${req.file.path}`;
    }
    if (interests) {
      userAuth.profile.interests = interests;
    }
  
    await userAuth.save();
 
    res.json({ data: userAuth.profile });
    //res.json({ data: "Perfil atualizado!" }); 

});

router.post("", authMiddleWare, async (req, res) => {
  const users = await User.find({
    _id: { $ne: userLoggedInId },
  });

  //const withoutLoggedUser = users.filter(user => user._id !== req.userLoggedIn._id);

  res.json({ users: users });
});

module.exports = router;