const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("email already exist");
  }
  // create new user
  const user = await User.create({
    name,
    email,
    password,
  });
  // generate token
  const token = generateToken(user._id);
  if (user) {
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // better to set with the expiresIn
      path: "/",
      // sameSite: "none",
      // secure: true,               // when development mode, you might have error logging in the user better to comment out
    });
    // send user data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,

      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.send("smart Register ....");
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check for user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("user does not exist");
  }

  // check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // generate token
  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({ email }).select("-password");
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      path: "/",
      // sameSite: "none",
      // secure: true,
    });
    // send user data
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// logout out user
const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    // sameSite: "none",
    // secure: true,
  });
  res.status(200).json({ message: " successfully  logged out" });
});

// get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// get login status
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(200).json({ isLoggedIn: false });
  }
  // const verified = jwt.verify(token, process.env.JWT_SECRET);
  // if (verified) {
  //   res.json(true);
  // } else {
  //   res.json(false);
  // }
  else {
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verified.id).select("-password");
      if (!user) {
        res.status(200).json({ isLoggedIn: false });
      } else {
        res.status(200).json({ isLoggedIn: true, user });
      }
    } catch (error) {
      res.status(200).json({ isLoggedIn: false });
    }
  }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findByIdAndUpdate(req.user._id);
  if (user) {
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// update photo
const updatePhoto = asyncHandler(async (req, res) => {
  // res.send("smart kelvin");
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  user.photo = photo;
  const updateUser = await user.save();
  res.status(200).json(updateUser);
});

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
