const User = require('../models/user');

module.exports.profile = (req,res) => {
    return res.send('<h1>Profile page</h1>');
}
module.exports.signIn = (req,res) => {
    return res.render('user_sign_in.ejs',{title: 'Sign In'})
}
module.exports.signUp = (req,res) => {
    return res.render('user_sign_up.ejs',{title: 'Sign Up'});
}
module.exports.create = async(req,res) => {
    if(req.body.password !== req.body.confirm_password)
        return res.redirect('back');
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.redirect('back');
        }
        await User.create(req.body);
        return res.redirect('/users/signin');
    }catch(err){
        console.log('error while finding the user in the database');
    }
    
}
module.exports.createSession = (req,res) => {
    return res.send('<h1>create the session</h1>');
}