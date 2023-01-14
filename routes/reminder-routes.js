const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminder-controller");
const {verifyUser} = require("../middleware/auth");

router
  .route("/")
  .get(verifyUser, reminderController.getAllReminders)
  .post(verifyUser, reminderController.createReminder)
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(verifyUser, reminderController.deleteAllReminders);

router
  .route("/:reminder_id")
  .get(reminderController.getReminderById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(verifyUser, reminderController.updateReminderById)
  .delete(verifyUser, reminderController.deleteReminderById);

module.exports = router;
