const express = require("express");
const router = express.Router();
const {
  checkIn,
  checkOut,
  checkInStatus,
  attendanceList,
  attendanceAll,
} = require("../controllers/attendanceController");

router.post("/checkin", checkIn); //checkIn 
router.post("/checkout", checkOut); //checkout
router.post("/status", checkInStatus);
router.post("/user", attendanceList); //user //list
router.post("/all", attendanceAll); //admin   //all

module.exports = router;