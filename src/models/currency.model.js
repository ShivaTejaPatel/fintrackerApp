const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  currencyCode: {
    type: String,
    required: true,
    
  },
  currencyName: {
    type: String,
    required: true,
  
  }

},
  {
    timestamps: true
});

module.exports = mongoose.model('currency', currencySchema);