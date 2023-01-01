const Food = require("../models/Food");

const getAllReviews = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      res.json(food.reviews);
    })
    .catch(next);
};

const createReview = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      let review = {
        body: req.body.body,
        reviewer: req.user.id,
      };
      food.reviews.push(review);
      food
        .save()
        .then((food) => res.status(201).json(food.reviews))
        .catch(next);
    })
    .catch(next);
};

const deleteAllReviews = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      food.reviews = [];
      food.save().then((food) => res.json(food));
    })
    .catch(next);
};

const getReviewById = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      let review = food.reviews.find(
        (review) => review.id === req.params.review_id
      );
      if (review) res.json(review);
      else res.json({ msg: "Respective review not found" });
    })
    .catch(next);
};

const updateReviewById = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      let review = food.reviews.id(req.params.review_id);
      if (review == null) {
        res.status(404);
        return next(new Error("Not found"));
      }
      if (review.reviewer != req.user.id) {
        res.status(403);
        return next(new Error("Not authorized"));
      }
      review.body = req.body.body;
      food
        .save()
        .then((food) => res.json(food.reviews))
        .catch(next);
    })
    .catch(next);
};

const deleteReviewById = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      let review = food.reviews.id(req.params.review_id);
      if (review == null) {
        res.status(404);
        return next(new Error("Not found"));
      }
      if (review.reviewer != req.user.id) {
        res.status(403);
        return next(new Error("Not authorized"));
      }
      food.reviews = food.reviews.filter(
        (review) => review.id !== req.params.review_id
      );
      food
        .save()
        .then((food) => res.json(food.reviews))
        .catch(next);
    })
    .catch(next);
};
module.exports = {
  getAllReviews,
  createReview,
  deleteAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
