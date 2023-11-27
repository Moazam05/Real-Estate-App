const catchAsync = require("../utils/catchAsync");
const Listing = require("../models/listingModel");

exports.createListing = catchAsync(async (req, res, next) => {
  // 1) Create a listing
  const newListing = await Listing.create(req.body);

  // 2) Send the response
  res.status(201).json({
    status: "success",
    data: {
      listing: newListing,
    },
  });
});

exports.getUsersListings = catchAsync(async (req, res, next) => {
  // 1) Find all listings based on user id
  const listings = await Listing.find({ user: req.params.id });

  // 2) Send the response
  res.status(200).json({
    status: "success",
    results: listings.length,
    data: listings,
  });
});
