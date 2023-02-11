const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,

      // required: [true, 'Username is required'],
      // unique: [true, 'Username not available'],
    },
    firstName: {
      type: String,
      trim: true,

      // required: true
    },
    lastName: {
      type: String,
      trim: true,

      // required: true
    },
    email: {
      type: String,
      trim: true,

      required: [true, "Email is required"],
      unique: [true, "Email Already Exists"],
    },
    password: {
      type: String,
      trim: true,

      required: [true, "Password is required"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      trim: true,

      enum: ["user", "admin", "manager"],
      default: "user",
    },
    // profile: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    //   },
    // ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
