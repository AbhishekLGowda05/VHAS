const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Ensure JWT_SECRET is loaded from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

// **Signup Route**
router.post('/signup', async (req, res) => {
  const { License, owner, password, latitude, longitude } = req.body;

  try {
    // Step 1: Validate input
    if (!License || !owner || !password || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Step 2: Check if vehicle already exists
    const existingVehicle = await Vehicle.findOne({ License });
    if (existingVehicle) {
      return res.status(400).json({ success: false, message: 'Vehicle with this License already exists' });
    }

    // Step 3: Check if user already exists
    const existingUser = await User.findOne({ vehicleId: License });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this License already exists' });
    }

    // Step 4: Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      vehicleId: License,
      owner,
      password: hashedPassword,
    });
    await newUser.save();

    // Step 5: Create a new vehicle
    const newVehicle = new Vehicle({
      License,
      owner,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    await newVehicle.save();

    // Step 6: Generate JWT Token
    const token = jwt.sign({ License, owner }, JWT_SECRET, { expiresIn: '1h' });

    // Step 7: Respond with success
    res.status(201).json({
      success: true,
      message: 'Signup successful',
      token,
      user: {
        vehicleId: newUser.vehicleId,
        owner: newUser.owner,
      },
      vehicle: {
        License: newVehicle.License,
        owner: newVehicle.owner,
        status: newVehicle.status,
        location: newVehicle.location,
      },
    });
  } catch (error) {
    console.error('Signup error:', error.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// **Login Route**
router.post('/login', async (req, res) => {
  const { License, owner, password } = req.body;

  try {
    // Step 1: Validate input
    if (!License || !owner || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Step 2: Find the user by vehicleId
    const user = await User.findOne({ vehicleId: License });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Step 3: Verify owner
    if (user.owner !== owner) {
      return res.status(401).json({ success: false, message: 'Owner verification failed' });
    }

    // Step 4: Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Step 5: Find the vehicle by License
    const vehicle = await Vehicle.findOne({ License });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // Step 6: Verify vehicle status
    if (vehicle.status !== 'active') {
      return res.status(403).json({ success: false, message: `Vehicle is not active. Current status: ${vehicle.status}` });
    }

    // Step 7: Generate JWT Token
    const token = jwt.sign({ License, owner }, JWT_SECRET, { expiresIn: '1h' });

    // Step 8: Respond with success
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        License: vehicle.License,
        owner: vehicle.owner,
        status: vehicle.status,
        location: vehicle.location,
      },
    });
  } catch (error) {
    console.error('Login error:', error.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
