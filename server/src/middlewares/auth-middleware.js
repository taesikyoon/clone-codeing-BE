import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserRepository from '../repositories/user.repository.js';

dotenv.config()

const userRepository = new UserRepository();

const authMiddlewares = async (req, res, next) => {
//    const { authorization } = req.headers;
   const authorization = req.headers.cookie;
   const [authType, authToken] = (authorization || '').split(' ');
//    const [authType, authToken] = (authorization || '').split('=');
   if (!authToken || authType !== process.env.COOKIE_NAME) {
      return res.status(401).send("NONE_LOGIN");
   }
   try {
      const token = jwt.verify(authToken, process.env.SECRET_KEY)
      const nickname = token.nickname
      await userRepository.getUser(nickname).then(( user ) => {         
         res.locals.user = user;
         next();
      });
   } catch (err) {
      res.status(401).send('NONE_LOGIN');
   }
};

export default authMiddlewares;

