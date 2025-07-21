// Define constant routes for the application using Object.freeze to make it immutable
const Routes = Object.freeze({
  ATTENDANCE: "/api/attendance",     // Route for attendance-related APIs
  LEAVE: "/api/leave",               // Route for leave-related APIs
  ANNOUNCEMENT: "/api/announcement", // Route for announcement-related APIs
  PROFILE: "/api/profile",           // Route for user profile APIs
  AUTH: "/api/auth",                 // Route for authentication (register/login) APIs
});

// Export the frozen object as a module (similar to exporting an enum)
module.exports = Routes;
