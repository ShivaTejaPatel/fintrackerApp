const exchangeRateService = require('../services/exchangeRates.service');

exports.getAllExchangeRates = async (req, res) => {
  try {
    const exchangeRates = await exchangeRateService.getAllExchangeRates();
    res.status(200).json(exchangeRates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExchangeRate = async (req, res) => {
  const exchangeRateData = req.body;

  try {
    const newExchangeRate = await exchangeRateService.createExchangeRate(exchangeRateData);
    res.status(201).json(newExchangeRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Implement other exchange rate-related controllers using exchangeRateService functions
