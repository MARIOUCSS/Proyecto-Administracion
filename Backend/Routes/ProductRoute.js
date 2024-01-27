const express = require("express");
const router = express.Router();
const {
  GetProducts,
  DeleteProduct,
  CreateProduct,
  GetsingleProduct,
  GetsinglePhoto,
  RelatedProduct,
} = require("../Controllers/productController");
const formidable = require("express-formidable");
const { requiresignIn, isAdmin } = require("../Middleware/authMidleware");
router.post(
  "/create-product",
  requiresignIn,
  isAdmin,
  formidable(),
  CreateProduct
);
router.get("/related-product/:pid/:cid", RelatedProduct);
router.get("/get-product/:slug", GetsingleProduct);
router.get("/product-photo/:pid", GetsinglePhoto);
router.get("/get-product", GetProducts);
router.delete("/delete-product/:id", requiresignIn, isAdmin, DeleteProduct);
module.exports = router;
