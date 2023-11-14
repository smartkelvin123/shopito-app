const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// protect user

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // verify token

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

// admin only

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

module.exports = { protect, adminOnly };
