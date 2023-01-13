const express = require("express");
const router = express.Router();
const {
  recommendedFood,
  recommendationController,
} = require("../utils/recommendation");

router.get("/", (req, res) => {
  res.json(recommendedFood);
});

router.get("/breakfast", (req, res) => {
  res.status(200).json(recommendedFood.breakfast);
});

module.exports = router;
