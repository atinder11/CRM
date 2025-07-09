const UserProfile = require("../models/UserProfile");

exports.createUserProfile = async (req, res) => {
  try {
    const { name, email, workNumber, location, shift, skills, aboutMe, maritalStatus, address, education } = req.body;
    const profile = new UserProfile({
      name, email, workNumber, location, shift, skills, aboutMe,
      maritalStatus, address, education,
      profilePic: req.file ? `/uploads/${req.file.filename}` : null
    });
    await profile.save();
    res.status(201).json({ message: "Profile created successfully", data: profile });
  } catch (err) {
    res.status(500).json({ error: "Failed to create profile", details: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const userProfile = await UserProfile.findOne({ email });
    if (!userProfile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
};