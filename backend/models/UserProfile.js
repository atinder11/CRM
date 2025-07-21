// Import mongoose to define schema and work with MongoDB
const mongoose = require('mongoose');

// Define schema for additional user profile details
const userProfileSchema = new mongoose.Schema({
  // Reference to the user in the Register model
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId reference
    ref: 'Register',                      // Linked to Register collection
    required: true,                       // Must be provided
    index: true,                          // Indexed for faster queries
    unique: true                          // Only one profile per user
  },

  // Work contact number (optional)
  workNumber: String,

  // User's location (city or address)
  location: String,

  // Shift details (e.g., "Day", "Night")
  shift: String,

  // Skills summary or keywords
  skills: String,

  // About me section (short bio)
  aboutMe: String,

  // Marital status (e.g., "Single", "Married")
  maritalStatus: String,

  // Full address (optional)
  address: String,

  // Educational qualifications (e.g., B.Tech, M.Sc.)
  education: String,

  // Path to uploaded profile picture (if any)
  profilePic: String
}, { 
  // Automatically adds createdAt and updatedAt fields
  timestamps: true 
});

// Export the UserProfile model for use in routes/controllers
module.exports = mongoose.model("UserProfile", userProfileSchema);
