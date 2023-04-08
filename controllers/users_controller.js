const User = require('../models/user');

module.exports.profile = async (req, res) => {
    if (req.cookies.user_id) {
        try {
            const user = await User.findById(req.cookies.user_id);
            if (user) {
                return res.render('user_profile.ejs', { title: 'User Profile', user: user });
            }
        } catch (err) {
            console.log('error while getting user details..');
            return res.redirect('/users/signin');
        }
    }
    console.log('user not found please log in..');
    return res.redirect('/signin');
}
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in.ejs', { title: 'Sign In' })
}
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up.ejs', { title: 'Sign Up' });
}
module.exports.create = async (req, res) => {
    if (req.body.password !== req.body.confirm_password)
        return res.redirect('back');
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log('user already exist')
            return res.redirect('back');
        }
        await User.create(req.body);
        return res.redirect('/users/signin');
    } catch (err) {
        console.log('error while finding the user in the database');
    }

}
module.exports.createSession = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (req.body.password !== user.password) {
                console.log('wrong password entered..');
                return res.redirect('back');
            }
            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');
        }
        console.log('user not found..');
        return res.redirect('/users/signup');
    } catch (err) {
        console.log('error while getting the user');
    }
}