Food Recommendation Web API
A web API for food recommendation, developed using Node.js, Express, and MongoDB.

Table of Contents
Features
Technologies
Prerequisites
Installation
Usage
API Reference
Tests
Deployment
Contributing
License
Features
Recommend different types of food to the users
Automatically recommend new food daily (breakfast, lunch, dinner)
Food information includes name, image, calorie, and recipe
Allow users to add their own food list (breakfast, lunch, dinner) for each day of the week
Technologies
Node.js
Express
MongoDB
Prerequisites
Node.js
MongoDB
Installation
Clone the repository:
Copy code
git clone https://github.com/<USERNAME>/food-recommendation-web-api.git
Install the dependencies:
Copy code
cd food-recommendation-web-api
npm install
Set the environment variables in a .env file:
Copy code
MONGODB_URI=<mongodb_connection_string>
Start the server:
Copy code
npm start
Usage
Make a GET request to http://localhost:3000/food/recommendation to get the recommended food.

Make a POST request to http://localhost:3000/food/recommendation with the following JSON body to add a new recommendation:

Copy code
{
  "name": "Pizza",
  "image": "https://pizza.com/pizza.jpg",
  "calorie":"222"}