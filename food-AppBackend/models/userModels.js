var mongoose = require("mongoose");

//schema
var userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone no. is required"],
    },
    usertype: {
      type: String,
      required: [true, "usertype is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fphotos-vecteurs-libre%2Fprofile-icon&psig=AOvVaw0o5ayZ3l3LaFhA74ZvmIeL&ust=1750935212712000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDw7oy0jI4DFQAAAAAdAAAAABAf",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);
//export
module.exports = mongoose.model("User", userSchema);
