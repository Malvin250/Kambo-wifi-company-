const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: Date,
  duration: Number,
  dataUsed: Number,
  status: {
    type: String,
    enum: ['active', 'ended', 'expired'],
    default: 'active',
  },
  deviceType: String,
  ipAddress: String,
  macAddress: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
