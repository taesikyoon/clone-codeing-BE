import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import chalk from "chalk";
import path from "path";

import userRouter from "./routes/user-router.js";
import postRouter from "./routes/post-router.js";
import commentRouter from "./routes/comment-router.js";

import { sequelize } from "./models/index.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.set("port", process.env.NODE_ENV || 1000);
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => console.log("db connect"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use("/image", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 존재하지 않습니다.`);
  error.status = 404;
  return next(error);
});

app.use((err, req, res, next) => {
  return res.status(err.status).json({
    success: false,
    message: err.message,
  });
});

app.listen(app.get("port"), () => console.log(chalk.bgBlue(app.get("port"))));
