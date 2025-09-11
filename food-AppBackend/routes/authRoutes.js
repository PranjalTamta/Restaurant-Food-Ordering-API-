var express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

var router = express.Router();

//rotes
//register || POST
router.post("/register", registerController);
//LogIn||POST
router.post("/login", loginController);

module.exports = router;
