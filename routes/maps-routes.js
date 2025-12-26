const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET Request in Map');
    res.json({message: 'map!'});
});

router.post('/createMap', (req, res, next) => {
    console.log('POST Request in Map');
    res.json({message: 'Map created!'});
});

module.exports = router;