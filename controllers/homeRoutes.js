const router = require('express'.Router);



router.get('/', async (req, res) => {});


router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;