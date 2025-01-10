const express = require('express');
const router = express.Router();
const User = require('../models/user'); // User model
const Vehicle = require('../models/vehicle'); // Vehicle model

router.post('/signup', async (req, res) => {
  const { vehicleId, owner, password } = req.body;

  if (!vehicleId || !owner || !password) {
    return res.status(400).json({ msg: 'Please enter all the required fields', success: false });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ vehicleId });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this vehicleId already exists', success: false });
    }

    // Check if the vehicle already exists
    const existingVehicle = await Vehicle.findOne({ License: vehicleId });
    if (existingVehicle) {
      return res.status(400).json({ msg: 'Vehicle with this License already exists', success: false });
    }

    // Create a new user
    const newUser = new User({ vehicleId, owner, password });
    await newUser.save();

    // Create a corresponding vehicle
    const newVehicle = new Vehicle({
      License: vehicleId,
      owner,
      status: 'active', // Default status
    });
    await newVehicle.save();

    // Respond with success
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
