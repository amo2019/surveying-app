const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
clientID: keys.googleClientID,
clientSecret: keys.googleClientSecret,
callbackURL: '/auth/google/callback',
proxy: true
},
async (accessToken, refreshToken, profile, done) => {
//   console.log('access token: ', accessToken);
//   console.log('refresh token: ', refreshToken);
try{
const existingUser = await User.findOne({ googleID: profile.id });
     //console.log('Already Exist: ', profile.id);
    if (existingUser){
    return done(null, existingUser);
    }
  } catch (error) {
             console.log(error);}

try{
  const user = await new User({ googleID: profile.id }).save();
  done(null, user)
} catch (error) {
           console.log(error);}
    //.catch(error => cb(error, null));
      //  console.log(error);
    //console.log('profile!: ', profile.id);

  }

)
);
