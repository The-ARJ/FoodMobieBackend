const Food = require("../models/Food");
const cron = require("node-cron");

require("dotenv").config();

const domain = "sandboxef4dca1d47fc4f51b05381b8abe8f45a.mailgun.org";
const mailgun = require("mailgun-js")({
  apiKey: process.env.api_key,
  domain: domain,
});
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
// Every one minute "*/1 * * * *"
// Every Day at 7 AM
cron.schedule("0 0 7 * * *", () => {
  const data = {
    from: "FoodMobie: <foodmobie@gmail.com>",
    to: "joshiaayush871@gmail.com",
    subject: "Recommendation",
    text: `<Strong>Hello Dear!</Strong>,<p> Here is your todays recommendation</p>`,
    html: `
      <html>
        <head>
          <style>
            /* Add some styling to make the email look nice */
            body {
              font-family: Arial, sans-serif;
              color: #444;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 20px;
              text-align: center;
            }
            p {
              margin-bottom: 10px;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <h1>FoodMobie Recommendation</h1>
          <p>
          <Strong>Hello Dear!</Strong>
          </p>
          <p>
            Don't forget to checkout today's recommendations
          </p>
          <p>
        </body>
      </html>
      `,
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
  updateRecommendations();
});
module.exports = {
  recommendFood,
  recommendedFood,
  recommendedbreakfastFood,
  recommendeddinnerFood,
};
