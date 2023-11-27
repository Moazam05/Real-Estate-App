const catchAsync = require("../utils/catchAsync");
const Listing = require("../models/listingModel");
const AppError = require("../utils/appError");

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

exports.getListing = catchAsync(async (req, res, next) => {
  // 1) Find the listing
  const listing = await Listing.findById(req.params.id);
  console.log("req", req.params.id);

  // 2) Check if the listing exists
  if (!listing) {
    return next(new AppError("No listing found with that ID", 404));
  }

  // 3) Send the response
  res.status(200).json({
    status: "success",
    data: listing,
  });
});

exports.deleteListing = catchAsync(async (req, res, next) => {
  // 1) Find the listing
  const listing = await Listing.findById(req.params.id);

  // 2) Check if the listing exists
  if (!listing) {
    return next(new AppError("No listing found with that ID", 404));
  }

  // 3) Check if the user owns the listing
  if (listing.user.toString() !== req.user.id) {
    return next(new AppError("You do not own this listing", 403));
  }

  // 4) Delete the listing
  await Listing.findByIdAndDelete(req.params.id);

  // 4) Send the response
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  // 1) Find the listing
  const listing = await Listing.findById(req.params.id);

  // 2) Check if the listing exists
  if (!listing) {
    return next(new AppError("No listing found with that ID", 404));
  }

  // 3) Check if the user owns the listing
  if (listing.user.toString() !== req.user.id) {
    return next(new AppError("You do not own this listing", 403));
  }

  // 4) Update the listing
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // 5) Send the response
  res.status(200).json({
    status: "success",
    data: {
      listing: updatedListing,
    },
  });
});
