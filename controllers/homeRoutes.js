const router = require('express').Router();
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    res.render('universe');
});

//! add get post by id


router.get('/login', (req, res) => {
if(req.session.loggedIn) {
    res.redirect('/')
    return;
}
    res.render('login');
})



module.exports = router;