const mongoose = require('mongoose'); // Importing the mongoose library

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message with the host name of the database connection
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    // Log any connection errors
    console.log(error);

    // Exit the process with a failure code if the connection fails
    process.exit(1);
  }
};

// Exporting the connectDB function for use in other parts of the application
module.exports = connectDB;
