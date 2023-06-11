const mongoose = require("mongoose");
const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

const { Schema } = mongoose

const userSchema = new Schema({
    email: { 
        type: String,
        required: true
    },
    password: { type: String,
        required: true},
    profile: {
        type: Object,
        default: {
            firstname: {
                type: String,
                default: ""
            },
            lastname: {
                type: String,
                default: ""
            },
            birthday: {
                type: Date,
                default: new Date()
            },
            profile_pic: {
                type: String,
                default: ""
            },
            interests: {
                type:  [String],
                default: []
            },
        }
    },
    matches: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    deslikes: {
        type: [Schema.Types.ObjectId],
        default: []
    }
  
    // matches: {
    //     type: [Schema.Types.ObjectId],
    //     default: []
    // }, // other table
    
    // deslikes: {
        
    // } other table
});

userSchema.pre("save", function(next) {
    let hashDigest = sha256(this.password);
    this.password = Base64.stringify(hashDigest);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;