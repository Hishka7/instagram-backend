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
module.exports = likeRoute;
