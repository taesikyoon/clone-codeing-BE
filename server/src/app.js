import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import chalk from "chalk";
import path from "path";
import cors from "cors";

import userRouter from "./routes/user-router.js";
import postRouter from "./routes/post-router.js";
import commentRouter from "./routes/comment-router.js";
import facebookRouter from "./fb-login/fb-router.js";
import token from "./middlewares/token.js";

import { sequelize } from "./models/index.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.set('view engine','ejs');
app.set('views', '../views');

app.set("port", 3000);
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => console.log("db connect"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(morgan("dev"));
app.use("/image", express.static(path.join(__dirname, "images")));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/", facebookRouter);
app.get("/token", token);
app.get('/api/facebook', (req, res) => {
  res.render("index")
});


app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 존재하지 않습니다.`);
  error.status = 404;
  return next(error);
});


app.use((err, req, res, next) => {
  err.status = err.status || 500;
  return res.status(err.status).json({
    success: false,
    message: err.message,
  });
});

app.listen(app.get("port"), () => console.log(chalk.bgBlue(app.get("port"))));
