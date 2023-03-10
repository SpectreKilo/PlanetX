const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

//todo Post routes
//! add create post
router.post('/', withAuth, async (req, res) => {
    try {
      var id = req.session.user_id
        const moon = await BlogPost.create({
            ...req.body,   
            user_id: id,
        });
       
        let post = moon.get({plain: true});
console.log(post)
        res.render('moons',{ post, 
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
module.exports = router;