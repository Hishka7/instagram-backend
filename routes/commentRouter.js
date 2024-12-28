const Route = require("express");
const commentRoute = Route();
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");

commentRoute.post("/comments", async (req, res) => {
  const body = req.body;
  const { postId } = body;
  const createdComment = await commentModel.create(body);
  await postModel.findByIdAndUpdate(postId, {
    $push: {
      comments: createdComment._id,
    },
  });
  res.send(createdComment);
});

commentRoute.get("/comments", async (req, res) => {
  try {
    const comments = await postModel.find().populate("comments");
    res.send(comments);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get posts");
  }
});

module.exports = commentRoute;
