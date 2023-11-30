const express = require('express');
const router = express.Router();
const AlertController = require('../controllers/alertController');

router.post('/create', AlertController.createAlert);
router.get('/', AlertController.getAllAlerts);

module.exports = router;
