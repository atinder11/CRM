const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  attachment: { type: String }, // stores the file path or URL
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', announcementSchema);
