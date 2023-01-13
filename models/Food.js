const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meal: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
},{ timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
