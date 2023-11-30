const alertService = require('../services/alerts.service');
const transactionService = require('../services/transaction.service');
exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getAllAlerts();
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAlert = async (req, res) => {
  const alertData = req.body;

  try {
    const newAlert = await alertService.createAlert(alertData);
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Implement other alert-related controllers using alertService functions (get by ID, update, delete)
// alerts.controller.js




exports.initiateTransactions = async (req, res) => {
  try {
    const result = await alertService.checkAndTriggerAlerts(); // Check and trigger alerts
    
    if ('error' in result) {
      return res.status(400).json({ msg: result.error });
    }

    // Perform transaction initiation based on triggered alerts
    const transactionResult = await transactionService.initiateTransactions();

    if ('error' in transactionResult) {
      return res.status(400).json({ msg: transactionResult.error });
    }

    res.status(200).json({ msg: transactionResult.success });
  } catch (error) {
    console.error('Error initiating transactions:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
