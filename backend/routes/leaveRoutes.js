// Import express to create a router
const express = require("express");

// Initialize router
const router = express.Router();

// Import controller functions for leave management
const { applyLeave, getUserLeaves, getAllLeaves } = require("../controllers/leaveController");

// Route to apply for leave (expects user info in request body)
router.post("/", applyLeave);

// Route to get leave records for a specific user
router.post("/user", getUserLeaves); 

// Route to get all leave records (admin or HR use case)
router.post("/all", getAllLeaves);

// Export the router
module.exports = router;
