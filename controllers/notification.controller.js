const Notification = require("../models/alert");
const { scheduleNotification } = require("../utils/notification-alert");
const moment = require("moment");

// const getAllNotifications = async (req, res, next) => {
//   try {
//     const currentDate = new Date();
//     const notification = await Notification.find({});
//     const filteredNotifications = notification.filter((notification) => {
//       const scheduledDate = moment(
//         `${notification.date} ${notification.time}`,
//         "YY-MM-DD HH:mm"
//       ).toDate();
//       return scheduledDate < currentDate;
//     });
//     // console.log(filteredNotifications);
//     res.status(200).json({
//       success:true,
//       message: "All notifications retrieved successfully",
//       notification: filteredNotifications,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving notifications", error });
//   }
// };
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
    const currentDate = new Date();
    const date = req.body.date || currentDate.toISOString().slice(0, 10);
    currentDate.setSeconds(currentDate.getSeconds() + 1);
    let time = req.body.time || currentDate.toTimeString().slice(0, 8);

    const newNotification = new Notification({
      ...req.body,
      date,
      time,
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
    notification.title = req.body.title;
    notification.description = req.body.description;
    notification.image = req.file.filename || notification.image;
    notification.date = req.body.date;
    notification.time = req.body.time;
    let userRead = notification.reads.find((read) => read.user == req.user.id);
    if (userRead) {
      userRead.isRead = req.body.isRead;
    } else {
      notification.reads.push({
        user: req.user.id,
        isRead: req.body.isRead,
      });
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
};
