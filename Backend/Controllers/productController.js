const ProductModel = require("../Models/productModel");

const GetProducts = async (req, res) => {
  try {
    const Products = await ProductModel.find({});
    res.status(200).send({
      success: true,
      message: "Complete Products",
      Products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error deleting Product",
    });
  }
};
module.exports = {
  GetProducts,
  DeleteProduct,
};
