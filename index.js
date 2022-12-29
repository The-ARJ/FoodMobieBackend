const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const recommendationRoutes = require('./routes/recommendation');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/food/recommendation', recommendationRoutes);

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => console.log(err))

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
