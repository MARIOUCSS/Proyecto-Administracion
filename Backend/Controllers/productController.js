const ProductModel = require("../Models/productModel");
const slugify = require("slugify");
const fs = require("fs");
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
const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !shipping:
        return res.status(500).send({ error: "Shipping is required" });
      case photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less then lmb" });
    }
    //creas el producto

    const products = await new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    //Si hay foto ese producto se llena las propiedades
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Successfully created product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creando producto",
    });
  }
};
const GetsingleProduct = async (req, res) => {
  try {
    const Product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product",
      Product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Obteniendo el  Producto",
    });
  }
};
const GetsinglePhoto = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Producto no encontrado",
      });
    }

    const { photo } = product;

    if (!photo || !photo.data) {
      return res.status(404).send({
        success: false,
        message: "Imagen no encontrada",
      });
    }

    res.set("Content-Type", photo.contentType);
    return res.status(200).send(photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error obteniendo la foto",
    });
  }
};
const RelatedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      //El ID de la categoria
      category: cid,
      //Tiene que ser diferente al pid por eso se pone $ne:pid
      _id: { $ne: pid },
    })
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error con los productos",
    });
  }
};
module.exports = {
  GetProducts,
  DeleteProduct,
  CreateProduct,
  GetsingleProduct,
  GetsinglePhoto,

  RelatedProduct,
};
