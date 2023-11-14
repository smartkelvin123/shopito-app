const asyncHandler = require("express-async-handler");
const Product = require("../models/productmodel");
const { default: mongoose } = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    brand,
    category,
    sku,
    rating,
    regularPrice,
    image,
    color,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !brand ||
    !category ||
    !sku ||
    !color
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const product = await Product.create({
    name,
    description,
    price,
    brand,
    category,
    sku,
    rating,
    regularPrice,
    image,
    color,
  });

  res.status(200).json(product);
});

// get products

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
});

// get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// delete product

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.remove();
  res.status(200).json({ message: "Product removed" });
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    brand,
    category,
    rating,
    regularPrice,
    image,
    color,
  } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      brand,
      category,
      rating,
      regularPrice,
      image,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(updatedProduct);
});

// review product
const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add a star and review");
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (!product.ratings) {
      product.ratings = [];
    }

    // Update rating
    product.ratings.push({
      star,
      review,
      reviewDate,
      name: req.user.name,
      UserID: req.user._id,
    });

    await product.save();

    res.status(200).json({ message: "Product review added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// delete review
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { UserID } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (!product.ratings || !Array.isArray(product.ratings)) {
      res.status(400);
      throw new Error("Product ratings are missing or invalid.");
    }

    const newRatings = product.ratings.filter((review) => {
      if (review.UserID && typeof review.UserID === "string") {
        return review.UserID.toString() !== UserID.toString();
      }
      return false;
    });

    product.ratings = newRatings;
    await product.save();

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// update review

const updateReview = asyncHandler(async (req, res) => {
  const { star, review, reviewDate, UserID } = req.body;
  const { id } = req.params;
  //    validation
  if (star > 1 || !review) {
    res.status(400);
    throw new Error("Please add a star and review");
  }
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  //  match user to review
  if (req.user._id.toString() !== UserID) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // update product review
  const updatedReview = await Product.findByIdAndUpdate(
    {
      _id: product._id,
      "ratings.UserID": mongoose.Types.ObjectId(UserID),
    },
    {
      $set: {
        "ratings.$.star": star,
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );
  if (updateReview) {
    res.status(200).json({ message: "product review update" });
  } else {
    res.status(404);
    throw new Error("Product not updated");
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};
