const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  dataLimit: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  durationUnit: {
    type: String,
    enum: ['hours', 'days', 'weeks', 'months'],
    default: 'days',
  },
  speed: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  features: [String],
  priority: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Package', packageSchema);
