const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  currencyCode_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
    required: true,
    unique: true,
  },
  currencyCode_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    required: true,
    unique: true
  }
}, { timestamps: true }); // Ensure timestamps option is provided within the options object

module.exports = mongoose.model('exchangeRate', exchangeRateSchema);
