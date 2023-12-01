
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currencyCode_from: {
    type: String,
    ref: 'currency',
    required: true,
    unique: true,
  },
  currencyCode_to: {
    type: String,
    ref: 'currency',
    required: true,
    unique: true,
  },
  desiredRate: {
    type: Number,
    required: true,
  },
  isTriggered: {
    type: Boolean,
    default: false,
  }
},
  {
    timestamps: true,
});

module.exports = mongoose.model('Alert', alertSchema);
