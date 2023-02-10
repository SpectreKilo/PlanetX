const router = require('express').Router();
const { User } = require('../../models');


//SIGNUP routes request
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
//This is to save the user as loggedIn
        req.session.save(() => {
            loggedIn = req.session.loggedIn;
            res.status(200).json(userData);
        });
console.log(req.session); //to check if the user successfully loggedIn with the information provided
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//LOGIN
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
                .status(404)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(404)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
//This is to save the user as loggedIn
        req.session.save(() => {
            loggedIn = req.session.loggedIn;
            res.status(200)
            .json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();

        });
    }else{
        res.status(404).end();
    }
});

module.exports = router;