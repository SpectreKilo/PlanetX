const router = require('express').Router();
const userRoutes = require('./userRoutes');
const planetRoutes = require('./planetRoutes')

router.use('/planets', planetRoutes);
router.use('/users', userRoutes);


module.exports = router;
