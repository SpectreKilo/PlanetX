const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const planetRoute = require('./homeRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/planet', planetRoute);

module.exports = router;