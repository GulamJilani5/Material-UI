import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routing/user-routes.js";
import postRouter from "./routing/post-routes.js";
const app = express();

dotenv.config();

// app.use("/", (req, res) => {
//   res.send("Hello World");
// });
// Middleware
app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", postRouter)
console.log("middleware..................");

// DB Connection
// console.log("mongodb password", process.env.MONGODB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://gulamjilanicse:${process.env.MONGODB_PASSWORD}@cluster0.y978ktl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("DB connection successfull & Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
