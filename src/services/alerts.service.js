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





// Function to check and trigger alerts based on user-defined rates
exports.checkAndTriggerAlerts = async () => {
  try {
    const users = await User.find().populate('alerts'); // Assuming alerts are stored in the 'alerts' field in the User model

    users.forEach(async (user) => {
      const { desiredRates, alerts } = user;

      for (const alert of alerts) {
        const { currencyCode_from, currencyCode_to, desiredRate } = alert;
        
        // Check if the current exchange rate matches the user's desired rate
        if (desiredRates[currencyCode_from] === desiredRate) {
          // Trigger alert (update 'isTriggered' field or perform necessary actions)
          alert.isTriggered = true;
          await alert.save();

          // Trigger email notification
          await emailService.sendAlertNotification(user.email, currencyCode_from, currencyCode_to, desiredRate);
        }
      }
    });

    return { success: 'Alerts checked and triggered successfully' };
  } catch (error) {
    console.error('Error checking and triggering alerts:', error.message);
    return { error: 'Failed to check and trigger alerts' };
  }
};

