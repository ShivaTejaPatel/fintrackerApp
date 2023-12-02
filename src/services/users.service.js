const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.registerUser = async (username, email, password) => {
  try {
    let user = await User.findOne({ email });

    if (user) {
      return { error: 'User already exists' };
    }

    const newUser = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    return { success: 'User registered successfully' };
  } catch (err) {
    console.error(err.message);
    return { error: 'Server Error' };
  }
};


exports.loginUser = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: 'Invalid credentials' };
    }

  
    user.isLoggedIn = true;
    await user.save();

    return { success: 'Logged in successfully' };
  } catch (err) {
    console.error(err.message);
    return { error: 'Server Error' };
  }
};


exports.logoutUser = async (userId) => {
  try {
    let user = await User.findById(userId);

    if (!user) {
      return { error: 'User not found' };
    }

    user.isLoggedIn = false;
    await user.save();

    return { success: 'Logged out successfully' };
  } catch (err) {
    console.error(err.message);
    return { error: 'Server Error' };
  }
};

const currentExchangeRates = {
  USD_EUR: 0.85, 
  USD_JPY: 110.5, 
  EUR_USD: 1.18, 
};



exports.checkAndTriggerAlerts = async (userId) => {
  try {
    // Fetch the user by ID with their alerts
    const user = await User.findById(userId).populate('alerts');

    if (!user) {
      return { error: 'User not found' };
    }

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

    return { success: 'Alerts checked and triggered successfully' };
  } catch (error) {
    console.error('Error checking and triggering alerts:', error.message);
    return { error: 'Failed to check and trigger alerts' };
  }
};









/*exports.setUserDesiredRates = async (userId, currencyRates) => {
  try {
    // Logic to set or update the user's desired rates in the database
    // Use userId to identify the user and currencyRates to specify the desired rates for different pairs
    // Update the user's desired rates in the database

    // Example logic (MongoDB):
    const updateObj = {};
    currencyRates.forEach(({ currencyCode, desiredRate }) => {
      updateObj[`desiredRates.${currencyCode}`] = desiredRate;
    });

    await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateObj },
      { new: true }
    );

    return { success: 'Desired rates set/updated successfully' };
  } catch (error) {
    console.error('Error setting user desired rates:', error.message);
    return { error: 'Failed to set desired rates' };
  }
};


// Function to get user's desired rates
exports.getUserDesiredRates = async (userId) => {
  try {
    // Logic to fetch and return the user's desired rates from the database

    // Example logic (MongoDB):
    const user = await User.findById(userId);
    const desiredRates = user.desiredRates || {};

    return desiredRates;
  } catch (error) {
    console.error('Error fetching user desired rates:', error.message);
    return { error: 'Failed to fetch desired rates' };
  }
};

// Function to delete user's desired rate
exports.deleteUserDesiredRate = async (userId, currencyCode) => {
  try {
    // Logic to delete the user's desired rate from the database

    // Example logic (MongoDB):
    await User.findOneAndUpdate(
      { _id: userId },
      { $unset: { [`desiredRates.${currencyCode}`]: 1 } }
    );

    return { success: 'Desired rate deleted successfully' };
  } catch (error) {
    console.error('Error deleting user desired rate:', error.message);
    return { error: 'Failed to delete desired rate' };
  }
};
*/