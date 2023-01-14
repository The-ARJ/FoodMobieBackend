const Food = require("../models/Food");
const cron = require("node-cron");


let recommendedFood = {
  breakfast: {
    name: "French Toast",
    recipe:
      "1. Whisk together eggs, milk, sugar, and vanilla extract in a shallow dish.\n2. Soak bread slices in the egg mixture.\n3. Heat a skillet or griddle over medium heat and melt butter.\n4. Cook bread slices on the skillet or griddle until golden brown on both sides.\n5. Serve with syrup and powdered sugar.",
    meal: "breakfast",
    calories: 300,
  },
  lunch: {
    name: "BLT Sandwich",
    recipe:
      "1. Toast bread slices.\n2. Cook bacon in a skillet until crispy.\n3. Assemble sandwich with lettuce, tomato, bacon, and mayonnaise.\n4. Serve immediately.",
    meal: "lunch",
    calories: 400,
  },
  dinner: {
    name: "Spaghetti Bolognese",
    recipe:
      "1. Cook spaghetti according to package instructions.\n2. In a separate pan, sauté onions, garlic, and ground beef until browned.\n3. Add canned tomatoes, salt, pepper, and basil.\n4. Simmer for 20 minutes.\n5. Serve spaghetti topped with bolognese sauce.",
    meal: "dinner",
    calories: 500,
  },
};

// function to update recommendations
async function updateRecommendations() {
  try {
    // Fetching all the food data from the database
    const foodData = await Food.find({});
    // Filtering food based on the meal and getting a random food from the filtered data
    recommendedFood.breakfast = recommendFood("breakfast", foodData);
    recommendedFood.lunch = recommendFood("lunch", foodData);
    recommendedFood.dinner = recommendFood("dinner", foodData);
  } catch (error) {
    // Logging the error message
    console.log(error.message);
  }
}

function getBreakfastRecommendation(foodData) {
    // Filtering food based on meal
    const suitableFood = foodData.filter((item) => item.meal === 'breakfast');
    // Returning random food from filtered data
    return suitableFood[Math.floor(Math.random() * suitableFood.length)];
  }
  

// Scheduling the update recommendations task to run every day at midnight
// cron.schedule("0 0 0 * * *", () => {
//   updateRecommendations();
// });


// This schedule pattern is set to run at minute 0, hour 7, every day of the month, every month, and every day of the week.
// cron.schedule("0 0 7 * * *", () => {
//     updateRecommendations();
//     });
    
// Scheduling the update recommendations task to run in every 1 min 

cron.schedule("* * * * *", () => {
    updateRecommendations();
    });
    
    // The scheduling pattern is a string of 5 or 6 fields, separated by spaces. The fields are:
    
    // Seconds: 0-59
    // Minutes: 0-59
    // Hours: 0-23
    // Day of the month: 1-31
    // Month: 0-11 (0 is January, 11 is December)
    // Day of the week: 0-6 (0 is Sunday, 6 is Saturday)

// function to filter food based on meal and return random food
function recommendFood(meal, foodData) {
  // Filtering food based on meal
  const suitableFood = foodData.filter((item) => item.meal === meal);
  // Returning random food from filtered data
  return suitableFood[Math.floor(Math.random() * suitableFood.length)];
}

module.exports = {
  recommendFood,
  recommendedFood,
  getBreakfastRecommendation
};
