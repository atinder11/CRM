const Attendance = require("../models/Attendance"); // Import the Attendance model

// Check-in controller
exports.checkIn = async (req, res) => {
  const userId = req.user.id; // Extract user ID from authenticated request
  try {
    const todayStart = new Date(); // Get current date
    todayStart.setHours(0, 0, 0, 0); // Set time to start of the day (00:00:00)

    // Check if the user has already checked in today and not yet checked out
    const existing = await Attendance.findOne({
      userId,
      checkIn: { $gte: todayStart }, // Check-ins after today’s start
      checkOut: null // Not yet checked out
    });

    if (existing) {
      // If already checked in, return existing record
      return res.status(200).json({ message: "Already checked in", data: existing });
    }

    // Create a new check-in record with current timestamp
    const newCheckIn = await Attendance.create({ userId, checkIn: new Date() });
    res.status(201).json({ message: "Check-in successful", data: newCheckIn }); // Success response
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: "Check-in failed", details: err.message });
  }
};

// Check-out controller
exports.checkOut = async (req, res) => {
  const userId = req.user.id; // Extract user ID from authenticated request
  try {
    const todayStart = new Date(); // Get current date
    todayStart.setHours(0, 0, 0, 0); // Set to start of the day

    // Find today’s check-in record that hasn't been checked out yet
    const record = await Attendance.findOne({
      userId,
      checkIn: { $gte: todayStart },
      checkOut: null
    });

    if (!record) {
      // If no record found, return not found error
      return res.status(404).json({ error: "No check-in found for today" });
    }

    record.checkOut = new Date(); // Set check-out time to current time
    // Calculate total hours and round to 2 decimal places
    record.totalHours = ((record.checkOut - record.checkIn) / (1000 * 60 * 60)).toFixed(2);
    await record.save(); // Save updated record

    // Return success response
    res.status(200).json({ message: "Check-out successful", data: record });
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: "Check-out failed", details: err.message });
  }
};

// Get today's check-in status
exports.checkInStatus = async (req, res) => {
  const userId = req.user.id; // Extract user ID from request
  try {
    const todayStart = new Date(); // Get current date
    todayStart.setHours(0, 0, 0, 0); // Set to start of day

    // Find today's check-in record without check-out
    const record = await Attendance.findOne({
      userId,
      checkIn: { $gte: todayStart },
      checkOut: null
    });

    if (record) {
      // If found, return status as checked in
      return res.status(200).json({ checkedIn: true, checkIn: record.checkIn });
    } else {
      // If not found, return not checked in
      return res.status(200).json({ checkedIn: false });
    }
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: "Failed to get check-in status", details: err.message });
  }
};

// Get attendance records (week/month) for a user
exports.attendanceList = async (req, res) => {
  const userId = req.user.id; // Get user ID
  const { filter } = req.body; // Get filter type (week/month)

  // Validate filter value
  if (!filter || (filter !== "week" && filter !== "month")) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    let startDate = new Date(); // Current date
    if (filter === "week") startDate.setDate(startDate.getDate() - 7); // Subtract 7 days
    else startDate.setMonth(startDate.getMonth() - 1); // Subtract 1 month

    // Fetch attendance records from startDate till now
    const attendances = await Attendance.find({
      userId,
      checkIn: { $gte: startDate }
    }).sort({ checkIn: -1 }); // Sort by latest check-in first

    res.status(200).json(attendances); // Send records
  } catch (err) {
    // Server error
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get all users' attendance records for past 7 days
exports.attendanceAll = async (req, res) => {
  try {
    const oneWeekAgo = new Date(); // Get current date
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Subtract 7 days

    // Find all attendance entries from past 7 days
    const attendances = await Attendance.find({ checkIn: { $gte: oneWeekAgo } })
      .populate('userId', 'name email empId role position') // Populate user info
      .sort({ checkIn: -1 }); // Sort by latest check-in first

    // Return data including user details
    res.status(200).json(attendances);
  } catch (err) {
    // Server error
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
