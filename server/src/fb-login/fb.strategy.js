import passport from 'passport';
import passportFacebook from 'passport-facebook';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserRepository from "../repositories/user.repository.js";
import User from '../models';


const facebookStrategy = passportFacebook.Strategy;

const fbStrategy = () => {
    passport.use(new facebookStrategy({

        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.SECRET_KEY_FB,
        callbackURL: "http://localhost:1000/facebook/callback",
        profileFields: ['id', 'displayName', 'name', 'picture.type(small)', 'email']

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
                    done(null, existUser);
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
            } catch(err) {
                console.error(err);
                done(err);
            }
        }
    ));

};

export default fbStrategy;