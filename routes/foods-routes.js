const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food-controller");
const reviewController = require("../controllers/review-controller");
const upload = require("../middleware/upload");
const {
  verifyUser,
  verifyManager,
  verifyAdmin,
} = require("../middleware/auth");

router
  .route("/")
  .get(verifyUser,verifyManager,foodController.getAllFoods)
  .post(verifyManager, upload.single("foodImage"), foodController.createFood)
  .put((req, res) => res.status(501).json({ 'msg': "Not implemented" }))
  .delete(verifyAdmin, foodController.deleteAllFoods);

router
  .route("/:food_id")
  .get(foodController.getFoodById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(foodController.updateFoodById)
  .delete(verifyAdmin, foodController.deleteFoodById);

router
  .route("/:food_id/reviews")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview)
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(verifyAdmin, reviewController.deleteAllReviews);

router
  .route("/:food_id/reviews/:review_id")
  .get(reviewController.getReviewById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(reviewController.updateReviewById)
  .delete(reviewController.deleteReviewById);

module.exports = router;
