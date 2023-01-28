const User = require("../models/User");
const getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res
        .status(200)
        .json({ message: "All users retrieved successfully", users });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving users", error });
    });
};

const deleteAllUsers = (req, res, next) => {
  User.deleteMany()
    .then((status) => {
      res
        .status(200)
        .json({ message: "All Users deleted successfully", status });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting all users", error });
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.user_id)
    // .populate("category")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User retrieved successfully", user });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving user", error });
    });
};

const updateUserById = (req, res, next) => {
  User.findById(req.params.user_id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else if (user.owner != req.user.id) {
        res.status(403).json({ message: "Not allowed" });
      } else {
        user.username = req.body.username ? req.body.username : user.username;
        user.image = req.body.image ? req.body.image : user.image;
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
        user.email = req.body.email ? req.body.email : user.email;
        user.email = req.body.password ? req.body.password : user.password;
        user
          .save()
          .then((user) =>
            res.json({ message: "User updated successfully", user })
          )
          .catch(next);
      }
    })
    .catch(next);
};

const deleteUserById = (req, res, next) => {
  User.findByIdAndDelete(req.params.user_id)
    .then((user) => {
      if (user) {
        res.json({ message: "User item deleted successfully" });
      } else {
        res.status(404).json({ message: "User item not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting user item", error });
    });
};

module.exports = {
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
