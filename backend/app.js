// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const Routes = require("./enum/routes");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); 

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// JWT authentication middleware
const auth = require("./middlewares/auth");

// Protected Routes (require JWT auth)
app.use(Routes.ATTENDANCE, auth, require("./routes/attendanceRoutes"));
app.use(Routes.LEAVE, auth, require("./routes/leaveRoutes"));
app.use(Routes.ANNOUNCEMENT, auth, require("./routes/announcementRoutes"));
app.use(Routes.PROFILE, auth, require("./routes/profileRoutes"));

// Public Route (no auth needed)
app.use(Routes.AUTH, require("./routes/authRoutes"));

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
