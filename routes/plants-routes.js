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
            .matches(/^\d{4}-\d{2}-\d{2}$/),

        check('daysToNextWatering')
            .notEmpty()
            .isInt({ min: 1 }),

        check('mapPosition')
            .optional({ nullable: true })
            .isInt({ min: 0 })
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
            .matches(/^\d{4}-\d{2}-\d{2}$/),

        check('daysToNextWatering')
            .optional()
            .isInt({ min: 1 }),

        check('mapPosition')
            .optional({ nullable: true })
            .isInt({ min: 0 })
    ],
    plantsController.updatePlant);

router.delete('/:pid', plantsController.deletePlant);

module.exports = router;