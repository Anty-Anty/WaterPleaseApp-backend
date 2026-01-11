const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    img: { type: String },
    wLevel: { type: Number, required: true, min: 1, max: 3 },
    lastWateredDate: { type: String, required: true },
    daysToNextWatering: { type: Number, required: true, min: 0 },
    // Index of square on the map (null = not placed)
    mapPosition: { type: Number, default: null, },
    // Reference to map (null if not on any map)
    map: { type: mongoose.Schema.Types.ObjectId, ref: "Map", default: null }
  }
);

module.exports = mongoose.model("Plant", plantSchema);