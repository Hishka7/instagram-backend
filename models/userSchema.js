const { Timestamp } = require("bson");
const { Schema, mongoose } = require("mongoose");
const { type } = require("os");
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profile: { type: String },
    bio: { type: String },
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    // id: { type: String },
    posts: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
