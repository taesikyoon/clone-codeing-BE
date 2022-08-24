import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

const give = async (req, res, next) => {
  try {
    const token = await jwt.sign(
      {
        id: 1,
        nickname: "root",
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30m",
        issuer: "힘내세요...",
      },
    );
    if (!token) {
      return res.status(418).json({
        success: false,
        message: "토큰 발급이 실패했어요.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "힘내세요...",
      data: token,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default give;