var express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

var router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);
//UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);
//password update
router.post("/updatePassword", authMiddleware, updatePasswordController);
//Rest password
router.post("/resetPassword", authMiddleware, resetPasswordController);
//Delete User
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);
module.exports = router;
