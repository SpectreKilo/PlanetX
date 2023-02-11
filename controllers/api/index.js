const router = require('express').Router();
const userRoutes = require('./userRoutes');
const galaxyRoutes = require('./galaxyRoutes');
const planetRoutes = require('./planetRoutes')


router.use('/galaxy', galaxyRoutes);
router.use('/planets', planetRoutes)
router.use('/users', userRoutes)


module.exports = router;
