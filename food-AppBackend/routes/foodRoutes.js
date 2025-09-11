var express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFood,
  getFoodByID,
  getFoodByResturantController,
  foodUpdateController,
  DeleteFoodController,
  DeleteFood,
} = require("../controllers/foodControllers");

var router = express.Router();

//routes
//Create food
router.post("/create", authMiddleware, createFoodController);
//GET ALL FOODS
router.get("/getAll", getAllFood);
//GET Food By ID
router.get("/getAll/:id", authMiddleware, getFoodByID);
//get food by resturant
router.get("/getByResturant/:id", authMiddleware, getFoodByResturantController);
//Update
router.put("/update/:id", authMiddleware, foodUpdateController);
//Delete
router.delete("/delete/:id", authMiddleware, DeleteFood);

module.exports = router;
