const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user')

passport.use(new LocalStrategy({usernameField: 'email'},async(email,password,done) => {
    try{
        const user = await User.findOne({email: email});
        if(!user || password !== user.password){
            console.log('Invalid User/Password');
            return done(null,false);
        }
        return done(null,user);
    }catch(err){
        console.log('error while checking if the user exists');
        return done(err);
    }

}))

passport.serializeUser((user,done) => {
    done(null,user._id);
})

passport.deserializeUser(async(id,done) => {
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error while findig the user -> passport');
        return done(err);
    }
})

module.exports = passport;