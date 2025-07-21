// Import mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for user registration
const RegisterSchema = new mongoose.Schema({
  // Unique employee ID (e.g., internal company ID)
  empId: { type: String, required: true, unique: true }, // <-- NEW

  // Full name of the user
  name: { type: String, required: true },

  // User's email address (must be unique)
  email: { type: String, required: true, unique: true },

  // Hashed password of the user
  password: { type: String, required: true },

  // Role of the user (must be one of the specified values)
  role: { 
    type: String, 
    required: true, 
    enum: ['Tech', 'Sales', 'Management'] // Restrict role to predefined options
  },

  // Position/title of the user in the company
  position: { type: String, required: true }
}, { 
  // Automatically add createdAt and updatedAt fields
  timestamps: true,

  // Disable the __v version key
  versionKey: false 
});

// Export the Register model for use in authentication and other features
module.exports = mongoose.model('Register', RegisterSchema);
