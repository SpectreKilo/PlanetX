const router = require('express').Router();
const { Photos } = require('../../models');
const withAuth = require('../../utils/auth');

//todo Post routes
//! add create post
router.post('/', withAuth, async (req, res) => {
    try {
        const uploadPhoto = await Photos.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(req.body);
        console.log(uploadPhoto);

        req.session.save(() => {
            req.session.description = uploadPhoto.id;
            req.session.loggedIn = true;

            res.status(200)
        });
   
        // const photoUser = uploadPhoto.get({ plain: true });
     console.log(req.session.description);

        res.render('photoForm', { 
          logged_in: req.session.loggedIn 
        });

        res.status(200)
        // s.json(uploadPhoto);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;