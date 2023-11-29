const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");

const router = express.Router();

// AUTH CONTROLLER
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/:id", authController.getUser);

// PROTECTED
router.use(authController.protect);

// USER CONTROLLER
router.put("/update/:id", authController.update);
router.delete("/delete/:id", authController.delete);
// GOOGLE
router.post("/google", authController.google);

module.exports = router;
