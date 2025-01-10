const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    License: { type: String, required: true }, // Corresponds to License in request body
    owner: { type: String, required: true },
    location: {
      latitude: { type: Number }, // Optional
      longitude: { type: Number }, // Optional
    },
    anomalies: [
      {
        description: { type: String }, // Optional anomaly details
        detectedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'stolen', 'emergency'], // Vehicle status
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
