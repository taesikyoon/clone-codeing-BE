import User from '../models/user.js';
import Post from '../models/post.js';

class UserRepository {
   getUser = async (nickname) => {
      try {
         const user = await User.findOne({
            where: {
               nickname,
            },
         });
         return user;
      } catch (err) {
         const error = new Error("FAILD_SQL");
         error.code = 405;
         throw error;
      }
   };
   createUser = async (name, password, nickname) => {
      try {
         const create = await User.create({
            name,
            password,
            nickname,
         });
         return create;
      } catch (err) {
         const error = new Error("FAILD_SQL");
         error.code = 405;
         throw error;
      }
   };

   getNickname = async (nickname) => {
      try {
         const nick = await User.findOne({
            where: {
               nickname,
            },
         });
         return nick;
      } catch (err) {
         const error = new Error("FAILD_SQL");
         error.code = 405;
         throw error;
      };
   };

   getNicknameById = async (id) => {
      try {
         const nickname = await User.findOne({
            where: {
               id
            }
         })
         return nickname
      } catch (err) {
         const error = new Error("FAILD_SQL");
         error.code = 405;
         throw error;
      };
   };
      
   updateProfile = async ( name, nickname, profile, introduce, email, phone, gender, id) => {
      console.log(id)
      try{
         return await User.update({
            name: name, 
            nickname: nickname, 
            profile: profile, 
            introduce: introduce, 
            email: email, 
            phone: phone, 
            gender: gender
         },
            { where: { id : id } },
         )         
      } catch (err) {
         const error = new Error("FAILD_SQL_UP");
            error.code = 405;
            throw error
      };
   };

   getMyFeed = async(id) => {
      try{         
         const posts = await Post.findAll({
            where: { fk_user_id : id },
            attributes: {exclude: ['fk_user_id', 'updatedAt']},             
         });
         
         const user = await User.findOne({
            where: { id },
            attributes: ['id', 'name', 'nickname', 'image'],
         }); 
         console.log(posts,user)
         return {user: user, posts: posts};
      } catch (err) {
         const error = new Error("FAILD_SQL");
         error.code = 405;
         throw error
      }
   };
}

export default UserRepository;
