const router = require('express').Router();
const { Comment, BlogPost, User } = require('../models');
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    res.render('universe');
});

//! add get post by id
router.get('/moon/:id', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                User,
                {
                model: Comment,
                    include: [
                        User
                    ]
                },

            ],
        });
    const blogPosts = blogData.get({ plain:true });
        console.log(blogPosts)
    res.render('moon_post', {
        blogPosts,
        loggedIn: req.session.loggedIn
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
if(req.session.loggedIn) {
    res.redirect('/')
    return;
}
    res.render('login');
})



module.exports = router;