const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: String,

  },
  time: {
    type: String,
  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
//   reads: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//       isRead: {
//         type: Boolean,
//         default: false,
//       },
//     },
//   ],
//   isNotified: {
//     type: Boolean,
//     default: false,
//   },
});
module.exports = mongoose.model('Notifyjks', notificationSchema);

