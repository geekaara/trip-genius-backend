const express = require("express");
const {
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userDetailsController");
const protect = require("../middleware/authMiddleware"); // Authentication middleware
const router = express.Router();

// Protected routes for user details
router.get("/myaccount", protect, getUserDetails); // Fetch user details
router.put("/myaccount", protect, updateUserDetails); // Update user details

module.exports = router;
