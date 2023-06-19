const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
