const express = require('express');
const { check } = require('express-validator');

const plantsController = require('../controllers/plants-controllers');

const router = express.Router();

router.get('/', plantsController.getPlantsList);

router.post('/createplant',
    [
        check('img')
            .notEmpty()
            .isInt({ min: 1 }),

        check('wLevel')
            .notEmpty()
            .isInt({ min: 1 }),

        check('title')
            .trim()
            .notEmpty()
            .isLength({ max: 50 }),

        check('lastWateredDate')
            .notEmpty()
            .isISO8601(),

        check('daysToNextWatering')
            .notEmpty()
            .isInt({ min: 1 }),

        check('mapPosition')
            .optional({ nullable: true })
            .isString()
    ],
    plantsController.createPlant);

router.patch('/:pid',
    [
        check('img')
            .optional()
            .isInt({ min: 1 }),

        check('wLevel')
            .optional()
            .isInt({ min: 1 }),

        check('title')
            .optional()
            .trim()
            .notEmpty()
            .isLength({ max: 50 }),

        check('lastWateredDate')
            .optional()
            .isISO8601(),

        check('daysToNextWatering')
            .optional()
            .isInt({ min: 1 }),

        check('mapPosition')
            .optional({ nullable: true })
            .isString()
    ],
    plantsController.updatePlant);

router.delete('/:pid', plantsController.deletePlant);

module.exports = router;