// 3rd Party Imports
const express = require("express");
const authController = require("../controllers/authController");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.post("/", authController.protect, listingController.createListing);
router.get("/:id", authController.protect, listingController.getUsersListings);
// get single listing based on id
router.get("/listing/:id", listingController.getListing);
router.delete("/:id", authController.protect, listingController.deleteListing);
router.put("/:id", authController.protect, listingController.updateListing);

module.exports = router;
