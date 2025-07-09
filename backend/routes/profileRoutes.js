const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createUserProfile, getUserProfile } = require("../controllers/profileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post("/", upload.single("profilePic"), createUserProfile);
router.post("/get", getUserProfile);

module.exports = router;