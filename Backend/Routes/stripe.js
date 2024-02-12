const express = require("express");

const router = express.Router();
const { StriperController } = require("../Controllers/stripeController");

router.post("/create-checkout-session", StriperController);

module.exports = router;
