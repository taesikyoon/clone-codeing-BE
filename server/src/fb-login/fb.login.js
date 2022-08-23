import express from'express';
import passport from'passport'
import facebookStrategy from'passport-facebook'.Strategy

const router = express.Router();

require('dotenv').config();

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// FB strategy
passport.use(new facebookStrategy({

    clientID : process.env.CLIENT_ID_FB,
    clientSecret : process.env.SECRET_KEY_FB,
    callbackURL: "http://localhost:1000/facebook/callback",
    profileFields : ['id', 'displayName', 'name', 'gender', 'picture.type(small)', 'email']

},
function (token, refreshToken, profile, done) {
    const id = profile.id;
    const name = profile.displayName
    const email = profile.emails[0].value;
    const existUser = 
    console.log (id, name, email)

    if {

    } else {
        
    }
}
));
));




// 세션에 필요
// passport.serializeUser(function(user, done) {
//     done(null, user);
// });
 
// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//     return done(null,id)
// });

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

app.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/failed'
}));

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});

function isLoggedIn(req, res, next) {
 
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
    console.log(profile)
        return next();
 
    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.get('/failed', (req,res) => {
    res.send("You are a non valid user")
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(1000,() => {
    console.log("App is listening on Port 1000")
})