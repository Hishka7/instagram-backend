const Route = require("express");
const likeRoute = Route();
const postModel = require("../models/postSchema");
likeRoute.post("/like", async (req, res) => {
  const { postId, userId } = req.body;
  await postModel.findByIdAndUpdate(postId, {
    $addToSet: {
      likes: userId,
    },
  });
  res.send("liked!");
});

likeRoute.post("/unlike", async (req, res) => {
  const { postId, userId } = req.body;
  await postModel.findByIdAndUpdate(postId, {
    $pull: {
      likes: userId,
    },
  });
});

likeRoute.get("/likes", async (req, res) => {
  try {
    const likes = await postModel.find().populate("likes");
    res.send(likes);
  } catch (error) {
    throw new Error("ERROR");
  }
});

module.exports = likeRoute;
