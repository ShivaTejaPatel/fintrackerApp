const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  currencyCode_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
    required: true,
  },
  currencyCode_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
    required: true,
  },
  amount_from: {
    type: Number,
    required: true,
  },
  amount_to: {
    type: Number,
    required: true,
  },},{
  timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
