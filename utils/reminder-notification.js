const schedule = require("node-schedule");
const Reminder = require("../models/Reminder");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const domain = "sandboxef4dca1d47fc4f51b05381b8abe8f45a.mailgun.org";
const mailgun = require("mailgun-js")({ apiKey: process.env.api_key, domain: domain });

const scheduleReminder = async () => {
  try {
    const reminder = await Reminder.findOne({ isNotified: false })
      .sort({
        createdAt: -1,
      })
      .populate("owner", "username");
    if (reminder) {
      let scheduleDate = new Date(reminder.date + " " + reminder.time);
      schedule.scheduleJob(scheduleDate, () => {
        const data = {
          from: "FoodMobie: <foodmobie@gmail.com>",
          to: "joshiaayush871@gmail.com",
          subject: "Reminder",
          text: `<Strong>Hello ${reminder.owner.username}</Strong>, ${reminder.message} on ${reminder.date} at ${reminder.time}. Meal: ${reminder.meal}`,
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
                <h1>FoodMobie Reminder</h1>
                <p>
                  <strong>Hello ${reminder.owner.username},</strong>
                </p>
                <p>
                  ${reminder.message} on ${reminder.date} at ${reminder.time}.
                </p>
                <p>Meal: ${reminder.meal}</p>
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

        // console.log(
        //   "Sending notification for reminder:",
        //   reminder.owner.username,
        //   reminder
        // );
        reminder.isNotified = true;
        reminder.save();
      });
    }
  } catch (error) {
    console.log("Error scheduling reminders", error);
  }
};

module.exports = { scheduleReminder };
