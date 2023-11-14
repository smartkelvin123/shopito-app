const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "sku",
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
      default: "As seen",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      default: 0,
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: {
      type: Number,
      default: 0,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
      trim: true,
    },
    image: {
      type: String,
      // required: [true, "Please add an image"],
      trim: true,
    },
    ratings: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
