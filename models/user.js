const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    vehicleId: { type: String, required: true, unique: true },
    owner: { type: String, required: true }, 
    communityPoints: { type: Number, default: 0 },
    password: { type: String, required: true },
  },
  { timestamps: true } 
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
