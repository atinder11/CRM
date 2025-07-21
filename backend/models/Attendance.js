// Import mongoose to create schema and models
const mongoose = require('mongoose');

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
  // Reference to the user who marked attendance (linked to Register model)
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Store user's ObjectId
    ref: 'Register',                      // Reference to Register collection
    required: true,                       // userId is mandatory
    index: true                           // Add index for faster queries on userId
  },
  // Timestamp when the user checked in
  checkIn: { type: Date },

  // Timestamp when the user checked out
  checkOut: { type: Date },

  // Total hours worked (auto-calculated or set during checkout)
  totalHours: { type: Number }
}, {
  // Adds createdAt and updatedAt fields automatically
  timestamps: true,

  // Disables the __v version key added by default
  versionKey: false
});

// Export the Attendance model
module.exports = mongoose.model('Attendance', attendanceSchema);
