var mongoose = require("mongoose");

//schema
var categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imgUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Ftag%2Fresturant-logo%2F&psig=AOvVaw31PZCUnaGELIm0kUX4Aozj&ust=1751625924991000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjG2ZrBoI4DFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);
//export
module.exports = mongoose.model("Category", categorySchema);
