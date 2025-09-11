const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");

//Get user info
const getUserController = async (req, res) => {
  //   res.status(200).send("User Data");
  //   console.log(req.user.id);
  try {
    //find user
    const User = await userModels.findById({ _id: req.user.id });
    //validation
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //hide password
    User.password = undefined;
    //resp
    res.status(200).send({
      success: true,
      message: "User get successfully",
      User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET API",
      error,
    });
  }
};
// Upadate user

var updateUserController = async (req, res) => {
  try {
    //Find user
    const User = await userModels.findById({ _id: req.user.id });
    //validation
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) {
      User.userName = userName;
    }
    if (address) {
      User.address = address;
    }
    if (phone) {
      User.phone = phone;
    }
    //save user
    await User.save();
    res.status(200).send({
      success: true,
      message: "user is updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};

//RESET Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    //validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all feild",
      });
    }
    const User = await userModels.findOne({ email, answer });
    if (!User) {
      return res.status(500).send({
        success: false,
        message: "User not Found or invalid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = await bcrypt.hash(newPassword, salt);

    User.password = hashPassword;
    await User.save();
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in password reset API",
      error,
    });
  }
};
//update Password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const User = await userModels.findById({ _id: req.user.id });
    //valdation
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "User not Found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please provide old or new Password",
      });
    }
    //check user password || compare password
    var isMatch = await bcrypt.compare(oldPassword, User.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid oldPassword",
      });
    }

    //hashing password
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = await bcrypt.hash(newPassword, salt);
    User.password = hashPassword;
    await User.save();
    res.status(200).send({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Password Update API",
    });
  }
};

//Delete Profile Account
const deleteProfileController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
};
