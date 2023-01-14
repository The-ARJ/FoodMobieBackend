const schedule = require("node-schedule");
const Reminder = require("../models/Reminder");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const scheduleReminder = async () => {
  try {
    const reminders = await Reminder.find({});
    reminders.forEach((reminder) => {
      let scheduleDate = new Date(reminder.date + " " + reminder.time);
      if (!reminder.notificationSent) {
        schedule.scheduleJob(scheduleDate, () => {
          const msg = {
            // to: reminder.user.email,
            to: "joshiaayush871@gmail.com",
            from: "aayushrajjoshi4@gmail.com",
            subject: "Reminder",
            text: reminder.message || "Don't forget to eat your",
            html: "<strong>" + reminder.message + "</strong>",
          };
          sgMail
            .send(msg)
            .then((res) => {
              console.log("Email Sent..");
              reminder.notificationSent = true;
              reminder.save();
            })
            .catch((error) => console.log(error));
          console.log("Sending notification for reminder:", reminder);
        });
      }
    });
  } catch (error) {
    console.log("Error scheduling reminders", error);
  }
};

scheduleReminder();
