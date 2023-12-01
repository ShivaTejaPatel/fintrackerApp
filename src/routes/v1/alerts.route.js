const express = require('express');
const { alertController, userController } = require('../../controllers');
const router = express.Router();

router.post('/create', alertController .createAlert);
router.get('/', alertController.getAllAlerts);
router.post('/desired-rate',  userController.setUserDesiredRate);

// Get user's desired rates
router.get('/desired-rates',  userController.getUserDesiredRates);

router.delete('/desired-rate/:currencyCode',  userController.deleteUserDesiredRate);

module.exports = router;
