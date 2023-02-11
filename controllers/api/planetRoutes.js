const router = require('express').Router();
const { BlogPost, User } = require('../../models')
const withAuth = require('../../utils/auth')

//todo Post routes
//! add create post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            // topic: req.body.topic,
            // content: req.body.content,
            // date_created: req.body.date_created,
            user_id: req.session.user_id,
        });

        const post = newPost.get({plain: true});
        res.render('moonForm',{ post, 
        loggedIn: req.session.loggedIn});
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
});
//! add edit post
//! add delete post

//todo comments
//? add create comments
//? add edit comments
//? add delete comments

module.exports = router;