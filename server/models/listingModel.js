const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    address: {
      type: String,
      required: [true, "Please provide an address"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Please provide a regular price"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Please provide a discounted price"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please provide the number of bathrooms"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please provide the number of bedrooms"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Please provide the furnished status"],
    },
    parking: {
      type: Boolean,
      required: [true, "Please provide the parking status"],
    },
    type: {
      type: String,
      required: [true, "Please provide the type"],
    },
    offer: {
      type: Boolean,
      required: [true, "Please provide the offer status"],
    },
    imageUrls: {
      type: Array,
      required: [true, "Please provide the image urls"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Listing must belong to a user"],
    },
  },
  {
    timestamps: true,
  }
);

const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;
