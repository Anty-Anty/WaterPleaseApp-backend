const express = require('express');
const { check } = require('express-validator');

const mapsController = require('../controllers/maps-controllers');

const router = express.Router();

router.get('/', mapsController.getMap);

router.post('/createmap',
    [
        check('columnsNumber')
            .notEmpty()
            .isInt({ min: 1 })
            .toInt(),

        check('selectedSquares')
            .optional()
            .isArray()
    ],
    mapsController.createMap);

router.patch('/:mid',
    [
        check('columnsNumber')
            .optional()
            .isInt({ min: 1 })
            .toInt(),

        check('selectedSquares')
            .optional()
            .isArray()
    ],
    mapsController.updateMap);

router.delete('/:mid', mapsController.updateMap);

module.exports = router;