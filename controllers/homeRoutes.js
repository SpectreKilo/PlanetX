const router = require('express').Router();
const { Comment, BlogPost, User, SubGenre, Genre } = require('../models');
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    try {
        const planetData = await Genre.findAll({
            include: [
                {
                    model: SubGenre,
                    attributes: ["subgenre_name"]
                },
            ],
        });
        const subgenres = planetData.map((subGenre) => subGenre.get({ plain: true }));
        console.log(subgenres)
        res.render('homepage', {
            subgenres,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/mothership', withAuth, async (req, res) => {
    console.log('/mothership hit!')
    console.log(req.session.user_id)
    try {
        //? change user to blogpost to find posts by session user id
        const shipData = await User.findByPk(req.session.user_id, {
            // include: [
            //     {
            //          model: BlogPost,
            //          attributes: ["topic","content", 'user_id', 'date_created'],
            //     },
            //],
        });
        console.log(shipData)
        const mothership = shipData.get({ plain: true });
        console.log(mothership)
        res.render('mothership', {
            mothership,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Gets specific subgenres by id
router.get('/planet/:id', withAuth, async (req, res) => {


    console.log(req.params.id)

    try {
        const subGenreData = await SubGenre.findByPk(req.params.id, {

            // we need to specify attribute?

        });
        const planet = subGenreData.get({ plain: true });

        console.log(planet)

        res.render('homepage', {
           layout: 'main',
            ...planet,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// gets post by specific ID
router.get('/moon/:id', withAuth, async (req, res) => {
    if (!req.session.loggedIn) {
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
        const blogPosts = blogData.get({ plain: true });
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
    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    res.render('login');
})



module.exports = router;