const Reminder = require("../models/Reminder");
const cron = require('node-cron');

const getAllReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id });
    res
      .status(200)
      .json({ message: "All reminders retrieved successfully", reminders });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reminders", error });
  }
};

const createReminder = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.user);
  let food = {
    ...req.body,
    owner: req.user.id,
  };
  Reminder.create(food)
    .then((food) => {
      res.status(201).json({
        message: "Reminder created successfully",
        food,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating food",
        error: error.message,
      });
    });
};


const deleteAllReminders = async (req, res, next) => {
  try {
    await Reminder.deleteMany({ userId: req.user.id });
    res.status(200).json({ message: "All reminders deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all reminders", error });
  }
};

const getReminderById = async (req, res, next) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.reminder_id,
      userId: req.user.id,
    });
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res
      .status(200)
      .json({ message: "Reminder retrieved successfully", reminder });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reminder", error });
  }
};

const updateReminderById = async (req, res, next) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.reminder_id,
      userId: req.user.id,
    });
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    reminder.name = req.body.name || reminder.name;
    reminder.calories = req.body.calories || reminder.calories;
    reminder.meal = req.body.meal || reminder.meal;
    reminder.date = req.body.date || reminder.date;
    reminder.time = req.body.time || reminder.time;
    reminder.recipeId = req.body.recipeId || reminder.recipeId;
    reminder.message = req.body.message || reminder.message;
    reminder.repeat = req.body.repeat || reminder.repeat;
    await reminder.save();
    res
      .status(200)
      .json({ message: "Reminder updated successfully", reminder });
  } catch (error) {
    res.status(500).json({ message: "Error updating reminder", error });
  }
};

const deleteReminderById = async (req, res, next) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.reminder_id,
      userId: req.user.id,
    });
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reminder", error });
  }
};

module.exports = {
  getAllReminders,
  createReminder,
  deleteAllReminders,
  getReminderById,
  updateReminderById,
  deleteReminderById,
};
