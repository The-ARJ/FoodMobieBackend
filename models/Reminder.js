const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  meal: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  repeat: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
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
