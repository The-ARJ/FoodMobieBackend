require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");

const foodsRouter = require("./routes/foods-routes");
const feedbacksRouter = require("./routes/feedback-route");
const categoryRouter = require("./routes/category-routes");
const userRouter = require("./routes/users-routes");
const profilesRouter = require("./routes/profile-routes");
const reommendationRouter = require("./routes/recommendation-routes");
const reminderRoutes = require("./routes/reminder-routes");
const notificationRoutes = require("./routes/notifications-routes");
const pushnotificationRoutes = require("./routes/app.routes");

const auth = require("./middleware/auth");
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URI
    : process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static("uploads"));
app.use(cors());

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/users", userRouter);
app.use(auth.verifyUser);
app.use("/profiles", auth.verifyUser, profilesRouter);
app.use("/foods", foodsRouter);
app.use("/feedbacks", feedbacksRouter);
app.use("/categories", categoryRouter);
app.use("/recommendation", reommendationRouter);
app.use("/reminders", reminderRoutes);
app.use("/notifications", notificationRoutes);
app.use("/api", pushnotificationRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (res.statusCode == 200) res.status(500);
  res.json({ msg: err.message });
});
module.exports = app;
