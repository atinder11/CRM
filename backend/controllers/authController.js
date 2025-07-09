// controllers/authController.js
const Register = require("../models/Register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password, role, position } = req.body;
  try {
    const existingUser = await Register.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Register({ name, email, password: hashedPassword, role, position });
    await user.save();

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Register.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await Register.find({}, "-password -__v");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
