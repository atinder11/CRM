// Import required modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createUserProfile, getUserProfile } = require("../controllers/profileController");
const auth = require("../middlewares/auth"); // JWT auth middleware

// Configure multer for storing uploaded profile pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix); // Unique filename to avoid conflicts
  }
});
const upload = multer({ storage });

// Route to create/update user profile (with image upload)
router.post("/", auth, upload.single("profilePic"), createUserProfile);

// Route to fetch user profile by user ID (auth-protected)
router.post("/get", auth, getUserProfile); 

// Export router
module.exports = router;
