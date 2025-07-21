// Import the Leave model for handling leave applications
const Leave = require("../models/Leave");

// Import mongoose for working with ObjectId
const mongoose = require("mongoose");

// Controller to handle applying for leave
exports.applyLeave = async (req, res) => {
  try {
    // Get user ID from the authenticated request (set by auth middleware)
    const decoded = req.user.id; // already a string

    // Create a new leave application instance
    const leave = new Leave({
      userId: decoded,              // Associate leave with the user
      reason: req.body.reason,     // Reason for leave
      from: req.body.from,         // Start date of leave
      to: req.body.to              // End date of leave
    });

    // Save the leave to the database
    const saved = await leave.save();

    // Send success response with saved leave data
    res.status(201).json({
      message: "Leave applied successfully",
      data: saved
    });

  } catch (err) {
    // Handle errors during leave application
    res.status(500).json({
      error: "Failed to apply for leave",
      details: err.message
    });
  }
};

// Controller to fetch all leave applications of a specific user
exports.getUserLeaves = async (req, res) => {
  // Extract user ID from authenticated request
  const userId = req.user.id;
  try {
    // Find leaves by userId, convert to ObjectId for comparison, sort by newest first
    const leaves = await Leave.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });

    // Return list of user-specific leaves
    res.status(200).json(leaves);
  } catch (err) {
    // Log and return server error
    console.error("Get User Leaves Error:", err);
    res.status(500).json({ error: "Failed to fetch leaves" });
  }
};

// Controller to fetch all leave applications (admin functionality)
exports.getAllLeaves = async (req, res) => {
  try {
    // Fetch all leave documents and populate user details from Register model
    const leaves = await Leave.find()
      .populate('userId', 'name email empId role position') // Populate selected fields of the user
      .sort({ createdAt: -1 }); // Sort by most recent

    // Return all leaves with user info
    res.status(200).json(leaves);
  } catch (err) {
    // Log and return server error
    console.error("Get All Leaves Error:", err);
    res.status(500).json({ error: "Failed to fetch leave applications", details: err.message });
  }
};
