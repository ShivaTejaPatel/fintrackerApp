const alertService = require('../services/alerts.service');
exports.createAlert = async (req, res) => {
  const alertData = req.body;
  const userId = alertData.userId; 

  console.log('User ID:', userId); 

  try {
    const newAlert = await alertService.createAlert(alertData);
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await alertService.getAllAlerts();
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};









