// Import the Register model for interacting with the users collection
const Register = require("../models/Register");

// Import bcrypt for hashing and comparing passwords
const bcrypt = require("bcrypt");

// Import JWT for token generation
const jwt = require("jsonwebtoken");

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
exports.registerUser = async (req, res) => {
  // Destructure required fields from request body
  const { empId, name, email, password, role, position } = req.body;

  try {
    // Check if user already exists with the given email
    const existingUser = await Register.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "User already exists" });

    // Hash the password using bcrypt with salt rounds = 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with hashed password
    const user = new Register({ empId, name, email, password: hashedPassword, role, position });

    // Save the user to the database
    await user.save();

    // Generate a JWT token valid for 1 day
    const token = jwt.sign(
      { email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respond with token and selected user details (excluding password)
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        empId: user.empId,
        name: user.name,
        email: user.email,
        role: user.role,
        position: user.position
      },
    });
  } catch (err) {
    // Handle errors during registration
    res.status(400).json({ error: err.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  // Destructure email and password from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Register.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate a JWT token with user details
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respond with token and user details
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        empId: user.empId,
        name: user.name,
        email: user.email,
        role: user.role,
        position: user.position
      }
    });
  } catch (err) {
    // Handle login errors
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch all users (excluding password and version key)
exports.getUsers = async (req, res) => {
  try {
    // Retrieve all users, exclude password and __v fields
    const users = await Register.find({}, "-password -__v");

    // Send user list as JSON
    res.status(200).json(users);
  } catch (err) {
    // Handle errors during fetch
    res.status(500).json({ error: "Server error" });
  }
};
