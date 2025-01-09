const express = require('express');
const IMUData = require('../models/imu');

const router = express.Router();

router.post('/data', async (req, res) => {
    const { orientation, angular_velocity, linear_acceleration } = req.body;

    try {
        if (!orientation || !angular_velocity || !linear_acceleration) {
            return res.status(400).json({ msg: "All fields are required", success: false });
        }

        const imuData = new IMUData({ orientation, angular_velocity, linear_acceleration });

        await imuData.save();
        res.status(201).json({ msg: "IMU data saved successfully", success: true });
    } catch (error) {
        res.status(400).json({ msg: "Could not save IMU data", success: false, error: error.message });
    }
});

module.exports = router;
