const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  role: String, // <-- Add this line to store user role (e.g. admin, employee, etc.)
  checkIn: Date,
  checkOut: Date,
  totalHours: Number
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Attendance', attendanceSchema);
