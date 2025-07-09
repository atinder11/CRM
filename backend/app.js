require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/leave", require("./routes/leaveRoutes"));
app.use("/api/announcement", require("./routes/announcementRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Central error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
