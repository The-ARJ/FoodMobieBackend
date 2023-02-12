const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    meal: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner'],
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
},{ timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
