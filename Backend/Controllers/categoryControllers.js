const categoryModel = require("../Models/categoryModel");
const slugify = require("slugify");
// ////
// var slugify = require('slugify')

// slugify('some string') // some-string

// // if you prefer something other than '-' as separator
// slugify('some string', '_')  // some_string
const CreateCategoryModel = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Category requerida" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      res.status(200).send({
        success: true,
        message: "Category Existe",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Nueva Categoria Creada",
      //En esta categoria trae todo
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const Getcategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const Singlecategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "error deleting category",
    });
  }
};
const Updatecategory = async (req, res) => {
  try {
    const { id } = req.params;
    // const { names } = req.body;
    console.log("Cuerpo de la solicitud:", req.body);
    // Verifica que name sea una cadena antes de usar slugify
    if (typeof req.body.names !== "string") {
      return res.status(400).send({
        success: false,
        message: "El nombre de la categoría debe ser una cadena.",
      });
    }

    const categoryup = await categoryModel.findByIdAndUpdate(
      id,
      { name: req.body.names, slug: slugify(req.body.names) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Categoría actualizada",
      categoryup,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
module.exports = {
  CreateCategoryModel,
  Getcategory,
  Singlecategory,
  DeleteCategory,
  Updatecategory,
};
