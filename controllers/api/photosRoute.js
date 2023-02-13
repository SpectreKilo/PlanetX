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
          loggedIn: req.session.loggedIn 
        });

        res.status(200)
        // s.json(uploadPhoto);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const photoData = await Photos.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!photoData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(photoData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  //get specific subgenre not warp
router.get('/:id', withAuth, async (req, res) => {
    console.log(req.params.id)
    try {
        console.log('api ok')
        const photoData = await Photos.findByPk(req.params.id, {
            where: {
                id: req.params.id,
              },
            });

        const photos = photoData.get({ plain: true });
console.log(photos)
        console.log(planet)

        res.render('photoForm', {
           layout: 'main',
            ...photos,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;