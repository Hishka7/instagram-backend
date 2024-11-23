const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRouter");
const postRoute = require("./routes/postRouter");
const commentRoute = require("./routes/commentRouter");
const likeRoute = require("./routes/likeRouter");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();

const connect = async () => {
  const result = await mongoose.connect(process.env.MONGODB);
  console.log("connected!!");
};
connect();

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(likeRoute);
app.listen(8080, console.log("running"));
