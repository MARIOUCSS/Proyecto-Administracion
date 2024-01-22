const express = require("express");
const router = express.Router();
const { GetProducts } = require("../Controllers/productController");
router.get("/get-product", GetProducts);
module.exports = router;
