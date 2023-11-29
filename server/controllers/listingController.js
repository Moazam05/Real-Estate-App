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
    data: updatedListing,
  });
});

exports.getListings = catchAsync(async (req, res, next) => {
  console.log("req", req.query);

  // 1) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  // 2) Sorting
  // i) regularPrice_asc
  // ii) regularPrice_desc
  // iii) createdAt_desc
  // iv) createdAt_asc
  let sort = {};
  if (req.query.sort) {
    const sortQuery = req.query.sort.split("_");
    if (sortQuery[1] === "desc") {
      sort[sortQuery[0]] = -1;
    } else {
      sort[sortQuery[0]] = 1;
    }
  } else {
    sort = { createdAt: -1 };
  }

  // 3) Filtering based on searchTerm
  const searchTerm = req.query.searchTerm || "";
  const regex = new RegExp(searchTerm, "i");
  const filter = { $or: [{ name: regex }, { description: regex }] };

  // 4) Find all listings based on type "all" or "sale" or "rent"
  if (req.query.type && req.query.type !== "all") {
    filter.type = req.query.type;
  }

  // 5) Find all listings based on parking true or false
  if (req.query.parking) {
    filter.parking = req.query.parking;
  }

  // 6) Find all listings based on furnished true or false
  if (req.query.furnished) {
    filter.furnished = req.query.furnished;
  }

  // 7) Find all listings based on offer true or false
  if (req.query.offer) {
    filter.offer = req.query.offer;
  }

  // 4) Find all listings
  const listings = await Listing.find({
    ...filter,
  })
    .skip(skip)
    .limit(limit)
    .sort(sort);

  // 5) Send the response
  res.status(200).json({
    status: "success",
    results: listings.length,
    data: listings,
  });
});
