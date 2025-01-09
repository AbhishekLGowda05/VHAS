const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const Lidar = require('../models/lidar'); // Ensure model file exports correctly

router.post('/data', async (req, res) => {
    const data = req.body;

    // Create a new instance of the Lidar model
    const lidarData = new Lidar(data);

    try {
        // Save the data to the database
        await lidarData.save();
        res.status(201).json({ msg: "Lidar data saved successfully", success: true });
    } catch (error) {
        res.status(400).json({ msg: "Could not access the lidar data", success: false, error: error.message });
    }
});

module.exports = router;
