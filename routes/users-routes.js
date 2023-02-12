const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  verifyUser,
  verifyManager,
  verifyAdmin,
} = require("../middleware/auth");
const userController = require("../controllers/user-controller");
const upload = require("../middleware/upload");

const router = express.Router();
router
  .route("/")
  .get(verifyUser, userController.getAllUsers)
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete( userController.deleteAllUsers);

router
  .route("/:user_id")
  .get(userController.getUserById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(verifyUser,upload.single("userImage"), userController.updateUserById)
  .delete(userController.deleteUserById);

router.route("/current/user").get(verifyUser, userController.getCurrentUser);

router.post("/", upload.single("userImage"), (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        return res.status(400).json({ error: "Email already exists" });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);

        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          // image: "/user_images/" + req.file.filename,
          password: hash,
          role: req.body.role || "user",
        });

        newUser
          .save()
          .then((user) => {
            const data = {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              image: user.image,
            };
            return res
              .status(201)
              .json({ status: "User registration success.", data });
          })
          .catch((err) => {
            console.log(err);
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

router.post("/login/user", (req, res, next) => {
  User.findOne({ email: req.body.email })
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
          email: user.email,
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
