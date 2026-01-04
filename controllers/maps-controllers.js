const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Map = require('../models/map');
// const User = require('../models/user');

//LOAD MAP
const getMap = async (req, res, next) => {

    let map;

    try {
        map = await Map.findOne({}).populate('plants');;
    } catch (err) {
        const error = new HttpError(
            'Fetching map failed', 500
        );
        return next(error);
    };

    if (!map) {
        return next(new HttpError('No map found.', 404));
    }

    res.json({ map: map.toObject({ getters: true }) });
};

//CREATE MAP
const createMap = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    //checking if map already exists
    let existingMap;
    try {
        existingMap = await Map.findOne({})
    } catch (err) {
        return next(
            new HttpError('Creating map failed.', 500)
        );
    };

    if (existingMap) {
        return next(
            new HttpError('Map already exists.', 422)
        );
    };

    const { columnsNumber } = req.body;


    const createdMap = new Map({
        columnsNumber,
        selectedSquares: [],
        plants: [],
    });

    try {
        await createdMap.save();
    } catch (err) {
        const error = new HttpError(
            'Creating item failed', 500
        );
        return next(error);
    };

    res.status(201).json({ map: createdMap.toObject({ getters: true }) });
};

//UPDATE/EDIT MAP
const updateMap = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    const { selectedSquares } = req.body;

    if (!Array.isArray(selectedSquares)) {
        return next(new HttpError("selectedSquares must be an array.", 422));
    }

    let map;
    try {
        map = await Map.findOne({});
    } catch (err) {
        return next(new HttpError("Updating map failed.", 500));
    }

    if (!map) {
        return next(new HttpError("Map not found.", 404));
    }

    map.selectedSquares = selectedSquares;

    try {
        await map.save();
    } catch (err) {
        return next(new HttpError("Saving map failed.", 500));
    }

    res.status(200).json({
        map: map.toObject({ getters: true }),
    });
};

//DELETE MAP
const deleteMap = async (req, res, next) => {
    res.status(200).json({ message: 'Map was deleted.' })
}

exports.getMap = getMap;
exports.createMap = createMap;
exports.updateMap = updateMap;
exports.deleteMap = deleteMap;