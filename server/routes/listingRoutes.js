// 3rd Party Imports
const express = require("express");
const authController = require("../controllers/authController");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.get("/get", listingController.getListings);
router.get("/listing/:id", listingController.getListing);

router.use(authController.protect);
router.post("/", listingController.createListing);
router.get("/:id", listingController.getUsersListings);
router.delete("/:id", listingController.deleteListing);
router.put("/:id", listingController.updateListing);

module.exports = router;
