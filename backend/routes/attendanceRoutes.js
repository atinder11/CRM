const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  checkInStatus,
  attendanceList,
  attendanceAll,
} = require("../controllers/attendanceController");

router.post("/check-in", checkIn);
router.post("/check-out", checkOut);
router.post("/check-in-status", checkInStatus);
router.post("/attendance-list", attendanceList);
router.post("/attendance-all", attendanceAll);

module.exports = router;