const ExchangeRate = require('../models/exchangeRates.model');
const axios = require('axios');
exports.getAllExchangeRates = async () => {
  try {
    return await ExchangeRate.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createExchangeRate = async (exchangeRateData) => {
  try {
    const newExchangeRate = new ExchangeRate(exchangeRateData);
    return await newExchangeRate.save();
  } catch (err) {
    throw new Error(err.message);
  }
};



const EXCHANGE_RATE_API_URL = '136b3d4cc91447766c244d8d9c3c0f4f';

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(EXCHANGE_RATE_API_URL);
    const exchangeRates = response.data; // Modify this according to the API response format
    return exchangeRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    throw new Error('Failed to fetch exchange rates');
  }
};

module.exports = {
  fetchExchangeRates,
};

// Implement other exchange rate-related services (get by ID, update, delete) similarly
