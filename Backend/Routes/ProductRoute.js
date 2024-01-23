const express = require("express");
const router = express.Router();
const {
  GetProducts,
  DeleteProduct,
} = require("../Controllers/productController");
const { requiresignIn, isAdmin } = require("../Middleware/authMidleware");
router.get("/get-product", GetProducts);
router.delete("/delete-product/:id", requiresignIn, isAdmin, DeleteProduct);
module.exports = router;
