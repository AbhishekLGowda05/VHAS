// /models/imu.js
const mongoose = require('mongoose');

const imuSchema = new mongoose.Schema({
    License: { type: String, required: true, unique: true }, 

    orientation: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
        w: { type: Number, required: true },
    },
    angular_velocity: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
    },
    linear_acceleration: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        z: { type: Number, required: true },
    },
    timestamp: { type: Date, default: Date.now }, // Optional: Record the time of data entry
});

module.exports = mongoose.model('IMUData', imuSchema);
