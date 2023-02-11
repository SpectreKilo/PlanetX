const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models')
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
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.update({
            topic: req.body.topic,
            content: req.body.content,
            date_created: Date.now(),
        },
        {
            where: {
                id: req.params.id,
            },
        });

        if(!postData){
            res.status(404).json({ message: 'No Moon of that Id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//! add delete post
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const delPost = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!delPost) {
            res.status(404).json({ message: "there is no blog post associated with this id"});
            return;
        }
        res.status(200).json({message: "successfully deleted blog post", delPost})
    } catch (err) {
        res.status(500).json({message: "error deleting this blog post", err})
    }
})
//todo comments
//? add create comments
//? add edit comments
//? add delete comments

module.exports = router;