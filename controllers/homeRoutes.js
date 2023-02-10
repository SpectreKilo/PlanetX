const router = require('express').Router();
const withAuth = require('../utils/auth')


router.get('/', withAuth, async (req, res) => {
    res.render('mothership');
});


router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;