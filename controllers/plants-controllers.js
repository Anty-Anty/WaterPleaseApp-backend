// const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Plant = require('../models/plant');
// const User = require('../models/user');

//FIND LIST OF PLANTS
const getPlantsList = async (req, res, next) => {

    let plantsList;

    //searching for items
    try {
        plantsList = await Plant.find({});
    } catch (err) {
        const error = new HttpError(
            'Fetching items failed', 500
        );
        return next(error);
    };

    res.json({ plantsList: plantsList.map(plant => plant.toObject({ getters: true })) });
};

//CREATE PLANT
const createPlant = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    const { img, wLevel, title, lastWateredDate, daysToNextWatering } = req.body;

    const createdPlant = new Plant({
        title,
        img,
        wLevel,
        lastWateredDate,
        daysToNextWatering
    });

     try {
         await createdPlant.save();
    } catch (err) {
        const error = new HttpError(
            'Creating item failed', 500
        );
        return next(error);
    };

    res.status(201).json({ plant: createdPlant.toObject({ getters: true }) });
};

//UPDATE/EDIT PLANT
const updatePlant = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    const { img, wLevel, title, lastWateredDate, daysToNextWatering, mapPosition } = req.body;

    res.status(200).json({ respond: "updated" });
};

//DELETE PLANT
const deletePlant = async (req, res, next) => {
    res.status(200).json({ message: 'Item was deleted.' })
}

exports.getPlantsList = getPlantsList;
exports.createPlant = createPlant;
exports.updatePlant = updatePlant;
exports.deletePlant = deletePlant;