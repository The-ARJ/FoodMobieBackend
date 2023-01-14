const express = require("express");
const Profile = require("../models/Profile");
const upload = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    Profile.find()
      .then((profiles) => {
        res.json(profiles);
      })
      .catch(next);
  })

  .post(upload.single("profile"), (req, res, next) => {
    let profile = {
      ...req.body,
      image: req.file.filename,
      user: req.user.userId,
    };
    Profile.create(profile)
      .then((profile) => {
        res.status(201).json({
          message: "Profile image uploaded successfully",
          profile,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error uploading profile image",
          error: error.message,
        });
      });
  });

module.exports = router;
