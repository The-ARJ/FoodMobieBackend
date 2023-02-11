const Feedback = require("../models/Feedback");
const getAllFeedbacks = (req, res, next) => {
  Feedback.find()
    .then((feedback) => {
      res.status(200).json({
        success: true,
        message: "All feedbacks retrieved successfully",
        data: feedback,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving feedbacks", error });
    });
};
const createFeedback = (req, res, next) => {
  let feedback = {
    ...req.body,
    owner: req.user.id,
  };
  Feedback.create(feedback)
    .then((feedback) => {
      res.status(201).json({
        message: "Feedback created successfully",
        feedback,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating feedback",
        error: error.message,
      });
    });
};

const deleteAllFeedbacks = (req, res, next) => {
  Feedback.deleteMany()
    .then((status) => {
      res
        .status(200)
        .json({ message: "All Feedbacks deleted successfully", status });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting all feedbacks", error });
    });
};

const getFeedbackById = (req, res, next) => {
  Feedback.findById(req.params.feedback_id)
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.json({
        success: true,
        message: "Feedback retrieved successfully",
        data: feedback,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving feedback", error });
    });
};
const deleteFeedbackById = (req, res, next) => {
  Feedback.findByIdAndDelete(req.params.feedback_id, req.body)
    .then((feedback) => {
      if (feedback) {
        res.json({ message: "Feedback item deleted successfully" });
      } else {
        res.status(404).json({ message: "Feedback item not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting feedback item", error });
    });
};

module.exports = {
  getAllFeedbacks,
  createFeedback,
  deleteAllFeedbacks,
  deleteFeedbackById,
  getFeedbackById,
};
