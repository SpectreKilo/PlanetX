const router = require('express').Router();
const { Photos } = require('../../models');
const withAuth = require('../../utils/auth');

//todo Post routes
//! add create post
router.post('/', withAuth, async (req, res) => {
    try {
        const uploadPhoto = await Photos.create(req.body);
        console.log(req.body);
        console.log(uploadPhoto);

        req.session.save(() => {
            req.session.description = uploadPhoto.id;
            req.session.loggedIn = true;

            res.status(200)
            // .json(userData);
        });
   

        // const photoUser = uploadPhoto.get({ plain: true });
     console.log(req.session.description);
        res.render('photoForm');
        //     layout: 'main',
        //     ...photo,
        //     loggedIn: req.session.loggedIn
        // });


        // const photo = Photo.get({plain: true});
        // // res.render('moonForm',{ photo, 
        // // loggedIn: req.session.loggedIn});
        res.status(200).json(uploadPhoto);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;