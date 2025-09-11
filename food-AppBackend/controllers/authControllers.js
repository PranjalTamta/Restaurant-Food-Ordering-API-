const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Register
var registerController = async (req, res) => {
  try {
    var { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //check user
    var exisiting = await userModels.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email already regisered please login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModels.create({
      userName,
      email,
      password: hashPassword,
      phone,
      address,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//Login
var loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: " Please provide Email or Password",
      });
    }
    //check user
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found ",
      });
    }
    //check user password || compare password
    var isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credential",
      });
    }
    //token
    var token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
