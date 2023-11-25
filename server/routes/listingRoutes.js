// 3rd Party Imports
const express = require("express");
const authController = require("../controllers/authController");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.post("/", authController.protect, listingController.createListing);

module.exports = router;
