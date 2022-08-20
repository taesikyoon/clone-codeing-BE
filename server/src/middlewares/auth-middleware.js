import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repositories/user.repository.js";

dotenv.config();

const userRepository = new UserRepository();

const authMiddlewares = async (req, res, next) => {
  //    const { authorization } = req.headers;

  const { authorization } = req.headers;

  const token = authorization.split(" ");
  if (token[0] !== "Bearer")
    return res
      .status(401)
      .json({ success: false, message: "로그인이 필요합니다." });

  try {
    const verifyToken = jwt.verify(token[1], process.env.SECRET_KEY);
    console.log(verifyToken);
    res.locals.nickname = verifyToken.nickname;
    res.locals.id = verifyToken.id;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("NONE_LOGIN");
  }
};

export default authMiddlewares;
