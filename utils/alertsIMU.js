const express = require('express');
const https = require('https');
const app = express();
const IMU = require('../models/imu'); 
const server = https.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const LINEAR_ACCELERATION_THRESHOLD = 10; 
io.on('connection', (socket) => {
    console.log('A client connected');

    IMU.watch().on('change', (change) => {
        if (change.operationType === 'insert') {
            const imuData = change.fullDocument;

            const { x, y, z } = imuData.linear_acceleration;
            if (
                Math.abs(x) > LINEAR_ACCELERATION_THRESHOLD ||
                Math.abs(y) > LINEAR_ACCELERATION_THRESHOLD ||
                Math.abs(z) > LINEAR_ACCELERATION_THRESHOLD
            ) {
                const alert = {
                    message: 'Abnormal linear acceleration detected!',
                    data: imuData.linear_acceleration,
                };

                io.emit('alert', alert);
                console.log('Alert sent to clients:', alert);
            }
        }
    });

    socket.on('acknowledgeAlert', (data) => {
        console.log('Alert acknowledged by client:', data);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start the server
const PORT = 8000; 
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
