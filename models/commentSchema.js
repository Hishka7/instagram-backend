const { Schema, mongoose } = require("mongoose");
const commentSchema = new Schema({
  username: { type: String },
  postId: { type: mongoose.Types.ObjectId, ref: "posts" },
  comment: { type: String, required: true },
});
const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;