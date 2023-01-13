const Food = require("../models/Food");

const getAllFoods = (req, res, next) => {
  Food.find()
    .then((foods) => {
      res.json(foods);
    })
    .catch(next);
};

const createFood = (req, res, next) => {
  console.log(req.body)
  console.log(req.user)
  let food = {
    name: req.body.name,
    // image: req.body.image,
    meal: req.body.meal,
    recipe: req.body.recipe,
    calories: req.body.calories,
    owner: req.user.id,
    
  }
  Food.create(food)
    .then((food) => {
      res.status(201).json(food);
    })
    .catch('next');
};

const deleteAllFoods = (req, res, next) => {
  Food.deleteMany()
    .then((status) => {
      res.json(status);
    })
    .catch(next);
};

const getFoodById = (req, res, next) => {
  Food.findById(req.params.food_id)
    .populate("category")
    .then((food) => {
      res.json(food);
    })
    .catch(next);
};

const updateFoodById = (req, res, next) => {
  Food.findById(req.params.food_id)
    .then((food) => {
      if (food.owner != req.user.id) {
        res.status(403);
        return next(new Error("Not allowed"));
      }
      food.foodname = req.body.foodname ? req.body.foodname : food.foodname;
      food.image = req.body.image ? req.body.image : food.image;
      food.calories = req.body.calories ? req.body.calories : food.calories;
      food.recipe = req.body.recipe ? req.body.recipe : food.recipe;
      food.category = req.body.category ? req.body.category : food.category;
      food
        .save()
        .then((food) => res.json(food))
        .catch(next);
    })
    .catch(next);

  // Food.findByIdAndUpdate(req.params.food_id, { $set: req.body }, { new: true })
  //     .then((food) => {
  //         res.json(food)
  //     }).catch(next)
};

const deleteFoodById = (req, res, next) => {
  Food.findByIdAndDelete(req.params.food_id)
    .then((food) => {
      res.json(food);
    })
    .catch(next);
};

module.exports = {
  getAllFoods,
  createFood,
  deleteAllFoods,
  getFoodById,
  updateFoodById,
  deleteFoodById,
};
