const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notification.controller");
const upload = require("../middleware/upload");
const {
  verifyUser,
  verifyManager,
  verifyAdmin,
} = require("../middleware/auth");

// GET all notifications
router
  .route("/")
  .get(verifyUser,notificationsController.getAllNotifications)
  .post(verifyManager,
    upload.single("notifyImage"),
    notificationsController.createNotification
  )
  .delete(verifyManager,notificationsController.deleteAllNotifications);

router
  .route("/:notification_id")
  .get(verifyUser,notificationsController.getNotificationById)
  .put(verifyManager,verifyUser,upload.single("notifyImage"),notificationsController.updateNotificationById)
  .delete(verifyManager,notificationsController.deleteNotificationById);

router.get("/get/allunread", verifyUser, notificationsController.getAllUnread);
router.put("/:notification_id/read", notificationsController.markAsRead);
router.put("/read/all",verifyUser, notificationsController.markAllAsRead);
module.exports = router;
