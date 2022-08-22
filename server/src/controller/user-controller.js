import UserService from "../services/user-service.js";
import joi from "joi";

class UserController {
  userService = new UserService();

  //로그인 중인 유저 정보확인
  checkUser = async (req, res) => {
    res.json(res.locals.user);
  };

  //회원가입
  userSignup = async (req, res) => {
    const { name, nickname, password } = req.body;

    try {
      await joi
        .object({
          name: joi.string().required(),
          nickname: joi.string().required(),
          password: joi.string().required(),
        })
        .validateAsync({ name, nickname, password });

      const result = await this.userService.userSignup(
        name,
        password,
        nickname        
      );

      const message = "success : true"
      
      return res.status(200).send(message);
    } catch (err) {
      const message2 = "success: false"
      return res.status(400).send(message2);
    }
  };

  //로그인
  userSignin = async (req, res) => {
    const authorization = req.headers.authorization;
    const [authType, authToken] = (authorization || "").split(" ");

    if (
      authToken !== undefined &&
      authToken !== null &&
      authType === "Bearer"
    ) {
      return res.status(400).send("DONE_LOGIN");
    }
    const { nickname, password } = req.body;

    try {
      const inner = await this.userService.userSignin(nickname, password);

      //프론트로 토큰 전송
      if (inner.token === res.locals.login) {
        const error = new Error("Forbidden");
        error.code = 403;
        throw error;
      }
      return res.status(inner.status).json({
        success: true,
        message: "로그인 성공",
        token: inner.token,
      });
    } catch (err) {
      if (err === 403) {
        console.log(err);
        return res.status(err.code).send(err.message);
      }
      console.log(err);
      return res.status(err.code).send(err.message);
    }
  };

  //아이디 중복확인
  idCheck = async (req, res) => {
    const { } = req.body;
    try {
      const check = await this.userService.idCheck(id);

      return res.status(check.status).send(check.message);
    } catch (err) {
      console.log(err);
      return res.status(err.code).send(err.message);
    }
  };

  updateProfile = async (req, res) => {
    const { name, nickname, profile, introduce, email, phone, gender } = req.body;
    const { id } = res.locals;

    try {
      await joi
        .object({
          name: joi.string(),
          nickname: joi.string(),
          profile: joi.string(),
          introduce: joi.string(),
          email: joi.string().email({ tlds: { allow: false } }),
          phone: joi.string().length(11).pattern(/^[0-9]+$/),
          gender: joi.string().valid('male','female'),
          id: joi.number(),
        })
        .validateAsync({ name, nickname, profile, introduce, email, phone, gender, id });
    } catch (err) {

      return res.status(400).json("BAD_REQUEST");
    }


    try {
      const result = await this.userService.updateProfile(
        name,
        nickname,
        profile,
        introduce,
        email,
        phone,
        gender,
        id,
      );
      return res.status(200).json(result);

    } catch (err) {

      return res.status(err.code).send(err.message);
    }
  };

  getMyFeed = async (req, res) => {
    const { id } = res.locals;

    try {
      await joi
        .object({
          id: joi.number().required()
        })
        .validateAsync({ id });
    } catch (err) {
      return res.status(400).json("BAD_REQUEST");
    }
    try {
      const result = await this.userService.getMyFeed(id);
      return res.json(result);
    } catch (err) {
      return res.status(400).json('failed');
    }
  }; 
  
};


export default UserController;
