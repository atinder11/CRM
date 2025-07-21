// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      // Use the new URL string parser instead of the deprecated one
      useNewUrlParser: true,
      // Use the new unified topology engine for better server discovery and monitoring
      useUnifiedTopology: true
    });

    // Log a success message once connected
    console.log('MongoDB connected');
  } catch (error) {
    // If there is an error, log it to the console
    console.error('DB connection error:', error);
    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;
