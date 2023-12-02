const Alert = require('../models/alerts.model');
const User = require('../models/users.model');
exports.createAlert = async (alertData) => {
  try {
    const { userId, currencyCode_from, currencyCode_to, desiredRate } = alertData;

    // Check if the user exists and is logged in
    console.log(userId);
    const user = await User.findOne({ _id: userId });

    if (!user || !user.isLoggedIn) {
      throw new Error('User not found or not logged in');
    }
    

    // Creating the alert only if the user is found and logged in
    const newAlert = new Alert({ user: userId, currencyCode_from, currencyCode_to, desiredRate });
    return await newAlert.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllAlerts = async () => {
  try {
    return await Alert.find();
  } catch (err) {
    throw new Error(err.message);
  }
};



