// Import mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for an announcement
const announcementSchema = new mongoose.Schema({
  // Reference to the user who created the announcement (from Register model)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },

  // Subject/title of the announcement
  subject: String,

  // Main content/body of the announcement
  body: String,

  // Optional file attachment path
  attachment: String,
}, {
  // Automatically include createdAt and updatedAt timestamps
  timestamps: true
});

// Export the model to use it in other files (collection will be 'announcements')
module.exports = mongoose.model('Announcement', announcementSchema);
