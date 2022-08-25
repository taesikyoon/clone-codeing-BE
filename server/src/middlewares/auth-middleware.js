import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserRepository from "../repositories/user.repository.js";

dotenv.config();

const userRepository = new UserRepository();

const authMiddlewares = async (req, res, next) => {
  //    const { authorization } = req.headers;

  const { authorization } = req.headers;
  
  if (!authMiddlewares) {
    return res
      .status(400)
      .json({ success: false, message: "로그인이 필요합니다." });
  };

  // if (req.query.token) {
  //   try {
  //     const verifyToken = jwt.verify(req.query.token, process.env.SECRET_KEY);
  //     res.locals.nickname = verifyToken.nickname;
  //     res.locals.id = verifyToken.id;
  //     console.log(res.locals.id)
  //     next();
  //     return
      
  //   } catch (err) {
  //     console.log(err);
  //     err.message = "유효하지 않은 토큰입니다.";
  //     next(err);
  //     return
  //   } 
  // } else {}
    const token = authorization.split(" "); 
    if (token[0] !== "Bearer" || !token)
      return res
        .status(401)
        .json({ success: false, message: "로그인이 필요합니다." });
  
    try {
      const verifyToken = jwt.verify(token[1], process.env.SECRET_KEY);
      res.locals.nickname = verifyToken.nickname;
      res.locals.id = verifyToken.id;
      next();
    } catch (err) {
      console.log(err);
      err.message = "유효하지 않은 토큰입니다.";
      next(err);
    } 

};

export default authMiddlewares;
