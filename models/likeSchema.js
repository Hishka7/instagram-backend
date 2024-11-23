const { Schema, mongoose } = require("mongoose");
const likeSchema = new Schema(
  {
    postId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
module.exports = likeSchema;
