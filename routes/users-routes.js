const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        return res.status(400).json({ error: "Username already exists" });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);

        const newUser = new User({
          username: req.body.username,
          password: hash,
          role: req.body.role || "user",
        });

        newUser
          .save()
          .then((user) => {
            const data = {
              id: user._id,
              username: user.username,
              role: user.role,
            };
            return res
              .status(201)
              .json({ status: "User registration success.", data });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ error: "Error saving user in database" });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const data = {
          id: user._id,
          username: user.username,
          role: user.role,
        };
        const token = jwt.sign(data, process.env.SECRET, { expiresIn: "24h" });
        return res.json({ status: "Login Success", token });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Server Error" });
    });
});

module.exports = router;
