// Import express to create a router
const express = require("express");

// Initialize router from express
const router = express.Router();

// Import multer for handling file uploads
const multer = require("multer");

// Import path to work with file extensions
const path = require("path");

// Import authentication middleware
const auth = require("../middlewares/auth");

// Import controller functions for announcements
const { createAnnouncement, viewAnnouncements } = require("../controllers/announcementController");

// Configure storage engine for multer (destination and filename)
const storage = multer.diskStorage({
  // Set the directory to save uploaded files
  destination: (req, file, cb) => cb(null, "uploads/"),

  // Rename file: use current timestamp + original file extension
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

// Initialize multer with the configured storage engine
const upload = multer({ storage });

// Route to create a new announcement with an optional file attachment
router.post("/", upload.single("attachment"), createAnnouncement);

// Route to view all announcements (requires authentication)
router.post("/view", auth, viewAnnouncements);

// Export the router to use in main app
module.exports = router;
