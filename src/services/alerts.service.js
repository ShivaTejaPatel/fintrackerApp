const Alert = require('../models/alerts.model');
const User = require('../models/users.model');
exports.getAllAlerts = async () => {
  try {
    return await Alert.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createAlert = async (alertData) => {
  try {
    const newAlert = new Alert(alertData);
    return await newAlert.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
const currentExchangeRates = {
  USD_EUR: 0.85, 
  USD_JPY: 110.5, 
  EUR_USD: 1.18, 
};



exports.checkAndTriggerAlerts = async () => {
  try {
    const users = await User.find().populate('alerts');

    for (const user of users) {
      const { desiredRates, alerts, email } = user;

      for (const alert of alerts) {
        const { currencyCode_from, currencyCode_to, desiredRate } = alert;
        
        // Simulated current exchange rate (replace this with your real logic to fetch rates)
        const currentRate = currentExchangeRates[`${currencyCode_from}_${currencyCode_to}`];

        // Check if the simulated exchange rate surpasses or equals the user's desired rate
        if (currentRate >= desiredRate) {
          // Trigger alert (update 'isTriggered' field or perform necessary actions)
          alert.isTriggered = true;
          await alert.save();

          // Trigger email notification
          await emailService.sendAlertNotification(email, currencyCode_from, currencyCode_to, desiredRate);
        }
      }
    }

    return { success: 'Alerts checked and triggered successfully' };
  } catch (error) {
    console.error('Error checking and triggering alerts:', error.message);
    return { error: 'Failed to check and trigger alerts' };
  }
};


