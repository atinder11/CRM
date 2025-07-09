const Attendance = require("../models/Attendance");

exports.checkIn = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({ email, checkIn: { $gte: todayStart }, checkOut: null });
    if (existing) return res.status(200).json({ message: "Already checked in", data: existing });

    const newCheckIn = await Attendance.create({ name, email, role, checkIn: new Date() });
    res.status(201).json({ message: "Check-in successful", data: newCheckIn });
  } catch (err) {
    res.status(500).json({ error: "Check-in failed" });
  }
};

exports.checkOut = async (req, res) => {
  const { email } = req.body;
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({ email, checkIn: { $gte: todayStart }, checkOut: null });
    if (!record) return res.status(404).json({ error: "No check-in found for today" });

    record.checkOut = new Date();
    record.totalHours = ((record.checkOut - record.checkIn) / (1000 * 60 * 60)).toFixed(2);
    await record.save();

    res.status(200).json({ message: "Check-out successful", data: record });
  } catch (err) {
    res.status(500).json({ error: "Check-out failed" });
  }
};

exports.checkInStatus = async (req, res) => {
  const { email } = req.body;
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({ email, checkIn: { $gte: todayStart }, checkOut: null });
    if (record) return res.status(200).json({ checkedIn: true, checkIn: record.checkIn });
    else return res.status(200).json({ checkedIn: false });
  } catch (err) {
    res.status(500).json({ error: "Failed to get check-in status" });
  }
};

exports.attendanceList = async (req, res) => {
  const { email, filter } = req.body;
  if (!email || !filter || (filter !== "week" && filter !== "month")) return res.status(400).json({ error: "Invalid input" });

  try {
    let startDate = new Date();
    if (filter === "week") startDate.setDate(startDate.getDate() - 7);
    else startDate.setMonth(startDate.getMonth() - 1);

    const attendances = await Attendance.find({ email, checkIn: { $gte: startDate } }).sort({ checkIn: -1 });
    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.attendanceAll = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const attendances = await Attendance.find({ checkIn: { $gte: oneWeekAgo } }).sort({ checkIn: -1 });

    const data = attendances.map(a => ({
      name: a.name,
      role: a.role || "N/A",
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      totalHours: a.totalHours || ((a.checkOut && a.checkIn) ? ((a.checkOut - a.checkIn) / (1000 * 60 * 60)).toFixed(2) : 0)
    }));

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};