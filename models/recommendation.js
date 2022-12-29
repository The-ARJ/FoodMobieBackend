const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  name: String,
  image: String,
  calorie: Number,
  recipe: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
