const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => {
    console.log('inside INDEX JS=====WRONG ROUTE====')
    return res.send('wrong route!')
});

module.exports = router;