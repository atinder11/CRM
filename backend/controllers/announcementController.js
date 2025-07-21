// Import the Announcement model from the models directory
const Announcement = require('../models/Announcement');

// Controller to create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    // Destructure subject and body from request body
    const { subject, body } = req.body;

    // Get the user ID from the authenticated request (set by auth middleware)
    const userId = req.user.id;

    // If subject or body is missing, send a 400 Bad Request error
    if (!subject || !body) return res.status(400).json({ error: "Subject and body are required" });

    // Create a new announcement instance
    const announcement = new Announcement({
      userId, // Associate the announcement with the user
      subject, // Set the subject of the announcement
      body,    // Set the body/content of the announcement
      attachment: req.file ? `/uploads/${req.file.filename}` : null // If file exists, set attachment path; else null
    });

    // Save the announcement to the database
    await announcement.save();

    // Send a success response
    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to retrieve all announcements
exports.viewAnnouncements = async (req, res) => {
  try {
    // Fetch all announcements sorted by creation time in descending order
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    // Send the list of announcements as response
    res.status(200).json(announcements);
  } catch (err) {
    // Handle any errors while fetching
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};
