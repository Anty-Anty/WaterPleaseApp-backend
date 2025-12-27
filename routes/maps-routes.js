const express = require('express');

const mapsController = require('../controllers/maps-controllers');

const router = express.Router();

router.get('/', mapsController.getMap);

router.post('/createmap', mapsController.createMap);

router.patch('/:mid', mapsController.updateMap);

router.delete('/:mid', mapsController.updateMap);

module.exports = router;