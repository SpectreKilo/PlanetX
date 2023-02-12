const router = require('express').Router();
const { Comment, BlogPost, User, SubGenre, Genre } = require('../models');
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    try {
        const planetData = await Genre.findAll({
            include: [
                {
                    model: SubGenre,
                    attributes: ["id", "subgenre_name", "genre_id"]
                },
            ],
        });
        const subgenres = planetData.map((subGenre) => subGenre.get({ plain: true }));
        console.log(subgenres[0])
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
        const subs = await SubGenre.findByPk(req.params.id, {
            //  include: [
            //     BlogPost,
            //  ],
        });
        const planet = subs.get({ plain: true });

        console.log(planet)

        res.render('warpspeed', {
           layout: 'main',
            ...planet,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

//get specific subgenre not warp
router.get('/planets/:id', withAuth, async (req, res) => {
    console.log(req.params.id)
    try {
        const subs = await SubGenre.findByPk(req.params.id, {
            //   include: [
            //      BlogPost,
            //   ],
        });
        const planet = subs.get({ plain: true });

        console.log(planet)

        res.render('moons', {
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
    try {
        const blogData = await SubGenre.findByPk(req.params.id, {
            // include: [
            //    { model: User,
            //     include: []},
            //     {
            //         model: Comment,
            //         include: [
            //             User
            //         ]
            //     },

            // ],
        });
        const blogPosts = blogData.get({ plain: true });
        console.log(blogPosts)
        res.render('moons', {
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