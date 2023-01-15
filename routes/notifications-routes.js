const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notification.controller");

// GET all notifications
router.get("/", notificationsController.getAllNotifications);

// GET a specific notification by ID
router.get("/:notification_id", notificationsController.getNotificationById);

// POST a new notification
router.post("/", notificationsController.createNotification);

// PUT (update) a specific notification by ID
router.put("/:notification_id", notificationsController.updateNotificationById);

// DELETE a specific notification by ID
router.delete(
  "/:notification_id",
  notificationsController.deleteNotificationById
);

module.exports = router;
