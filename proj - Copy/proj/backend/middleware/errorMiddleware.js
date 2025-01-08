// Error handling middleware function
const errorHandler = (err, req, res, next) => {
  // Determine the status code; use the existing response status code or default to 500 (Internal Server Error)
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Set the response status code
  res.status(statusCode);

  // Send a JSON response with the error message and stack trace (only in development mode)
  res.json({
    message: err.message, // Include the error message
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Include the stack trace only if not in production
  });
};

// Export the errorHandler middleware for use in other parts of the application
module.exports = {
  errorHandler,
};
