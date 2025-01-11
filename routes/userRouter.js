const Route = require("express");
const userModel = require("../models/userSchema");
const userRoute = Route();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMware = require("../auth-middleware");

userRoute.post("/signup", async (req, res) => {
  try {
    const { password, email, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = await userModel.create({
      password: hashedPassword,
      email,
      username,
    });
    const token = jwt.sign(
      {
        userId: createdUser._id,
        username: createdUser.username,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.send({ error });
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

userRoute.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId).populate("posts");

  res.send(user);
});

// userRoute.post("/user/follow", async (req,res )=>{

// })

userRoute.post("/user/follow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.send("done!");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRoute.post("/user/unfollow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $pull: {
        followers: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $pull: {
        following: followingUserId,
      },
    });
    res.send("done!");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// userRoute.post("/user/unfollow", async (req, res) => {
//   const { followingUserId, followedUserId } = req.body;
//   try {
//     await userModel.findByIdAndUpdate(followingUserId, {
//       $pull: {
//         followers: followedUserId,
//       },
//     });
//     await userModel.findByIdAndUpdate(followedUserId, {
//       $pull: {
//         followers: followingUserId,
//       },
//     });
//     res.send("done!");
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// userRoute.get("/user/followers", async (req, res) => {
//   const followers = await userModel.find().populate("followers");
//   res.send(followers);
// });

// userRoute.get("/login", async (req, res) => {});

module.exports = userRoute;
