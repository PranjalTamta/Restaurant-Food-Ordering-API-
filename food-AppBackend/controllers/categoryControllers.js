const categoryModels = require("../models/categoryModels");

// create category
const createCatController = async (req, res) => {
  try {
    const { title, imgUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title or image",
      });
    }
    const newCategory = new categoryModels({ title, imgUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create Category API",
      error,
    });
  }
};

const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModels.find({});
    if (!categories) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get ALL category API",
      error,
    });
  }
};

//Update Category
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imgUrl } = req.body;
    const updateCategory = await categoryModels.findByIdAndUpdate(
      id,
      {
        title,
        imgUrl,
      },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update cat API",
      error,
    });
  }
};

//DELETE CAT
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    const category = await categoryModels.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "category not found with this id",
      });
    }
    await categoryModels.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category is been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Cat API",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
