const express = require('express');
const router = express.Router();
const { userController } = require('../../controllers');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/desired-rate',  userController.setUserDesiredRates);

router.get('/desired-rates',  userController.getUserDesiredRates);

router.delete('/desired-rate/:currencyCode',  userController.deleteUserDesiredRate);

module.exports = router;
