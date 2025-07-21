// Import mongoose to define schema and create models
const mongoose = require('mongoose');

// Define the schema for leave applications
const leaveSchema = mongoose.Schema({
  // Reference to the user applying for leave
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Store user's ObjectId
    ref: 'Register',                     // Link to Register model
    required: true,                      // userId is mandatory
    index: true                          // Index for efficient querying
  },
  // Reason for the leave
  reason: { type: String, required: true },

  // Leave start date
  from: { type: Date, required: true },

  // Leave end date
  to: { type: Date, required: true },

  // Date when the leave was applied (default is current date)
  appliedAt: { type: Date, default: Date.now },

  // Leave status - can only be 'Pending', 'Approved', or 'Rejected'
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'], // Allowed values
    default: 'Pending'                         // Default status
  }
}, {
  // Automatically manage createdAt and updatedAt timestamps
  timestamps: true,

  // Disable the default __v version key
  versionKey: false
});

// Export the Leave model for use in other parts of the application
module.exports = mongoose.model('Leave', leaveSchema);
