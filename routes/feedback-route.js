const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback-controller");
const upload = require("../middleware/upload");
const {
  verifyUser,
  verifyManager,
  verifyAdmin,
} = require("../middleware/auth");

router
  .route("/")
  .get(verifyManager, feedbackController.getAllFeedbacks)
  .post(
    verifyUser,
    upload.single("feedbackImage"),
    feedbackController.createFeedback
  )
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(verifyAdmin, verifyManager, feedbackController.deleteAllFeedbacks);

router
  .route("/:feedback_id")
  .get(verifyManager,feedbackController.getFeedbackById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(verifyAdmin, feedbackController.deleteFeedbackById);

module.exports = router;
