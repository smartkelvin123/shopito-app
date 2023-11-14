const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);
router.get("/getuser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);

module.exports = router;
