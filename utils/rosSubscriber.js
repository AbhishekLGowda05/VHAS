const rosnodejs = require('rosnodejs');
const Lidar = require('../models/lidar'); // Import the existing model

async function initializeLidarSubscriber() {
    try {
        // Initialize ROS Node
        await rosnodejs.initNode('/lidar_subscriber_node', { onTheFly: true });

        const nh = rosnodejs.nh;
        const sensor_msgs = rosnodejs.require('sensor_msgs').msg;

        // Subscribe to the ROS topic
        nh.subscribe('/scan', sensor_msgs.LaserScan, async (msg) => {
            try {
                const distanceReadings = msg.ranges; // Extract distance readings

                // Save to MongoDB
                const lidarData = new Lidar({ distanceReadings });
                await lidarData.save();

                console.log('Lidar data saved successfully');
            } catch (error) {
                console.error('Error saving Lidar data:', error);
            }
        });

        console.log('Subscribed to /scan topic');
    } catch (err) {
        console.error('Error initializing ROS Node:', err);
    }
}

module.exports = initializeLidarSubscriber;
