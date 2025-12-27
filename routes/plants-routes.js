const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: 'It works!'});
});

router.post('/createplant', (req, res, next) => {
    res.json({message: 'created!'});
});

router.patch('/:pid', (req, res, next) => {
    res.json({message: 'edited!'});
});

router.delete('/:pid', (req, res, next) => {
    res.json({message: 'deleted!'});
});

module.exports = router;