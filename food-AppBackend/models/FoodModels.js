var mongoose = require("mongoose");

//schema
var foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is require"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is require"],
    },
    imgUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Ftag%2Fresturant-logo%2F&psig=AOvVaw31PZCUnaGELIm0kUX4Aozj&ust=1751625924991000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjG2ZrBoI4DFQAAAAAdAAAAABAE",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);
//export
module.exports = mongoose.model("Foods", foodSchema);
