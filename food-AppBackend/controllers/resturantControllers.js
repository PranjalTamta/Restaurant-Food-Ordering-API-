const resturantModels = require("../models/resturantModels");

//create Resturant
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    // const newResturant = await resturantModels;
    const newResturant = new resturantModels({
      title,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New resturant created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create resturant API",
      error,
    });
  }
};

//get ALl resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModels.find({});
    //validation
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getALL Resturant API",
      error,
    });
  }
};

// Get Resturant By ID
const getResturantByIDController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    //validation
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturant id",
      });
    }
    //find resturant
    const resturant = await resturantModels.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get resturant By Id API",
      error,
    });
  }
};

//Delete resturant
const deleteResturantController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!restaurantID) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturant Id",
      });
    }
    await resturantModels.findByIdAndDelete(restaurantID);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete resturant API",
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIDController,
  deleteResturantController,
};
