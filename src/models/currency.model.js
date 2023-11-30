const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  currencyCode: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  timestamps: true,
});

module.exports = mongoose.model('currency', currencySchema);