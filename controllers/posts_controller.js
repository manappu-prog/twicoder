const Post = require('../models/post');

module.exports.create = async(req,res) => {
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        console.log('created a post');
        res.redirect('back');
    }catch(err){
        console.log('Error while creating a post --> ' + err);
    }
}