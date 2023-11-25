// 3rd Party Imports
const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");

const router = express.Router();

// AUTH CONTROLLER
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/update/:id", authController.update);

// GOOGLE
router.post("/google", authController.google);

module.exports = router;
