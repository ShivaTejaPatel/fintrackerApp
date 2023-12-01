const { currencyService } = require("../services");

const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await currencyService.getAllCurrencies();
    res.status(200).json(currencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCurrency = async (req, res) => {
  const currencyData = req.body;

  try {
    const newCurrency = await currencyService.createCurrency(currencyData);
    res.status(201).json(newCurrency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllCurrencies, createCurrency }