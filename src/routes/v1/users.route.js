const express = require('express');
const router = express.Router();
const { userController } = require('../../controllers');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id/istriggered', userController.checkAndTriggerAlerts);


module.exports = router;
