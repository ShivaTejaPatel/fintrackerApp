

const Transaction = require('../models/transaction.model');

// Function to initiate transactions based on triggered alerts
exports.initiateTransactions = async () => {
  try {
    // Logic to retrieve triggered alerts from the database
    const triggeredAlerts = await Alert.find({ isTriggered: true });

    for (const alert of triggeredAlerts) {
      const { user, currencyCode_from, currencyCode_to } = alert;
      // Perform transaction initiation based on triggered alerts
      // Example: Create a new transaction entry in the database
      
      const newTransaction = new Transaction({
        user,
        currencyCode_from,
        currencyCode_to,
        // Include other transaction details
      });
      
      await newTransaction.save();
    }

    return { success: 'Transactions initiated successfully' };
  } catch (error) {
    console.error('Error initiating transactions:', error.message);
    return { error: 'Failed to initiate transactions' };
  }
};
