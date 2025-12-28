// const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
// const Item = require('../models/item');
// const User = require('../models/user');

//LOAD MAP
const getMap = async (req, res, next) => {
    res.json({ respond: "map" });
};

//CREATE MAP
const createMap = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    res.status(201).json({ respond: "map created" });
};

//UPDATE/EDIT PLANT
const updateMap = async (req, res, next) => {

    //express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed.', 422));
    }

    res.status(200).json({ respond: "map updated" });
};

//DELETE PLANT
const deleteMap = async (req, res, next) => {
    res.status(200).json({ message: 'Map was deleted.' })
}

exports.getMap = getMap;
exports.createMap = createMap;
exports.updateMap = updateMap;
exports.deleteMap = deleteMap;