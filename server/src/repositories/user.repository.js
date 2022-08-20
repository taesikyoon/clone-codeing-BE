import User from '../models/user.js';

class UserRepository {
   getUser = async (nickname) => {
      try{
         const user = await User.findOne({
            where: {
               nickname,
            },
         });
         return user;
      }catch(err){
         const error= new Error("FAILD_SQL");
         error.code=405 ;
         throw error;
      }
   };
   createUser = async (name, password,nickname) => {
      try{
         const create = await User.create({
            name,
            password,
            nickname,
         });
         return create;
      }catch(err){
         const error= new Error("FAILD_SQL");
         error.code=405 ;
         throw error;
      }
   };
   getNickname=async(nickname)=>{
      try{
         const nick = await User.findOne({
            where: {
               nickname,
            },
         });
         return nick;
      }catch(err){
         const error= new Error("FAILD_SQL");
         error.code=405 ;
         throw error;
      }
   }
   getNicknameById=async(userId)=>{
      try{
         const nickname=await User.findOne({
            where:{
               userId
            }
         })
         return nickname
      }catch(err){
         const error= new Error("FAILD_SQL");
         error.code=405 ;
         throw error;
      }
   }
}

export default UserRepository;
