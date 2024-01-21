const express = require("express");
const router = express.Router();
const {
  GetUsers,
  RegisterUser,
  DeleteUser,
  UpdateUser,
} = require("../Controllers/userController");
const { requiresignIn, isAdmin } = require("../Middleware/authMidleware");
router.get("/get-user", GetUsers);
router.post("/create-user", requiresignIn, isAdmin, RegisterUser);
router.delete("/delete-user/:id", requiresignIn, isAdmin, DeleteUser);
// //
router.put("/update-user/:id", requiresignIn, isAdmin, UpdateUser);
module.exports = router;
