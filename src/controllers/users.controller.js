const { use } = require('../routes/v1/alerts.route');
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

exports.checkAndTriggerAlerts = async (req, res) => {
  try {
    const { id } = req.params;
    const alerts = await userService.checkAndTriggerAlerts(id);
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}