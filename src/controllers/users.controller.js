const userService = require('../services/users.service');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const registrationResult = await userService.registerUser(username, email, password);

  if ('error' in registrationResult) {
    return res.status(400).json({ msg: registrationResult.error });
  }

  res.status(201).json({ msg: registrationResult.success });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const loginResult = await userService.loginUser(email, password);

  if ('error' in loginResult) {
    return res.status(400).json({ msg: loginResult.error });
  }

  res.status(200).json({ msg: loginResult.success });
};



exports.setUserDesiredRates = async (req, res) => {
  const { userId } = req.user; // Extract user ID from the authenticated user
  const { currencyRates } = req.body; // Array of currency pairs with desired rates

  const result = await userService.setUserDesiredRates(userId, currencyRates);

  if ('error' in result) {
    return res.status(400).json({ msg: result.error });
  }

  res.status(200).json({ msg: result.success });
};


exports.getUserDesiredRates = async (req, res) => {
  const { userId } = req.user; // Extract user ID from the authenticated user

  const desiredRates = await userService.getUserDesiredRates(userId);

  if ('error' in desiredRates) {
    return res.status(400).json({ msg: desiredRates.error });
  }

  res.status(200).json({ desiredRates });
};

exports.deleteUserDesiredRate = async (req, res) => {
  const { userId } = req.user; // Extract user ID from the authenticated user
  const { currencyCode } = req.params;

  const result = await userService.deleteUserDesiredRate(userId, currencyCode);

  if ('error' in result) {
    return res.status(400).json({ msg: result.error });
  }

  res.status(200).json({ msg: result.success });
};
