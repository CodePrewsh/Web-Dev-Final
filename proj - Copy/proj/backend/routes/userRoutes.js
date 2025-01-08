const express = require('express'); // Importing the Express library
const router = express.Router(); // Creating an instance of the Express router
const {
  registerUser, // Controller function to register a new user
  loginUser, // Controller function to log in a user
  getMe, // Controller function to get the logged-in user's data
} = require('../controllers/userController'); // Importing the user controller functions

const { protect } = require('../middleware/authMiddleware'); // Importing the middleware to protect routes

// Route to register a new user
router.post('/', registerUser); // POST request to register a user

// Route to log in a user
router.post('/login', loginUser); // POST request to log in a user

// Route to get the logged-in user's data
router.get('/me', protect, getMe); // GET request, protected by the middleware

// Export the router for use in the application
module.exports = router;
