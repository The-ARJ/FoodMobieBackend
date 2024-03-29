const Food = require("../models/Food");
const csvtojson = require('csvtojson');

const getAllFoods = (req, res, next) => {
  Food.find()
    .then((foods) => {
      res.status(200).json({
        success: true,
        message: "All foods retrieved successfully",
        data: foods,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving foods", error });
    });
};

const createFood = (req, res, next) => {
  let food = {
    ...req.body,
    owner: req.user.id,
  };
  
  if (req.file) {
    food.image = "/food_images/" + req.file.filename;
  }

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

// POST /foods/bulk
// Upload bulk food data from a CSV file
const uploadBulkFoods = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const foods = await csvtojson().fromFile(file.path);
    if (!foods || foods.length === 0) {
      return res.status(400).json({ message: "CSV file is empty" });
    }
    const userId = req.user.id;
    const foodsToCreate = foods.map((food) => {
      return {
        ...food,
        image: "/food_images/" + food.image,
        owner: userId,
      };
    });
    const createdFoods = await Food.insertMany(foodsToCreate);
    return res.status(201).json({
      message: "Bulk food data uploaded successfully",
      foods: createdFoods,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error uploading bulk food data",
        error: error.message,
      });
  }
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
      res.json({
        success: true,
        message: "Food retrieved successfully",
        data: food,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving food", error });
    });
};

const updateFoodById = (req, res, next) => {

  Food.findById(req.params.food_id)
    .then((food) => {
      if (!food) {
        return res.status(404).json({ error: "Food not found" });
      }

      food.name = req.body.name || food.name;
      food.meal = req.body.meal || food.meal;
      food.recipe = req.body.recipe || food.recipe;
      food.time = req.body.time || food.time;
      food.ingredients = req.body.ingredients || food.ingredients;
      food.calories = req.body.calories || food.calories;
      if (req.file) {
        food.image = "/food_images/" + req.file.filename;
      }

      food
        .save()
        .then((updatedFood) => {
          const data = {
            id: updatedFood._id,
            name: updatedFood.name,
            meal: updatedFood.meal,
            recipe: updatedFood.recipe,
            time: updatedFood.time,
            ingredients: updatedFood.ingredients,
            calories: updatedFood.calories,
            image: updatedFood.image,
          };
          return res.json({
            success: true,
            message: "Food updated successfully",
            data,
          });
        })
        .catch((err) => {
          return res.status(400).json({ error: "Error updating food" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
};

const deleteFoodById = (req, res, next) => {
  Food.findByIdAndDelete(req.params.food_id, req.body)
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
  uploadBulkFoods
};
