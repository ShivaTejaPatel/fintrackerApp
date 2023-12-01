const express = require('express');
const { currencyController } = require('../../controllers');
const router = express.Router();

// Define routes for CRUD operations on currencies
router.get('/', currencyController.getAllCurrencies);
router.post('/create', currencyController.createCurrency);


module.exports = router;
