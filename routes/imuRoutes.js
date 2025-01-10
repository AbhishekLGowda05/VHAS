const express = require('express');
const IMUData = require('../models/imu'); // Import IMU model
const Vehicle = require('../models/vehicle'); // Import Vehicle model
const User = require('../models/user'); // Import the User model

const router = express.Router();

// Add IMU data with License verification
router.post('/add-imu', async (req, res) => {
  const { License, orientation, angular_velocity, linear_acceleration } = req.body;

  try {
    // Step 1: Validate input
    if (!License || typeof License !== 'string' || License.trim() === '') {
      return res.status(400).json({ success: false, message: 'License is required and must be a valid string' });
    }

    if (!orientation || !angular_velocity || !linear_acceleration) {
      return res.status(400).json({ success: false, message: 'All IMU fields (orientation, angular_velocity, linear_acceleration) are required' });
    }

    // Step 2: Check if the License exists in the Vehicle model
    const vehicle = await User.findOne({ vehicleId:License });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle with the given License does not exist' });
    }

    // Step 3: Add IMU data to the database
    const imuData = new IMUData({
      License,
      orientation,
      angular_velocity,
      linear_acceleration,
    });

    await imuData.save();

    // Step 4: Respond with success
    res.status(201).json({
      success: true,
      message: 'IMU data added successfully',
      data: imuData,
    });
  } catch (error) {
    console.error('Error adding IMU data:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
