const router = require('express').Router();
const userRoutes = require('./userRoutes');
const planetRoutes = require('./planetRoutes');
const flagRoutes = require("./flagRoutes");

router.use('/planets', planetRoutes);
router.use('/users', userRoutes);
router.use("/flags", flagRoutes);


module.exports = router;
