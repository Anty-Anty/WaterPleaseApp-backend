const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: 'map!'});
});

router.post('/createmap', (req, res, next) => {
    res.json({message: 'Map created!'});
});

router.patch('/editmap', (req, res, next) => {
    res.json({message: 'Map edited!'});
});

module.exports = router;