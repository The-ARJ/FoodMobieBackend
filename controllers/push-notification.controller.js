const { ONE_SIGNAL_CONFIG } = require("../service/app.config");
const pushNotificationService = require("../service/push-notification.service");

const handleSendNotification = (error, results, res) => {
  if (error) {
    return res.status(500).send({
      message: "Error sending notification",
      error: error,
    });
  }
  return res.status(200).send({
    message: "Success",
    data: results,
  });
};

exports.SendNotification = (req, res, next) => {
  const message = {
    app_id: ONE_SIGNAL_CONFIG.APP_ID,
    contents: { en: "Test Push Notification" },
    include_player_ids: req.body.devices,
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "CUSTOM NOTIFICATION",
    },
  };
  
  pushNotificationService.SendNotification(message, (error, results) => handleSendNotification(error, results, res));
};

exports.SendNotificationsToDevices = (req, res, next) => {
  const { devices } = req.body;

  if (!devices || !devices.length) {
    return res.status(400).send({
      message: "Error",
      error: "Devices are required to send notifications",
    });
  }

  const message = {
    app_id: ONE_SIGNAL_CONFIG.APP_ID,
    contents: { en: "Test Push Notification" },
    include_player_ids: req.body.devices,
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "CUSTOM NOTIFICATION",
    },
  };
  
  pushNotificationService.SendNotification(message, (error, results) => handleSendNotification(error, results, res));
};
