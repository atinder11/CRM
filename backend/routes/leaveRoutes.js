const express = require("express");
const router = express.Router();
const { applyLeave, getUserLeaves, getAllLeaves } = require("../controllers/leaveController");

router.post("/", applyLeave);
router.post("/leave-list", getUserLeaves);
router.post("/all-leaves", getAllLeaves);

module.exports = router;
