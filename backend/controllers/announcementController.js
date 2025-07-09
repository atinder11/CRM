const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const { subject, body } = req.body;
    if (!subject || !body) return res.status(400).json({ error: "Subject and body are required" });

    const announcement = new Announcement({ subject, body, attachment: req.file ? `/uploads/${req.file.filename}` : null });
    await announcement.save();

    res.status(201).json({ message: "Announcement created successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.viewAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};