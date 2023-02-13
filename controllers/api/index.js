const router = require('express').Router();
const userRoutes = require('./userRoutes');
const planetRoutes = require('./planetRoutes');
const flagRoutes = require('./flagRoutes');
const photoRoutes = require('./photosRoute');

router.use('/planets', planetRoutes);
router.use('/users', userRoutes);
router.use('/flags', flagRoutes);
router.use('/photos', photoRoutes);


module.exports = router;
