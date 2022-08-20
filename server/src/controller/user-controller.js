import UserService from '../services/user-service.js';
import joi from 'joi';

class UserController {
    userService = new UserService();

    //로그인 중인 유저 정보확인
    checkUser = async (req, res) => {
        res.json(res.locals.user);
    }

    //회원가입
    userSignup = async (req, res) => {
        const { name, nickname, password } = req.body;

        try {
            await joi.object({
                name: joi.string().required(),
                nickname: joi.string().required(),
                password: joi.string().required(),
            })
                .validateAsync({ name, nickname, password });

            const result = await this.userService.userSignup(name, password, nickname);

            return res.status(200).send(result)
        } catch (err) {            
            return res.status(400).send(err.message)
        }
    };

    //로그인
    userSignin = async (req, res) => {
        const authorization = req.headers.authorization;
        const [authType, authToken] = (authorization || '').split(' ');
        
        if (authToken !== undefined && authToken !== null && authType === "BEAVER") {
            return res.status(400).send("DONE_LOGIN");
        }
        const { nickname, password } = req.body;

        try {
            const inner = await this.userService.userSignin(nickname, password);

            //토큰 쿠키에 저장 테스트용
            res.cookie(process.env.COOKIE_NAME, inner.token, { maxAge: 1800000000 });

            //프론트로 토큰 전송
            if (inner.token === res.locals.login) {
                const error = new Error("Forbidden")
                error.code = 403;
                throw error
            }
            return res.status(inner.status).json({
                message: "SUCCES",
                token: inner.token
            });

        } catch (err) {
            if (err === 403) {
                console.log(err)
                return res.status(err.code).send(err.message);
            }
            console.log(err)
            return res.status(err.code).send(err.message);
        }
    };

    //아이디 중복확인
    idCheck = async (req, res) => {
        const { nickname } = req.body;
        try {
            const check = await this.userService.idCheck(id);

            return res.status(check.status).send(check.message)
        } catch (err) {
            console.log(err)
            return res.status(err.code).send(err.message)
        }
    }
};

export default UserController;

