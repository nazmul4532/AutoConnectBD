// customerRoutes.js

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  updateUserProfile,
  getProfile,
} = require("../controllers/userController");

// Update customer profile route
router.get("/", verifyToken, getProfile);
router.patch("/update", verifyToken, updateUserProfile);

module.exports = router;
