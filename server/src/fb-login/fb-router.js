import express from 'express';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import session from 'express-session';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/user.js';
dotenv.config();

const app = express();
const router = express.Router();
const facebookStrategy = passportFacebook.Strategy;

app.set('view engine','ejs');
app.set('views', '../views');

router.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

// FB strategy
passport.use(new facebookStrategy({

  clientID: '585960963002856',
  clientSecret: 'd0d545cc0b663ac565bd7ce78463f0bf',
  callbackURL: "http://7th-clone-bapo.s3-website.ap-northeast-2.amazonaws.com//facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'picture.type(small)', 'email'],

},
  async (token, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const existUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (existUser) {
        const nickname = existUser.dataValues.nickname;
        const id = existUser.dataValues.id;
        const provider = existUser.dataValues.provider;

      token = jwt.sign({ nickname, provider }, process.env.SECRET_KEY);
      return done(null, token)
      } else {
        const fbEmail = profile.emails[0].value;
        const fbId = profile.id;
        const fbName = profile.displayName;
        const fbImage = profile.photos[0].value;
        const provider = profile.provider;

        const fbUser = await User.create({
          email: fbEmail,
          name: fbName,
          nickname: fbId,
          image: fbImage,
          provider: provider,
        });
        done(null, fbUser);
      }      

    } catch (err) {
      console.error(err);
      done(err);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  return done(null, id)
});


//====================페이스북 테스트용============================
// app.get('/api/facebook', (req, res) => {
//   res.render("index")
// });


router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/facebook/callback', 
  passport.authenticate('facebook',{failureRedirect: '/api/auth/signin'}),
  function (req, res) {  
    console.log(req.user) 
    res.redirect('/api/auth/facebook' + '?token=' + req.user);
  }
);

// router.get('/facebook/callback',
//         passport.authenticate('facebook', {
//             successRedirect : '/profile',
//             failureRedirect : '/'
//         }));

export default router;