const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/users.controller');
const AlertController = require('../../controllers/alerts.controller');

router.post('/create', AlertController.createAlert);
router.get('/', AlertController.getAllAlerts);
router.post('/desired-rate',  UserController.setUserDesiredRate);

// Get user's desired rates
router.get('/desired-rates',  UserController.getUserDesiredRates);

router.delete('/desired-rate/:currencyCode',  UserController.deleteUserDesiredRate);

module.exports = router;
