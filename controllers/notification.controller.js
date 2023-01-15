const Notification = require("../models/Notification");

const getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find();
    res
      .status(200)
      .json({
        message: "All notifications retrieved successfully",
        notifications,
      });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notifications", error });
  }
};

const createNotification = (req, res, next) => {
  let notification = {
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    date: req.body.date,
  };
  Notification.create(notification)
    .then((notification) => {
      res.status(201).json({
        message: "Notification created successfully",
        notification,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating notification",
        error: error.message,
      });
    });
};

const deleteAllNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany();
    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all notifications", error });
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.notification_id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res
      .status(200)
      .json({ message: "Notification retrieved successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notification", error });
  }
};

const updateNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.notification_id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.title = req.body.title || notification.title;
    notification.description = req.body.description || notification.description;
    notification.image = req.body.image || notification.image;
    notification.date = req.body.date || notification.date;
    notification.time = req.body.time || notification.time;
    notification.active = req.body.active || notification.active;
    await notification.save();
    res
      .status(200)
      .json({ message: "Notification updated successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};

const deleteNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.notification_id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
  deleteAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
