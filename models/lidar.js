const mongoose = require('mongoose');

const lidarSchema = new mongoose.Schema({
    License: { type: String, required: true, unique: true }, 

   
    distanceReadings: [Number]
});

module.exports = mongoose.model('LidarData', lidarSchema);
