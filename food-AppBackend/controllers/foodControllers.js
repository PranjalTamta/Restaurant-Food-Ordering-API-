const FoodModels = require("../models/FoodModels");

//Create Food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;
    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }
    const newFood = new FoodModels({
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Is Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};
const getAllFood = async (req, res) => {
  try {
    const Foods = await FoodModels.find({});
    //validation
    if (!Foods) {
      return res.status(404).send({
        success: false,
        message: "No Food is found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: Foods.length,
      Foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in GET All Food API",
      error,
    });
  }
};

//Get FOOD BY ID
const getFoodByID = async (req, res) => {
  try {
    const foodId = req.params.id;
    //validation
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    //find food
    const food = await FoodModels.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get food By Id API",
      error,
    });
  }
};
//get food by resturant
//Get FOOD BY ID
const getFoodByResturantController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    //validation
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    //find food
    const food = await FoodModels.find({ resturant: restaurantID });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food based on resturant",
      Foods: food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get food By Id API",
      error,
    });
  }
};
//update
const foodUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const updateFood = await FoodModels.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
      },
      { new: true },
    );
    if (!updateFood) {
      return res.status(500).send({
        success: false,
        message: "No Category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "food updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update food API",
      error,
    });
  }
};

//Delete food
const DeleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food ID",
      });
    }
    const Food = await FoodModels.findById(foodId);
    if (!Food) {
      return res.status(500).send({
        success: false,
        message: "category not found with this id",
      });
    }
    await FoodModels.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "food is been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};
module.exports = {
  createFoodController,
  getAllFood,
  getFoodByID,
  getFoodByResturantController,
  foodUpdateController,
  DeleteFood,
};
