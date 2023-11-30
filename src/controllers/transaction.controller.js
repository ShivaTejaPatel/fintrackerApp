const TransactionService = require('../services/transaction.service');

exports.createTransaction = async (req, res) => {
  try {
    // Get data from request body
    const { userId, currencyCode_from, currencyCode_to, amount_from, amount_to } = req.body;

    // Call the service to create a new transaction
    const newTransaction = await TransactionService.createTransaction(userId, currencyCode_from, currencyCode_to, amount_from, amount_to);

    res.status(201).json({ transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.initiateTransactions = async (req, res) => {
  try {
    // Call the service to initiate transactions based on triggered alerts
    const result = await TransactionService.initiateTransactions();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initiate transactions' });
  }
};
