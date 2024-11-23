const { Schema, mongoose } = require("mongoose");
const postSchema = new Schema(
  {
    caption: { type: String },
    postImg: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "likes  " }],
  },
  { timestamps: true }
);
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
