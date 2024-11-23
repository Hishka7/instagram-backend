const Route = require("express");
const postRoute = Route();
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

postRoute.post("/post", async (req, res) => {
  try {
    // const {}
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

module.exports = postRoute;
