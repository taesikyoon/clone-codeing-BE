import express from 'express';
const router = express.Router();

import UserController from '../controller/user-controller.js';
import authMiddlewares from '../middlewares/auth-middleware.js';

const userController = new UserController();


// //test용 로그인 유저 확인
// router.get("/",authMiddlewares,userController.checkUser);

//회원가입>>controller
router.post('/signup', userController.userSignup);
//로그인>>controller
router.post('/signin',userController.userSignin);
//페이스북 로그인
router.post('/facebook',userController.facebookLogin);
//프로필 수정
router.put("/profile",authMiddlewares,userController.updateProfile);
//마이피드
router.get("/feed",authMiddlewares,userController.getMyFeed);

export default router;