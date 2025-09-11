var express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIDController,
  deleteResturantController,
} = require("../controllers/resturantControllers");

var router = express.Router();

//routes
//Create Resturant||POST
router.post("/create", authMiddleware, createResturantController);
//GET all Resturant || GET
router.get("/getAll", getAllResturantController);
//GET resturant By Id || GET
router.get("/get/:id", getResturantByIDController);
//Delete resturant
router.delete("/delete/:id", authMiddleware, deleteResturantController);
module.exports = router;
