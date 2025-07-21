// Import UserProfile model to manage user profile data
const UserProfile = require("../models/UserProfile");

// Import Register model to access basic user details
const Register = require("../models/Register");

// Controller to create a new user profile
exports.createUserProfile = async (req, res) => {
  try {
    // Destructure fields from request body
    const {
      name, email, workNumber, location, shift,
      skills, aboutMe, maritalStatus, address, education, userId
    } = req.body;

    // Validate required fields
    if (!name || !email || !userId) {
      return res.status(400).json({ error: "Name, Email and userId are required" });
    }

    // Check if profile already exists for the user
    const existing = await UserProfile.findOne({ userId });
    if (existing) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    // Create a new UserProfile instance
    const profile = new UserProfile({
      userId,           // Associate profile with user
      name,             // Full name
      email,            // Email ID
      workNumber,       // Work contact number
      location,         // Location of the user
      shift,            // Shift timing
      skills,           // Skills list
      aboutMe,          // Short description
      maritalStatus,    // Marital status
      address,          // Residential address
      education,        // Educational background
      profilePic: req.file ? `/uploads/${req.file.filename}` : null // Upload profile picture if exists
    });

    // Save the profile to the database
    await profile.save();

    // Respond with success message
    res.status(201).json({ message: "Profile created successfully" });
  } catch (err) {
    // Handle any error and send server error response
    console.error("Error creating profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to fetch a user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Extract userId from request body
    const userId = req.body.userId;

    // Validate userId
    if (!userId) return res.status(400).json({ error: "userId is required" });

    // Find profile using userId
    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) return res.status(404).json({ error: "Profile not found" });

    // Find user details using Register model
    const user = await Register.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Merge profile and basic user details into one object
    const merged = {
      name: user.name,
      empId: user.empId,
      email: user.email,
      role: user.role,
      position: user.position,
      profilePic: userProfile.profilePic,
      ...userProfile.toObject() // Spread all profile fields (overrides any duplicate fields)
    };

    // Send merged data as response
    res.status(200).json(merged);
  } catch (err) {
    // Log and respond with error
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
};
