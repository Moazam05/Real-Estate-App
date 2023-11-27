// 3rd Party Imports
const express = require("express");
const authController = require("../controllers/authController");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.post("/", authController.protect, listingController.createListing);
router.get("/:id", authController.protect, listingController.getUsersListings);

module.exports = router;
