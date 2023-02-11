const pushNotificationController = require("../controllers/push-notification.controller")
const express = require('express');
const router = express.Router();

router.get("/SendNotifications",pushNotificationController.SendNotification);
router.post("/SendNotificationsToDevices",pushNotificationController.SendNotificationsToDevices);

module.exports = router