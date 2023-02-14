const Reminder = require("../models/Reminder");
const cron = require("node-cron");
const { scheduleReminder } = require("../utils/reminder-notification");

const getAllReminders = async (req, res, next) => {
  try {
    const data = await Reminder.find({ owner: req.user.id });
    res
      .status(200)
      .json({ message: "All reminders retrieved successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reminders", error });
  }
};

const createReminder = async (req, res, next) => {
  try {
    let reminder = {
      ...req.body,
      owner: req.user.id,
    };
    const createdReminder = await Reminder.create(reminder);
    scheduleReminder(createdReminder);
    res.status(201).json({
      message: "Reminder created successfully",
      createdReminder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating food",
      error: error.message,
    });
  }
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


const updateReminderById = (req, res, next) => {
  Reminder.findById(req.params.reminder_id)
    .then((reminder) => {
      if (!reminder) {
        return res.status(404).json({ error: "Reminder not found" });
      }

      reminder.foodname = req.body.foodname || reminder.foodname;
      reminder.calories = req.body.calories || reminder.calories;
      reminder.meal = req.body.meal || reminder.meal;
      reminder.date = req.body.date || reminder.date;
      reminder.time = req.body.time || reminder.time;
      reminder.recipe = req.body.recipe || reminder.recipe;
      reminder.message = req.body.message || reminder.message;
      reminder.cookingtime = req.body.cookingtime || reminder.cookingtime;
      reminder.ingredients = req.body.ingredients || reminder.ingredients;

      reminder
        .save()
        .then((updatedReminder) => {
          const data = {
            id: updatedReminder._id,
            foodname: updatedReminder.foodname,
            calories: updatedReminder.calories,
            meal: updatedReminder.meal,
            recipe: updatedReminder.recipe,
            date: updatedReminder.date,
            time: updatedReminder.time,
            recipe: updatedReminder.recipe,
            message: updatedReminder.message,
            cookingtime: updatedReminder.cookingtime,
            ingredients: updatedReminder.ingredients,
          };
          return res.json({
            success: true,
            message: "Reminder updated successfully",
            data,
          });
  
        })
        .catch((err) => {
          return res.status(400).json({ error: "Error updating food" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
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
