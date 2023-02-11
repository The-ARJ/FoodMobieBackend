const express = require("express");
const router = express.Router();
const {
  recommendedFood,
  recommendedbreakfastFood,
  recommendeddinnerFood,
} = require("../controllers/recommedation-controller");

const validMeals = ["breakfast", "lunch", "dinner"]; // array of valid meal types

router.get("/breakfast", (req, res) => {
  let { meal } = req.query;
  if (!meal) {
    return res.json(recommendedbreakfastFood);
  }
  meal = meal.toLowerCase();
  if (validMeals.includes(meal)) {
    if (meal in recommendedbreakfastFood) {
      return res.status(200).json(recommendedbreakfastFood[meal]);
    } else {
      return res
        .status(204)
        .json({ message: "No data available for this meal type" });
    }
  } else {
    return res.status(400).json({ message: "Invalid meal type" });
  }
});
router.get("/lunch", (req, res) => {
  let { meal } = req.query;
  if (!meal) {
    return res.json(recommendedFood);
  }
  meal = meal.toLowerCase();
  if (validMeals.includes(meal)) {
    if (meal in recommendedFood) {
      return res.status(200).json(recommendedFood[meal]);
    } else {
      return res
        .status(204)
        .json({ message: "No data available for this meal type" });
    }
  } else {
    return res.status(400).json({ message: "Invalid meal type" });
  }
});

router.get("/dinner", (req, res) => {
  let { meal } = req.query;
  if (!meal) {
    return res.json(recommendeddinnerFood);
  }
  meal = meal.toLowerCase();
  if (validMeals.includes(meal)) {
    if (meal in recommendeddinnerFood) {
      return res.status(200).json(recommendedFood[meal]);
    } else {
      return res
        .status(204)
        .json({ message: "No data available for this meal type" });
    }
  } else {
    return res.status(400).json({ message: "Invalid meal type" });
  }
});

module.exports = router;
