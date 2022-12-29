<h1>Food Recommendation Web API</h1>
<p>A web API for food recommendation, developed using Node.js, Express, and MongoDB.</p>
<h2>Table of Contents</h2>
<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#prerequisites">Prerequisites</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#api-reference">API Reference</a></li>
  <li><a href="#tests">Tests</a></li>
  <li><a href="#deployment">Deployment</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ul>
<h2 id="features">Features</h2>
<ul>
  <li>Recommend different types of food to the users</li>
  <li>Automatically recommend new food daily (breakfast, lunch, dinner)</li>
  <li>Food information includes name, image, calorie, and recipe</li>
  <li>Allow users to add their own food list (breakfast, lunch, dinner) for each day of the week</li>
</ul>
<h2 id="technologies">Technologies</h2>
<ul>
<p>
  <li>Node.js</li>
  <li>Express</li>
  <li>MongoDB</li>
</p>
<h2 id="prerequisites">Prerequisites</h2>
<p>
  <li>Node.js</li>
  <li>MongoDB</li>
</p>
<h2 id="installation">Installation</h2>
<ol>
  <li>Clone the repository:
<pre>
git clone https://github.com/<USERNAME>/food-recommendation-web-api.git
</pre>
  </li>
  <li>Install the dependencies:
<pre>
cd food-recommendation-web-api
npm install
</pre>
  </li>
  <li>Set the environment variables in a <code>.env</code> file:
<pre>
MONGODB_URI=<mongodb_connection_string>
</pre>
  </li>
  <li>Start the server:
<pre>
npm start
</pre>
  </li>
</ol>
<h2 id="usage">Usage</h2>
<ol>
  <li>Make a GET request to <code>http://localhost:3000/food/recommendation</code> to get the recommended food.</li>
  <li>Make a POST request to <code>http://localhost:3000/food/recommendation</code> with the following JSON body to add a new recommendation:
<pre>
{
  "name": "Pizza",
  "image": "https://pizza.com/pizza.jpg",
  "calorie": 300,
  "recipe": "https://pizza.com/recipe"
}
</pre>

    <li>Make a GET request to <code>http://localhost:3000/food/recommendation/:id</code> to get a recommendation by ID.</li>
  <li>Make a PUT request to <code>http://localhost:3000/food/recommendation/:id</code> with the following JSON body to update a recommendation by ID:
<pre>
{
  "name": "Pizza",
  "image": "https://pizza.com/pizza.jpg",
  "calorie": 300,
  "recipe": "https://pizza.com/recipe"
}
</pre>
  </li>
  <li>Make a DELETE request to <code>http://localhost:3000/food/recommendation/:id</code> to delete a recommendation by ID.</li>
</ol>
<h2 id="api-reference">API Reference</h2>


 <h2 id="deployment">Deployment</h2>
To deploy this API, follow these steps:

Make sure you have Node.js and npm installed on your machine.
Clone this repository and navigate to the project directory.
Install the necessary dependencies by running npm install.
Set up a MongoDB database and add the connection string to a .env file in the root directory of the project.
Start the server by running npm start.
<h2 id="contributing">Contributing</h2>
We welcome contributions to this project! If you have an idea for a new feature or have found a bug, please open an issue in the GitHub repository.

<h2 id="license">License</h2>
This project is licensed under the MIT License. See the LICENSE file for more details.
