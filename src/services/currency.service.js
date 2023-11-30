const Currency = require('../models/currency.model');

exports.getAllCurrencies = async () => {
  try {
    return await Currency.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createCurrency = async (currencyData) => {
  try {
    const newCurrency = new Currency(currencyData);
    return await newCurrency.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

// Implement other currency-related services (get by ID, update, delete) similarly
