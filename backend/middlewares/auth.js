// Import the jsonwebtoken library to work with JWT tokens
const jwt = require("jsonwebtoken");

// Get the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Define the authentication middleware function
const auth = (req, res, next) => {
  // Get the token from the Authorization header (format: Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, return 401 Unauthorized
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the token using the secret key; decode the payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded payload (e.g., user data) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch {
    // If token is invalid or verification fails, return 403 Forbidden
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Export the auth middleware to use in other parts of the application
module.exports = auth;
