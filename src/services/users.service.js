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

    return { success: 'Logged in successfully' };
  } catch (err) {
    console.error(err.message);
    return { error: 'Server Error' };
  }
};


// userService.js

// Function to set or update user's desired rate
exports.setUserDesiredRate = async (userId, currencyCode, desiredRate) => {
  try {
    // Logic to set or update the user's desired rate in the database
    // Use userId to identify the user, currencyCode to specify the currency, and desiredRate to set the rate
    // Update the user's desired rate in the database

    // Example logic (MongoDB):
    await User.findOneAndUpdate(
      { _id: userId },
      { $set: { desiredRates: { [currencyCode]: desiredRate } } },
      { new: true }
    );

    return { success: 'Desired rate set/updated successfully' };
  } catch (error) {
    console.error('Error setting user desired rate:', error.message);
    return { error: 'Failed to set desired rate' };
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
