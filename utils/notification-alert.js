const schedule = require("node-schedule");
const Notification = require("../models/Notification");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const domain = "sandboxef4dca1d47fc4f51b05381b8abe8f45a.mailgun.org";
const mailgun = require("mailgun-js")({
  apiKey: process.env.api_key,
  domain: domain,
});

const scheduleNotification = async () => {
  try {
    const notification = await Notification.findOne({ isNotified: false })
      .sort({
        createdAt: -1,
      })
      .populate("owner", "email");
    if (notification) {
      let scheduleDate = new Date(notification.date + " " + notification.time);
      schedule.scheduleJob(scheduleDate, () => {
        const data = {
          from: "FoodMobie: <foodmobie@gmail.com>",
          to: "joshiaayush871@gmail.com",
          subject: "Notification",
          text: `<Strong>Hello Dear!</Strong>, You Have a New Message From FoodMobie`,
          html: `
            <html>
              <head>
                <style>
                  /* Add some styling to make the email look nice */
                  body {
                    font-family: Arial, sans-serif;
                    color: #444;
                  }
                  h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    text-align: center;
                  }
                  p {
                    margin-bottom: 10px;
                    font-size: 18px;
                  }
                </style>
              </head>
              <body>
                <h1>FoodMobie Notification</h1>
                <p>
                  <strong>Hello ${notification.owner.firstName},</strong>
                </p>
                <p>
                You Have a New Message From FoodMobie
                </p>
              </body>
            </html>
            `,
        };

        mailgun.messages().send(data, function (error, body) {
          if (error) {
            console.log(error);
          } else {
            console.log(body);
          }
        });

        console.log(
          "Sending notification:",
          notification.owner.firstName,
          notification
        );
        notification.isNotified = true;
        notification.save();
      });
    }
  } catch (error) {
    console.log("Error scheduling notifications", error);
  }
};

module.exports = { scheduleNotification };
