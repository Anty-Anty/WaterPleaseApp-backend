const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Plant = require('../models/plant');
const Map = require("../models/map");

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
  const plantId = req.params.pid;

  let plant;
  let map;

  try {
    plant = await Plant.findById(plantId);
    map = await Map.findOne({}); // single map
  } catch (err) {
    return next(new HttpError("Fetching plant or map failed.", 500));
  }

  if (!plant) {
    return next(new HttpError("Plant not found.", 404));
  }

  // Update plant fields
  plant.title = title;
  plant.img = img;
  plant.wLevel = wLevel;
  plant.lastWateredDate = lastWateredDate;
  plant.daysToNextWatering = daysToNextWatering;
  plant.mapPosition = mapPosition;

  // Start transaction
  const sess = await mongoose.startSession();
  sess.startTransaction();

  try {
    await plant.save({ session: sess });

    if (map) {
      if (mapPosition === null) {
        // Remove plant from map
        map.plants.pull(plant._id);
        plant.map = null;
      } else {
        // Add plant to map if not already there
        if (!map.plants.includes(plant._id)) {
          map.plants.push(plant._id);
        }
        plant.map = map._id;
      }

      await map.save({ session: sess });
    }

    await sess.commitTransaction();
  } catch (err) {
    await sess.abortTransaction();
    return next(new HttpError("Updating plant failed.", 500));
  } finally {
    sess.endSession();
  }

  res.status(200).json({ plant: plant.toObject({ getters: true }) });
    
};

//DELETE PLANT
const deletePlant = async (req, res, next) => {
    res.status(200).json({ message: 'Item was deleted.' })
}

exports.getPlantsList = getPlantsList;
exports.createPlant = createPlant;
exports.updatePlant = updatePlant;
exports.deletePlant = deletePlant;