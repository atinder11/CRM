const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

const Register = require('./models/Register');
const Leave = require('./models/Leave');
const Attendance = require('./models/Attendance');
const Announcement = require('./models/Announcement');
const UserProfile = require("./models/UserProfile");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "atinder123"; 

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect('mongodb://localhost:27017/crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send("Server is working");
});

// Register user
app.post('/register', async (req, res) => {
  const { name, email, password, role, position } = req.body;

  try {
    const existingUser = await Register.findOne({ email });
    if (existingUser) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Register({ name, email, password: hashedPassword, role, position });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "your_secret_key", // replace with process.env.JWT_SECRET in production
      { expiresIn: "1d" }
    );

    // Send expected response
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
app.post('/get-users', async (req, res) => {
  try {
    const users = await Register.find({}, '-password -__v');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Check-in
app.post('/check-in', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      email,
      checkIn: { $gte: todayStart },
      checkOut: null
    });

    if (existing) {
      return res.status(200).json({ message: 'Already checked in', data: existing });
    }

    const newCheckIn = await Attendance.create({
      name,
      email,
      role,
      checkIn: new Date(),
    });

    res.status(201).json({ message: 'Check-in successful', data: newCheckIn });
  } catch (err) {
    res.status(500).json({ error: 'Check-in failed' });
  }
});

// Check-out
app.post('/check-out', async (req, res) => {
  const { email } = req.body;

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({
      email,
      checkIn: { $gte: todayStart },
      checkOut: null
    });

    if (!record) return res.status(404).json({ error: 'No check-in found for today' });

    record.checkOut = new Date();
    record.totalHours = ((record.checkOut - record.checkIn) / (1000 * 60 * 60)).toFixed(2);
    await record.save();

    res.status(200).json({ message: 'Check-out successful', data: record });
  } catch (err) {
    res.status(500).json({ error: 'Check-out failed' });
  }
});

// Check-in status (resume timer)
app.post('/check-in-status', async (req, res) => {
  const { email } = req.body;

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({
      email,
      checkIn: { $gte: todayStart },
      checkOut: null
    });

    if (record) {
      res.status(200).json({ checkedIn: true, checkIn: record.checkIn });
    } else {
      res.status(200).json({ checkedIn: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to get check-in status' });
  }
});

// Attendance submission (generic)
app.post('/attendance', async (req, res) => {
  try {
    const data = await Attendance.create(req.body);
    res.status(201).json({ message: "Attendance saved", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to save attendance" });
  }
});

// Attendance list by filter
app.post('/attendance-list', async (req, res) => {
  try {
    const { email, filter } = req.body;

    if (!email || !filter || (filter !== 'week' && filter !== 'month')) {
      return res.status(400).json({ error: 'Email and valid filter ("week"/"month") are required' });
    }

    let startDate = new Date();
    if (filter === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else {
      startDate.setMonth(startDate.getMonth() - 1);
    }

    const attendances = await Attendance.find({
      email,
      checkIn: { $gte: startDate }
    }).sort({ checkIn: -1 });

    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// All attendance (last 7 days)
app.post('/attendance-all', async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const attendances = await Attendance.find({
      checkIn: { $gte: oneWeekAgo }
    }).sort({ checkIn: -1 });

    const data = attendances.map(a => {
      let totalHours = a.totalHours;
      if (!totalHours && a.checkIn && a.checkOut) {
        totalHours = ((a.checkOut - a.checkIn) / (1000 * 60 * 60)).toFixed(2);
      }

      return {
        name: a.name,
        role: a.role || 'N/A',
        checkIn: a.checkIn,
        checkOut: a.checkOut,
        totalHours: totalHours || 0
      };
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Leave apply
app.post('/leave', async (req, res) => {
  try {
    const { name, email, reason, from, to } = req.body;

    if (!name || !email || !reason || !from || !to) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const leave = new Leave({
      name,
      email,
      reason,
      from: new Date(from),
      to: new Date(to)
    });

    await leave.save();
    res.status(201).json({ message: "Leave applied successfully", data: leave });
  } catch (err) {
    res.status(500).json({ error: "Failed to apply for leave" });
  }
});

// Leave list for user
app.post('/leave-list', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const leaves = await Leave.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaves" });
  }
});

// All leave requests
app.post('/all-leaves', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leave applications" });
  }
});

// Announcements
app.post('/announcement', upload.single("attachment"), async (req, res) => {
  try {
    const { subject, body } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ error: "Subject and body are required" });
    }

    const announcement = new Announcement({
      subject,
      body,
      attachment: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await announcement.save();
    res.status(201).json({ message: "Announcement created successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// View announcements
app.post('/view-announcement', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// User profile
app.post("/user-profile", upload.single("profilePic"), async (req, res) => {
  try {
    const {
      name, email, workNumber, location, shift,
      skills, aboutMe, maritalStatus, address, education
    } = req.body;

    const profile = new UserProfile({
      name,
      email,
      workNumber,
      location,
      shift,
      skills,
      aboutMe,
      maritalStatus,
      address,
      education,
      profilePic: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully", data: profile });
  } catch (err) {
    res.status(500).json({ error: "Failed to create profile", details: err.message });
  }
});

app.post('/get-user-profile', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const userProfile = await UserProfile.findOne({ email });

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
