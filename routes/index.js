const router = required('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => {
    return res.send('wrong route!')
});

module.exports = router;