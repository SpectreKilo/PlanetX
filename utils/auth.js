const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        console.log('withAuth '+ req.session.user_id)
        next();
    }
};

module.exports = withAuth;