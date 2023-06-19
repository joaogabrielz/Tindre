const mongoose = require("mongoose");
const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  profile: {
    firstname: String,
    lastname: String,
    birthday: Date,
    profile_pic: String,
    gender: String,
    interests: Array,
  },
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
  deslikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Deslike",
    },
  ],
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  let hashDigest = sha256(this.password);
  this.password = Base64.stringify(hashDigest);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
