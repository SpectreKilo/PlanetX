const router = require('express').Router();
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    res.render('login');
});

//! add get post by id

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;