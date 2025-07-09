const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createAnnouncement, viewAnnouncements } = require("../controllers/announcementController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post("/", upload.single("attachment"), createAnnouncement);
router.post("/view", viewAnnouncements);

module.exports = router;