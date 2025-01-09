const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    License: { type: String, required: true, unique: true }, 
    owner: { type: String, required: true }, 
    location: {
      latitude: { type: Number }, 
      longitude: { type: Number}, 
    },
    anomalies: [
      {
        description: { type: String }, 
        detectedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'stolen', 'emergency'], 
      default: 'active',
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
