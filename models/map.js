const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema(
    {
        columnsNumber: { type: Number, required: true, default: 6 },
        selectedSquares: { type: [Number], default: [] },
        // Plants currently on this map
        plants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
    }
);

module.exports = mongoose.model("Map", mapSchema);