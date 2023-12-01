const express = require('express');
const { alertController, userController } = require('../../controllers');
const router = express.Router();

router.post('/create', alertController .createAlert);
router.get('/', alertController.getAllAlerts);


module.exports = router;
