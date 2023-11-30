const express = require('express');
const router = express.Router();
const TransactionController = require('../../controllers/transaction.controller');

// Endpoint to create a new transaction
router.post('/create', TransactionController.createTransaction);

// Endpoint to initiate transactions based on triggered alerts
router.post('/initiate', TransactionController.initiateTransactions);

module.exports = router;
