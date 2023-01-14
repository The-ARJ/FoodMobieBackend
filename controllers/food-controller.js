const Food = require("../models/Food");
const getAllFoods = (req, res, next) => {
  Food.find()
    .then((foods) => {
      res
        .status(200)
        .json({ message: "All foods retrieved successfully", foods });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving foods", error });
    });
};

const createFood = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.user);
  let food = {
    ...req.body,
    // name: req.body.name,
    image: req.file.filename,
    // meal: req.body.meal,
    // recipe: req.body.recipe,
    // calories: req.body.calories,
    owner: req.user.id,
  };
  Food.create(food)
    .then((food) => {
      res.status(201).json({
        message: "Food created successfully",
        food,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating food",
        error: error.message,
      });
    });
};

const deleteAllFoods = (req, res, next) => {
  Food.deleteMany()
    .then((status) => {
      res
        .status(200)
        .json({ message: "All Foods deleted successfully", status });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting all foods", error });
    });
};

const getFoodById = (req, res, next) => {
  Food.findById(req.params.food_id)
    // .populate("category")
    .then((food) => {
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
      res.json({ message: "Food retrieved successfully", food });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving food", error });
    });
};

const updateFoodById = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      if (!food) {
        res.status(404).json({ message: "Food not found" });
      } else if (food.owner != req.user.id) {
        res.status(403).json({ message: "Not allowed" });
      } else {
        food.name = req.body.name ? req.body.name : food.name;
        food.image = req.body.image ? req.body.image : food.image;
        food.calories = req.body.calories ? req.body.calories : food.calories;
        food.recipe = req.body.recipe ? req.body.recipe : food.recipe;
        food.meal = req.body.meal ? req.body.meal : food.meal;
        food
          .save()
          .then((food) =>
            res.json({ message: "Food updated successfully", food })
          )
          .catch(next);
      }
    })
    .catch(next);
};

const deleteFoodById = (req, res, next) => {
  Food.findByIdAndDelete(req.params.food_id)
    .then((food) => {
      if (food) {
        res.json({ message: "Food item deleted successfully" });
      } else {
        res.status(404).json({ message: "Food item not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting food item", error });
    });
};

module.exports = {
  getAllFoods,
  createFood,
  deleteAllFoods,
  getFoodById,
  updateFoodById,
  deleteFoodById,
};
