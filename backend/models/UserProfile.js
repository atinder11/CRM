const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  workNumber: String,
  location: String,
  shift: String,
  skills: String,
  aboutMe: String,
  maritalStatus: String,
  address: String,
  education: String,
  profilePic: String,
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
