const Route = require("express");
const userModel = require("../models/userSchema");
const userRoute = Route();
const bcrypt = require("bcrypt");

userRoute.post("/signUp", async (req, res) => {
  try {
    const { password, email, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = await userModel.create({
      password: hashedPassword,
      email,
      username,
    });

    res.send(createdUser);
  } catch (error) {
    res.send(error);
  }
});
userRoute.get("/user/posts", async (req, res) => {
  const userPosts = await userModel.find().populate("posts");
  res.send(userPosts);
});

userRoute.post("/user/follow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        followers: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.send("done!");
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = userRoute;
