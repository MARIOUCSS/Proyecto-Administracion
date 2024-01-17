const express = require("express");
const router = express.Router();
const {
  RegisterController,
  Logincontroller,
  ForgotPasswordController,
} = require("../Controllers/authController");
const { requiresignIn, isAdmin } = require("../Middleware/authMidleware");
//routing
router.post("/forgot-password", ForgotPasswordController);
router.post("/register", RegisterController);
router.post("/login", Logincontroller);
//user
router.get("/user-auth", requiresignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//admin
router.get("/admin-auth", requiresignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
module.exports = router;
