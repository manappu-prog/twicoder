module.exports.profile = (req,res) => {
    return res.send('<h1>Profile page</h1>');
}
module.exports.signIn = (req,res) => {
    return res.render('user_sign_in.ejs',{title: 'Sign In'})
}
module.exports.signUp = (req,res) => {
    return res.render('user_sign_up.ejs',{title: 'Sign Up'});
}