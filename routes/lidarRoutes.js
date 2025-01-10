const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle'); // Import the Vehicle model
const Lidar = require('../models/lidar'); // Import the Lidar model
const User = require('../models/user'); // Import the User model
// Add LiDAR data with License verification
router.post('/add-lidar', async (req, res) => {
  const { License, distanceReadings } = req.body;

  try {
    // Step 1: Validate input
    if (!License || typeof License !== 'string' || License.trim() === '') {
      return res.status(400).json({ success: false, message: 'License is required and must be a valid string' });
    }

    if (!Array.isArray(distanceReadings) || distanceReadings.length === 0) {
      return res.status(400).json({ success: false, message: 'Distance readings must be a non-empty array' });
    }

    // Step 2: Check if the License exists in the Vehicle model
    const vehicle = await User.findOne({ vehicleId:License });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle with the given License does not exist' });
    }

    // Step 3: Add LiDAR data to the database
    const lidarData = new Lidar({ License, distanceReadings });
    await lidarData.save();

    // Step 4: Respond with success
    res.status(201).json({
      success: true,
      message: 'LiDAR data added successfully',
      data: lidarData,
    });
  } catch (error) {
    console.error('Error adding LiDAR data:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
