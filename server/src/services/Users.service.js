const User = require("../models/User");
const Deslike = require("../models/Deslike");

module.exports = {
  getUsers: async (currentUser) => {
    try {
      const userAuth = currentUser;
      const loggedInUserId = currentUser._id;
      const interests = currentUser.profile.interests;
      let hasDeslike = false;

      const deslikesToDelete = [];
      const totalUsersCount = await User.countDocuments({
        _id: { $ne: loggedInUserId },
      });

      const query = {
        _id: { $ne: loggedInUserId },
      };

      if (userAuth.deslikes && userAuth.deslikes.length > 0) {
        if (userAuth.deslikes.length === totalUsersCount) {
          return { users: [] };
        }

        query["_id"] = {
          $nin: [...userAuth.deslikes, loggedInUserId],
        };

        hasDeslike = true;

        for (const deslikeId of userAuth.deslikes) {
          const deslike = await Deslike.findOne({
            userId: loggedInUserId,
            targetUserId: deslikeId,
          });
          if (deslike) {
            const deslikeDate = new Date(deslike.date);
            const currentTime = new Date();

            if (currentTime - deslikeDate >= 86400000) {
              deslikesToDelete.push(deslikeId);
            }
          }
        }
      }

      if (deslikesToDelete.length > 0) {
        const deletePromises = deslikesToDelete.map((deslikeId) =>
          Deslike.deleteOne({
            userId: loggedInUserId,
            targetUserId: deslikeId,
          })
        );
        await Promise.all(deletePromises);

        userAuth.deslikes = userAuth.deslikes.filter(
          (deslikeId) => !deslikesToDelete.includes(deslikeId)
        );

        await userAuth.save();
      }

      let users = [];

      if (userAuth.matches && userAuth.matches.length > 0 && !hasDeslike) {
        query["_id"] = {
          $nin: [...userAuth.matches, loggedInUserId],
        };
      } else {
        query["_id"] = {
          $nin: [...userAuth.matches, ...userAuth.deslikes, loggedInUserId],
        };
      }

      const userAuthGender = currentUser.profile?.gender;
      const man = "man";
      const woman = "woman";
      const other = "other";

      if (userAuthGender == man) {
        query["profile.gender"] = { $eq: woman, $ne: man, $ne: other };
      } else if (userAuthGender == woman) {
        query["profile.gender"] = { $eq: man, $ne: woman, $ne: other };
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
        users = usersSameInterests;
      }

      return { users: users };
    } catch (error) {
      console.log(`\n Error: ${error} \n`);
      throw error;
    }
  },
};
