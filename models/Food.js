const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  date: { type: Date, default: Date.now },
  reviewer:{type:mongoose.Schema.Types.ObjectId,
ref:'User'}
});

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
       owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
