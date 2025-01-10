const express = require('express');
const router = express.Router();
const User = require('../models/user'); // User model
const Vehicle = require('../models/vehicle'); // Vehicle model

router.post('/signup', async (req, res) => {
  const { vehicleId, owner, password, location, anomalies, status } = req.body;

  // Step 1: Validate input
  if ( !owner || !password) {
    return res.status(400).json({ msg: 'Please enter all the required fields (vehicleId, owner, password)', success: false });
  }

  try {
    // Step 2: Check if the user already exists
    const existingUser = await User.findOne({ vehicleId });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this vehicleId already exists', success: false });
    }

    // Step 3: Check if the vehicle already exists
    const existingVehicle = await Vehicle.findOne({ License: vehicleId });
    if (existingVehicle) {
      return res.status(400).json({ msg: 'Vehicle with this License already exists', success: false });
    }

    // Step 4: Create a new user
    const newUser = new User({ vehicleId, owner, password });
    await newUser.save();

    // Step 5: Create a corresponding vehicle
    const newVehicle = new Vehicle({
      License: vehicleId,
      owner,
      location: location || {}, // Optional field
      anomalies: anomalies || [], // Optional field
      status: status || 'active', // Default to 'active' if not provided
    });
    await newVehicle.save();

    // Step 6: Respond with success
    res.status(201).json({
      success: true,
      msg: 'User signup successful, and vehicle added successfully',
      data: {
        user: newUser,
        vehicle: newVehicle,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ success: false, msg: 'Internal server error', error: error.message });
  }
});

module.exports = router;
