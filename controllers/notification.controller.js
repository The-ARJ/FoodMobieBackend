const Notification = require("../models/Notification");
const { scheduleNotification } = require("../utils/notification-alert");
const moment = require("moment");

const getPastNotifications = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const notification = await Notification.find({});
    const filteredNotifications = notification.filter((notification) => {
      const scheduledDate = moment(
        `${notification.date} ${notification.time}`,
        "YYYY/MM/DD HH:mm"
      ).toDate();
      return scheduledDate < currentDate;
    });

    res.status(200).json({
      success: true,
      message: "All notifications retrieved successfully",
      notification: filteredNotifications,
    });
  } catch (error) {
    console.error("Error retrieving notifications", error);
    res.status(500).json({ message: "Error retrieving notifications" });
  }
};
const getScheduledNotifications = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const notification = await Notification.find({});
    const filteredNotifications = notification.filter((notification) => {
      const scheduledDate = moment(
        `${notification.date} ${notification.time}`,
        "YYYY/MM/DD HH:mm"
      ).toDate();
      return scheduledDate > currentDate;
    });

    res.status(200).json({
      success: true,
      message: "All notifications retrieved successfully",
      notification: filteredNotifications,
    });
  } catch (error) {
    console.error("Error retrieving notifications", error);
    res.status(500).json({ message: "Error retrieving notifications" });
  }
};
const getAllNotifications = (req, res, next) => {
  Notification.find()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "All notification retrieved successfully",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving feedbacks", error });
    });
};
const createNotification = async (req, res, next) => {
  try {
    const newNotification = new Notification({
      ...req.body,
      owner: req.body.owner,
      image: req.file ? "/notification_images/" + req.file.filename : "",
      owner: req.user.id,
      isRead: false,
    });

    const createdNotification = await Notification.create(newNotification);
    scheduleNotification(createdNotification);

    res.status(201).json({
      message: "Notification created and scheduled successfully",
      notification: createdNotification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating and scheduling notification", error });
  }
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
      return res
        .status(404)
        .json({ message: "You are getting notification by id" });
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

    if (
      !req.body.title &&
      !req.body.description &&
      !req.file &&
      !req.body.date &&
      !req.body.time &&
      !req.body.isRead
    ) {
      return res.status(400).json({ message: "No fields to update" });
    }

    if (req.body.title) {
      notification.title = req.body.title;
    }

    if (req.body.description) {
      notification.description = req.body.description;
    }

    if (req.file) {
      notification.image = "/notification_images/" + req.file.filename;
    }

    if (req.body.date) {
      notification.date = req.body.date;
    }

    if (req.body.time) {
      notification.time = req.body.time;
    }

    if (req.body.isRead !== undefined) {
      let userRead = notification.reads.find(
        (read) => read.user == req.user.id
      );
      if (userRead) {
        userRead.isRead = req.body.isRead;
      } else {
        notification.reads.push({
          user: req.user.id,
          isRead: req.body.isRead,
        });
      }
    }

    await notification.save();

    res
      .status(200)
      .json({ message: "Notification updated successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
    console.log(error);
  }
};

const readNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    const userId = req.user.id; // get the ID of the logged-in user
    const read = notification.reads.find((r) => r.user.toString() === userId);
    if (!read) {
      // user has not marked the notification as read yet
      notification.reads.push({ user: userId, isRead: true });
    } else {
      // user has already marked the notification as read
      read.isRead = true;
    }
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
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

const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.notification_id,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    notification.readBy.push(req.user.id);
    await notification.save();
    res
      .status(200)
      .json({ message: "Notification marked as read", notification });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking notification as read", error });
  }
};

const getAllUnread = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const unreadNotifications = await Notification.find({
      isRead: false,
      readBy: { $ne: userId },
    });
    if (!unreadNotifications.length) {
      return res.status(404).json({ message: "No unread notifications found" });
    }
    res.status(200).json({
      message: "All unread notifications retrieved successfully",
      unreadNotifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notifications", error });
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const unreadNotifications = await Notification.find({
      isRead: false,
    });
    if (!unreadNotifications.length) {
      return res.status(404).json({ message: "No unread notifications found" });
    }
    unreadNotifications.forEach(async (notification) => {
      if (!notification.readBy.includes(userId)) {
        notification.readBy.push(userId);
        await notification.save();
      }
    });
    res.status(200).json({
      message: "All unread notifications marked as read",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking all notifications as read", error });
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
  deleteAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
  markAsRead,
  getAllUnread,
  markAllAsRead,
  getPastNotifications,
  getScheduledNotifications,
  readNotificationById,
};
