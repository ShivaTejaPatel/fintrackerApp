const Alert = require('../models/alert.model');

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

// Implement other alert-related services (get by ID, update, delete) similarly
