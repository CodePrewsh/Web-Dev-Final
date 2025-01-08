const path = require('path'); // Importing the path module to handle file and directory paths
const express = require('express'); // Importing the Express library
const colors = require('colors'); // Importing the colors library to add color to console logs
const dotenv = require('dotenv').config(); // Importing dotenv to load environment variables from a .env file
const { errorHandler } = require('./middleware/errorMiddleware'); // Importing custom error handling middleware
const connectDB = require('./config/db'); // Importing the function to connect to the database
const port = process.env.PORT || 5000; // Setting the port from environment variables or default to 5000

connectDB(); // Connect to the database

const app = express(); // Initialize the Express application

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Routes for API endpoints
app.use('/api/notes', require('./routes/notesRoutes')); // Notes-related routes
app.use('/api/users', require('./routes/userRoutes')); // User-related routes

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build'))); // Serve static files from the frontend build directory

  // Serve the frontend's index.html file for any other route
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html') // Resolve the path to index.html
    )
  );
} else {
  // Message to display in non-production environments
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Error handling middleware
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`)); // Log a message when the server starts
