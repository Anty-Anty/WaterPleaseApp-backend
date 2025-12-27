const express = require('express');

const plantsController = require('../controllers/plants-controllers');

const router = express.Router();

router.get('/', plantsController.getPlantsList);

router.post('/createplant', plantsController.createPlant);

router.patch('/:pid', plantsController.updatePlant);

router.delete('/:pid', plantsController.deleteItem);

module.exports = router;