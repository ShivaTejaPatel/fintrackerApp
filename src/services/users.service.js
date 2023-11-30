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
