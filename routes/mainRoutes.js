const express = require('express');
const router = express.Router();
const login = require('./login')
const lidar = require('./lidarRoutes');
const imu = require('./imuRoutes');
console.log('Main routes loaded');
router.use('/user',login);
router.use('/lidar',lidar);
router.use('/imu',imu);


module.exports=router;
