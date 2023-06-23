const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/User");
const Match = require("../models/Match");
const Deslike = require("../models/Deslike");
const authMiddleWare = require("../middlewares/auth.middleware");
const UsersService = require("../services/Users.service");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");

router.put(
  "/:id",
  authMiddleWare,
  upload.single("avatar"),
  async (req, res) => {
    if (req.params.id == "me") {
      try {
        const userAuth = req.currentUser;

        const { firstname, lastname, birthday, gender, interests } = req.body;

        if (!firstname && !lastname && !birthday && !gender && !interests) {
          return res.json({ error: "Missing information!" });
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
        if (req.file && req.file.path) {
          userAuth.profile.profile_pic = `${req.protocol}://${req.get(
            "host"
          )}/${path.basename(req.file.path)}`;
        }
        if (gender) {
          userAuth.profile.gender = gender;
        }
        if (interests) {
          const parsedInterests = Array.isArray(interests)
            ? interests
            : JSON.parse(interests);
          userAuth.profile.interests = parsedInterests;
        }

        await userAuth.save();

        return res.json({ message: "Updated profile!" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Ops something went wrong.." });
      }
    }
  }
);

router.get("", authMiddleWare, async (req, res) => {
  if (req.query.user && req.query.user == "me") {
    try {
      const { _id, email, profile, matches, deslikes } = req.currentUser;

      const payload = {
        id: _id,
        email,
        profile,
        matches,
        deslikes,
      };

      return res.json({ user: payload });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Ops something went wrong." });
    }
  } else {
    try {
      let response = await UsersService.getUsers(req.currentUser);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Ops something went wrong." });
    }
  }
});

router.get("/:id/matches", authMiddleWare, async (req, res) => {
  if (req.params.id == "me") {
    try {
      const userAuthId = req.currentUser._id;
      const matchesByAuthUser = await Match.find({ userId: userAuthId });

      const targetUserIds = matchesByAuthUser.map(
        (match) => match.targetUserId
      );

      const matchedUsers = await User.find({
        _id: { $in: targetUserIds },
        matches: { $in: [userAuthId] },
      }).select("id email profile");

      return res.json({ likes: targetUserIds, matches: matchedUsers });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Ops something went wrong." });
    }
  } else {
    return res.status(400).json({ error: "Invalid parameter value" });
  }
});

router.post("/:id/matches", authMiddleWare, async (req, res) => {
  try {
    const authenticatedUser = req.currentUser;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const matchId = targetUser._id;
    const matchExistsInArray = authenticatedUser.matches.includes(matchId);
    const matchExistsInTable = await Match.exists({
      userId: authenticatedUser._id,
      targetUserId: matchId,
    });

    if (matchExistsInArray || matchExistsInTable) {
      return res.json({ match: false, message: "Like already created" });
    }

    await Match.create({
      userId: authenticatedUser._id,
      targetUserId: matchId,
    });

    authenticatedUser.matches.push(matchId);
    await authenticatedUser.save();

    const targetUserLikedMe = await Match.exists({
      userId: targetUser._id,
      targetUserId: authenticatedUser._id,
    });

    if (targetUserLikedMe) {
      return res.json({ match: true, message: "Match created successfully" });
    }

    return res.json({ match: false, message: "Like created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ops something went wrong." });
  }
});

router.post("/:id/deslikes", authMiddleWare, async (req, res) => {
  try {
    const authenticatedUser = req.currentUser;
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const deslikeId = targetUser._id;
    const deslikeExistsInArray = authenticatedUser.deslikes.includes(deslikeId);
    const deslikeExistsInTable = await Deslike.exists({
      userId: authenticatedUser._id,
      targetUserId: deslikeId,
    });

    if (deslikeExistsInArray || deslikeExistsInTable) {
      return res.json({ message: "Deslike already created" });
    }

    await Deslike.create({
      userId: authenticatedUser._id,
      targetUserId: targetUser._id,
      date: new Date(),
    });

    authenticatedUser.deslikes.push(targetUser._id);
    await authenticatedUser.save();
    return res.json({ message: "Deslike created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Ops something went wrong." });
  }
});

module.exports = router;
