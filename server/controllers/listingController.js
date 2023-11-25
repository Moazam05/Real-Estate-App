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
