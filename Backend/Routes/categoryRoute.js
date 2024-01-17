const express = require("express");
const router = express.Router();
const { requiresignIn, isAdmin } = require("../Middleware/authMidleware");
const {
  CreateCategoryModel,
  Getcategory,
  Singlecategory,
  DeleteCategory,
  Updatecategory,
} = require("../Controllers/categoryControllers");
router.post("/create-category", requiresignIn, isAdmin, CreateCategoryModel);
router.get("/get-category", Getcategory);
router.get("/single-category/:slug", Singlecategory);
router.delete("/delete-category/:id", requiresignIn, isAdmin, DeleteCategory);
router.put("/update-category/:id", requiresignIn, isAdmin, Updatecategory);

module.exports = router;
