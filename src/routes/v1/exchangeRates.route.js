const express = require('express');
const router = express.Router();
const ExchangeRateController = require('../controllers/exchangeRate.controller');

// Define routes for CRUD operations on exchange rates
router.get('/', ExchangeRateController.getAllExchangeRates);
router.post('/create', ExchangeRateController.createExchangeRate);
router.get('/:id', ExchangeRateController.getExchangeRateById);
router.put('/:id', ExchangeRateController.updateExchangeRate);
router.delete('/:id', ExchangeRateController.deleteExchangeRate);

module.exports = router;
