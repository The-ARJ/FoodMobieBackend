const Food = require("../models/Food");
require("dotenv").config();
updateRecommendations();
let recommendedFood = {
  lunch: {
    name: "BLT Sandwich",
    recipe:
      "1. Toast bread slices.\n2. Cook bacon in a skillet until crispy.\n3. Assemble sandwich with lettuce, tomato, bacon, and mayonnaise.\n4. Serve immediately.",
    meal: "lunch",
    calories: 400,
  },
};
let recommendedbreakfastFood = {
  breakfast: {
    name: "BLT breakfast",
    recipe:
      "1. Toast bread slices.\n2. Cook bacon in a skillet until crispy.\n3. Assemble sandwich with lettuce, tomato, bacon, and mayonnaise.\n4. Serve immediately.",
    meal: "lunch",
    calories: 400,
  },
};

let recommendeddinnerFood = {
  dinner: {
    name: "BLT dinner",
    recipe:
      "1. Toast bread slices.\n2. Cook bacon in a skillet until crispy.\n3. Assemble sandwich with lettuce, tomato, bacon, and mayonnaise.\n4. Serve immediately.",
    meal: "lunch",
    calories: 400,
  },
};
// function to update recommendations
async function updateRecommendations() {
  try {
    const foodData = await Food.find({});
    recommendedFood.lunch = recommendFood("lunch", foodData);
    recommendedbreakfastFood.breakfast = recommendbreakfastFood(
      "breakfast",
      foodData
    );
    recommendeddinnerFood.dinner = recommenddinnerFood("dinner", foodData);
  } catch (error) {
    console.log(error.message);
  }
}
function recommendFood(meal, foodData) {
  const suitableFood = foodData.filter((item) => item.meal === meal);
  const recommended = [];
  for (let i = 0; i < 3; i++) {
    recommended.push(
      suitableFood[Math.floor(Math.random() * suitableFood.length)]
    );
  }
  return recommended;
}

function recommendbreakfastFood(meal, foodData) {
  const suitableFood = foodData.filter((item) => item.meal === meal);
  const recommendedbreakfast = [];
  for (let i = 0; i < 3; i++) {
    recommendedbreakfast.push(
      suitableFood[Math.floor(Math.random() * suitableFood.length)]
    );
  }
  return recommendedbreakfast;
}
function recommenddinnerFood(meal, foodData) {
  const suitableFood = foodData.filter((item) => item.meal === meal);
  const recommendeddinner = [];
  for (let i = 0; i < 3; i++) {
    recommendeddinner.push(
      suitableFood[Math.floor(Math.random() * suitableFood.length)]
    );
  }
  return recommendeddinner;
}
module.exports = {
  recommendFood,
  recommendedFood,
  recommendedbreakfastFood,
  recommendeddinnerFood,
};
