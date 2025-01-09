const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const Lidar = require('../models/lidar'); 
const { Server } = require('socket.io');
const app = express();
const server = https.createServer(app);
const io = new Server(server);

const PROXIMITY_THRESHOLD = 2.0;

io.on('connection', (socket) => {
    console.log('A client connected');

    Lidar.watch().on('change', async (change) => {
        if (change.operationType === 'insert') {
            const lidarData = change.fullDocument;

            const obstructionDistances = lidarData.distanceReadings.filter(
                (distance) => distance <= PROXIMITY_THRESHOLD
            );

            if (obstructionDistances.length > 0) {
                const alert = {
                    license: lidarData.License,
                    message: `Obstruction detected within ${PROXIMITY_THRESHOLD} meters!`,
                    details: {
                        totalObstructions: obstructionDistances.length,
                        obstructionDistances: obstructionDistances,
                    },
                };

                io.emit('alert', alert);
                console.log('LiDAR Alert sent to clients:', alert);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

const PORT = 5000; 
server.listen(PORT, () => {
    console.log(`LiDAR Alert Server running on port ${PORT}`);
});
