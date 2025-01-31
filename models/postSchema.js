const { Schema, mongoose } = require("mongoose");
const postSchema = new Schema(
  {
    caption: { type: String },
    postImg: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments", default: [] }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "likes", default: [] }],
  },
  { timestamps: true }
);
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
