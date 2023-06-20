const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/User");
const Match = require("../models/Match");
const Deslike = require("../models/Deslike");
const authMiddleWare = require("../middlewares/auth.middleware");

const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const secret = "UH@3vs,MEd,3lqLDQkb')[}J";

router.post("/sign-up", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.create({
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

    res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
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

      return res.send({ token: token });
    }

    res.status(401).json({ error: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong.." });
  }
});

router.put("/me", authMiddleWare, upload.single("avatar"), async (req, res) => {
  // ^router.put("/:id" - precisa do id? se ja tem req.userLoggedIn perguntar prof.. so visual..?
  // ou do me, nao servindo pra nd

  try {
    let userAuth = req.userLoggedIn;

    let { firstname, lastname, birthday, gender, interests } = req.body;

    if (!firstname && !lastname && !birthday && !gender && !interests) {
      res.json({ error: "Missing credentials!" });
    }

    if (firstname) {
      userAuth.profile.firstname = firstname;
    }
    if (lastname) {
      userAuth.profile.lastname = lastname;
    }
    if (birthday) {
      const formatedDate = new Date(birthday).toISOString();
      userAuth.profile.birthday = formatedDate;
    }
    if (req?.file && req?.file?.path) {
      userAuth.profile.profile_pic = `http://localhost:3000/${req.file.path}`;
    }
    if (gender) {
      userAuth.profile.gender = gender;
    }
    if (interests) {
      if (typeof interests === "object") {
        userAuth.profile.interests = interests;
      } else {
        const interestsParse = JSON.parse(interests);
        userAuth.profile.interests = interestsParse;
      }
    }

    await userAuth.save();

    res.json({ data: "Updated profile!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong.." });
  }
});

router.get("/me", authMiddleWare, async (req, res) => {
  try {
    const payload = {
      id: req.userLoggedIn._id,
      email: req.userLoggedIn.email,
      profile: req.userLoggedIn.profile,
      matches: req.userLoggedIn.matches,
      deslikes: req.userLoggedIn.deslikes,
    };
    res.json({ user: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.get("", authMiddleWare, async (req, res) => {
  try {
    const userAuth = req.userLoggedIn;
    const loggedInUserId = req.userLoggedIn._id;
    const interests = req.userLoggedIn.profile.interests;

    const deslikesToDelete = [];
    const totalUsersCount = await User.countDocuments({
      _id: { $ne: loggedInUserId },
    });

    // if (userAuth.matches && userAuth.matches.length > 0) {
    //   // const userMatchesCount = userAuth.matches ? userAuth.matches.length : 0;

    //   if (userAuth.matches.length === totalUsersCount) {
    //     return res.json({ users: [] });
    //   }
    // }

    if (userAuth.deslikes && userAuth.deslikes.length > 0) {
      if (userAuth.deslikes.length === totalUsersCount) {
        return res.json({ users: [] });
      }

      for (const deslikeId of userAuth.deslikes) {
        const deslike = await Deslike.findOne({
          userId: userAuth._id,
          targetUserId: deslikeId,
        });
        if (deslike) {
          const deslikeDate = new Date(deslike.date);
          const currentTime = new Date();

          if (currentTime - deslikeDate >= 86400000) {
            //24hrs //60000 1min // erase !
            deslikesToDelete.push(deslikeId);
          }
        }
      }
    }
    if (deslikesToDelete.length > 0) {
      userAuth.deslikes = userAuth.deslikes.filter(
        (deslikeId) => !deslikesToDelete.includes(deslikeId)
      );
      await userAuth.save();
    }

    let users = [];

    const query = {
      _id: { $ne: loggedInUserId },
    };


    if (userAuth.deslikes && userAuth.deslikes.length > 0) {
      query["_id"] = {
        $nin: [...userAuth.deslikes, loggedInUserId],
      };
    }

    if (userAuth.matches && userAuth.matches.length > 0) {
      query["matches"] = { $nin: [loggedInUserId] };
    }

    let usersSameInterests = null;

    if (interests && interests.length > 0) {
      query["profile.interests"] = { $in: interests };
      usersSameInterests = await User.find(query, {
        profile: 1,
        email: 1,
      });
    }

    if (!usersSameInterests || usersSameInterests.length === 0) {
      delete query["profile.interests"];
      users = await User.find(query, {
        profile: 1,
        email: 1,
      });

    } else {
      //users = usersSameInterests;
      users = usersSameInterests.filter((user) => {
        const matchExists = userAuth.matches.includes(user._id.toString());
        return !matchExists; // retira se ja dei like, mas tem mesmos interesses
      }); 
      if (users.length === 0) {
        delete query["profile.interests"];
        users = await User.find(query, {
          profile: 1,
          email: 1,
        }); // se ja dei like, e tem os mesmso interesses n vier ngm, busca todos..
      }
    }
    // console.log("last"); // erase
    // console.log(query); // erase

    res.json({ users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.post("/:id/matches", authMiddleWare, async (req, res) => {
  try {
    const userAuth = req.userLoggedIn;
    const userToLike = await User.findById(req.params.id);
    if (userToLike) {
      const matchExists = userAuth.matches.some((match) =>
        match.equals(userToLike._id)
      );

      if (!matchExists) {
        await Match.create({
          userId: userAuth._id,
          targetUserId: userToLike._id,
        });

        userAuth.matches.push(userToLike._id);
        await userAuth.save();
      }

      const userToLikeLikedMe = await Match.findOne({
        userId: userToLike._id,
        targetUserId: userAuth._id,
      });

      if (userToLikeLikedMe) {
        return res.json({ match: true });
      }

      return res.json({ message: "Like created successfully" });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.get("/me/matches", authMiddleWare, async (req, res) => {
  try {
    const userAuthId = req.userLoggedIn._id;
    const matchesByAuthUser = await Match.find({ userId: userAuthId });

    const targetUserIds = matchesByAuthUser.map((match) => match.targetUserId);

    const matchedUsers = await User.find({
      _id: { $in: targetUserIds },
      matches: { $in: [userAuthId] },
    }).select("id email profile");

    res.json({ likes: targetUserIds, matches: matchedUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.post("/:id/deslikes", authMiddleWare, async (req, res) => {
  try {
    const userAuth = req.userLoggedIn;
    const userToDeslike = await User.findById(req.params.id);
    if (userToDeslike) {
      const deslikeExists = userAuth.deslikes.some(
        (deslikeId) => deslikeId.toString() === userToDeslike._id.toString()
      );

      if (!deslikeExists) {
        await Deslike.create({
          userId: userAuth._id,
          targetUserId: userToDeslike._id,
          date: new Date(),
        });

        userAuth.deslikes.push(userToDeslike._id);
        await userAuth.save();
      }

      return res.json({ message: "Deslike created successfully" });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ops something went wrong." });
  }
});

module.exports = router;
