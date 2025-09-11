var express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryControllers");

var router = express.Router();

//routes
//Create category
router.post("/create", authMiddleware, createCatController);
//GET all Category
router.get("/getAll", getAllCatController);
//Update Cat
router.put("/update/:id", authMiddleware, updateCatController);
//Delete Cat
router.delete("/delete/:id", authMiddleware, deleteCatController);
module.exports = router;
