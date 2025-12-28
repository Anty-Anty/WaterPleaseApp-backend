// const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
// const Item = require('../models/item');
// const User = require('../models/user');

//FIND LIST OF PLANTS
const getPlantsList = async (req, res, next) => {

    res.json({ respond: "list of plants" });
};

//CREATE PLANT
const createPlant = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    const { img, wLevel, title, lastWateredDate, daysToNextWatering, mapPosition } = req.body;

    res.status(201).json({ respond: "created" });
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