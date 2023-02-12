const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  foodname: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
  },
  cookingtime: {
    type: String,
  },
  meal: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  recipe: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  message: {
    type: String,
  },
  repeat: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isNotified: {
    type: Boolean,
    default: false,
  },
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
