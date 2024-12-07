const Route = require("express");
const postRoute = Route();
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

postRoute.post("/post", async (req, res) => {
  try {
    const body = req.body;
    const userId = body.userId;
    const createdPost = await postModel.create(body);
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });
    res.json(createdPost);
  } catch (error) {
    res.send(error);
  }
});

postRoute.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find().populate("userId");
    res.send(posts);
  } catch (error) {
    throw new Error("Failed to get posts");
  }
});

module.exports = postRoute;
