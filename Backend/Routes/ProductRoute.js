const express = require("express");
const router = express.Router();
const {
  GetProducts,
  DeleteProduct,
  CreateProduct,
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
router.get("/get-product", GetProducts);
router.delete("/delete-product/:id", requiresignIn, isAdmin, DeleteProduct);
module.exports = router;
