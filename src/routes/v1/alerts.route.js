const express = require('express');
const alertController  = require('../../controllers/alerts.controller');
const router = express.Router();

router.post('/create', alertController.createAlert);
router.get('/', alertController.getAllAlerts);

module.exports = router;
