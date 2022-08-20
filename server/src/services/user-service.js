import UserRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// 아이디 길이는 4~9자리
// 영문 대소문자,숫자만 사용가능
// 비밀번호 길이도 4~9자리
// 영문대소문자, 숫자만 사용가능
class UserService {
   userRepository = new UserRepository();

   //회원가입 진행
   userSignup = async (name, password, nickname) => {
      if(name===undefined||password===undefined || nickname===undefined){
         const error= new Error("BAD_REQUEST")
         error.code=400;
         throw error
      }


     
      //nick:이미있는 유저중에 같은 nickname를 사용하는지 확인하기위해서 nickname로 유저정보를 가지고온다.
      const nick = await this.userRepository.getNickname(nickname);

      //정규식
      //영어,숫자 4~9자리 (3인이유는 <이기떄문에)
      const reg_Id = /^[A-Za-z0-9]{3,9}$/.test(nickname);
      //영어,숫자 4~9자리 (3인이유는 <이기떄문에)
      const reg_Pw = /^[A-Za-z0-9]{3,9}$/.test(password);
      //특수문자 제외
      const reg_Nick1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(nickname);
      //자리수가 2이상 9이하를 제외
      const reg_Nick2 = nickname.length <2 || nickname>9;
      
      //nick이 없으면 nickname가 같은 유저가 없다.
      if (nick != undefined) {
         const error= new Error("EXIST_ID");
         error.code=403;
         throw error      
      }//정규식으로 확인되는 아이디
       else if (!reg_Id) {
         const error= new Error("BAD_VALIDATION_ID");
         error.code=403;
         throw error
      }//정규식으로 확인되는 비밀번호
       else if (!reg_Pw) {
         const error= new Error("BAD_VALIDATION_PW");
         error.code=403;
         throw error
      }//정규식으로 확인되는 닉네임
       else if (reg_Nick1 || reg_Nick2) {
         const error= new Error("BAD_VALIDATION_NICK");
         error.code=403;
         throw error
      }
      
      //회원가입 진행
      const create = await this.userRepository.createUser(name, password,nickname);
      return { status: 200};
   };

   //로그인 진행
   userSignin = async (nickname, password, id) => {
      if(nickname===undefined || password===undefined){
         const error= new Error("BAD_REQUEST")
         error.code=400;
         throw error
      }
      console.log (id)
    //   //유저의 존재를 확인하기 위해 id를 기준으로 Users테이블 탐색
      try{
         const user = await this.userRepository.getUser(nickname);
         if(user===null||user===undefined){
            const error= new Error("BAD_VALIDATION");
            error.code=403;
            throw error
         }
         if (password != user.password) {
            const error= new Error("BAD_VALIDATION");
            error.code=403;
            throw error
         }
      }catch(err){
         throw err;
      }

      
      //토큰 생성
      try {
         const token = jwt.sign({ nickname, id }, process.env.SECRET_KEY,{
            expiresIn: '10h', //1분
          });
          console.log(token)
         //  const token = jwt.sign({id:{ id },iat: Math.floor(Date.now() / 1000) - 30 }, process.env.SECRET_KEY);
         //토큰과 상태,메시지 전송
         return { status: 200, token: token };
      } catch (err) {
         const error= new Error("BAD_TOKEN");
         console.log(err)
         error.code=403;
         throw error        
      }
   };

   //아이디 중복확인
   idCheck=async(nickname)=>{
      if(nickname===undefined){
         const error= new Error("BAD_REQUEST")
         error.code=400;
         throw error
      }
      //정규식
      //영어,숫자 4~9자리 (3인이유는 <이기떄문에)
      const reg_Id = /^[A-Za-z0-9]{3,9}$/.test(nickname);
      if (!reg_Id) {
         const error= new Error("BAD_VALIDATION_ID");
         error.code=403;
         throw error
      }
      //user:이미있는 유저중에 같은 id를 사용하는지 확인하기위해서 id로 유저정보를 가지고온다.
      const user = await this.userRepository.getUser(id);
      if (user != undefined) {
         const error= new Error("EXIST_NICKNAME");
         error.code=403;
         throw error
      }
      return {status:200,message:"SUCCES"}
   }
}

export default UserService;