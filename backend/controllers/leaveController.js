const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const { name, email, reason, from, to } = req.body;
    if (!name || !email || !reason || !from || !to) return res.status(400).json({ error: "All fields are required" });

    const leave = new Leave({ name, email, reason, from: new Date(from), to: new Date(to) });
    await leave.save();
    res.status(201).json({ message: "Leave applied successfully", data: leave });
  } catch (err) {
    res.status(500).json({ error: "Failed to apply for leave" });
  }
};

exports.getUserLeaves = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const leaves = await Leave.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaves" });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leave applications" });
  }
};
