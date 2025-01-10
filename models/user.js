const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true }, // Corresponds to License in request body
  owner: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
