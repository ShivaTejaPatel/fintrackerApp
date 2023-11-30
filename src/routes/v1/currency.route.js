const express = require('express');
const router = express.Router();
const CurrencyController = require('../../controllers/currency.controller');

// Define routes for CRUD operations on currencies
router.get('/', CurrencyController.getAllCurrencies);
router.post('/create', CurrencyController.createCurrency);
router.get('/:id', CurrencyController.getCurrencyById);
router.put('/:id', CurrencyController.updateCurrency);
router.delete('/:id', CurrencyController.deleteCurrency);

module.exports = router;
