const rosnodejs = require('rosnodejs');
const IMU = require('../models/imu'); // Import the IMU model

async function initializeIMUSubscriber() {
    try {
        // Initialize ROS Node
        await rosnodejs.initNode('/imu_subscriber_node', { onTheFly: true });

        const nh = rosnodejs.nh;
        const sensor_msgs = rosnodejs.require('sensor_msgs').msg;

        // Subscribe to the IMU topic
        nh.subscribe('/imu/data', sensor_msgs.Imu, async (msg) => {
            try {
                const imuData = {
                    orientation: {
                        x: msg.orientation.x,
                        y: msg.orientation.y,
                        z: msg.orientation.z,
                        w: msg.orientation.w,
                    },
                    angular_velocity: {
                        x: msg.angular_velocity.x,
                        y: msg.angular_velocity.y,
                        z: msg.angular_velocity.z,
                    },
                    linear_acceleration: {
                        x: msg.linear_acceleration.x,
                        y: msg.linear_acceleration.y,
                        z: msg.linear_acceleration.z,
                    },
                };

                // Save to MongoDB
                const imuEntry = new IMU(imuData);
                await imuEntry.save();

                console.log('IMU data saved successfully');
            } catch (error) {
                console.error('Error saving IMU data:', error);
            }
        });

        console.log('Subscribed to /imu/data topic');
    } catch (err) {
        console.error('Error initializing ROS Node:', err);
    }
}

module.exports = initializeIMUSubscriber;
