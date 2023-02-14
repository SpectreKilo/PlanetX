const router = require('express').Router();
const { Comment, BlogPost, User, SubGenre, Genre, Photos} = require('../models');
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
        res.render('homepage', {
            subgenres,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/mothership', withAuth, async (req, res) => {
    try {
        //? change user to blogpost to find posts by session user id
        const shipData = await User.findByPk(req.session.user_id, {
        });
        const mothership = shipData.get({ plain: true });
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
    try {
        const subs = await SubGenre.findByPk(req.params.id, {
        });
        const planet = subs.get({ plain: true });
        var subId = req.params.id;
        const warpPost = await BlogPost.findAll({
            where: {
                sub_genre_id: subId,
            }
        });
        const warpDisp = warpPost.map((subG) => subG.get({plain: true}));
        res.render('warpspeed', {
           layout: 'main',
            ...planet,
            warpDisp,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Gets all photos 
router.get('/photos', withAuth, async (req, res) => {
    try {
        // Get all projects 
        const photoData = await Photos.findAll({
          
        });
    
        // Serialize data so the template can read it
        const photo = photoData.map((photo) => photo.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('photoForm', { 
            photo,
          loggedIn: req.session.loggedIn 
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });


// gets post by specific ID
router.get('/moon/:id', withAuth, async (req, res) => {
    try {
      
        const blogData = await BlogPost.findAll({
            where: {
              sub_genre_id: 
               req.params.id
            }
          });
          if(!blogData[0]){
           res.render('moons', {
            sub_id: req.params.id,
            loggedIn: req.session.loggedIn,
           })
            return;
          } 

  blogPostData = blogData.map((subGenre) => subGenre.get({ plain: true }));
  
        res.render('moons', {
            topics: blogPostData,
            loggedIn: req.session.loggedIn,
            sub_id: blogPostData[0].sub_genre_id
             
        });
    } catch (err) {
        res.status(501).json(err);
    }

});

// gets post by specific ID
router.get('/planets/:id', withAuth, async (req, res) => {
    try {
      
        const blogData = await BlogPost.findByPk(req.params.id, {
          });
  blogPostData = blogData.get({ plain: true });
        res.render('moon_post', {
           blogPostData,
            loggedIn: req.session.loggedIn,
             
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