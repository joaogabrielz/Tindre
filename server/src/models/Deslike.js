const mongoose = require("mongoose");
const { Schema } = mongoose;

const deslikeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: Date
});

const Deslike = mongoose.model("Deslike", deslikeSchema);

module.exports = Deslike;
