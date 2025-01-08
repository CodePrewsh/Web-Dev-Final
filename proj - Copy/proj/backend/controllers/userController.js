const jwt = require('jsonwebtoken'); // Importing JSON Web Token library
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const asyncHandler = require('express-async-handler'); // Importing asyncHandler to handle async errors
const User = require('../models/userModel'); // Importing the User model

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Destructuring request body to get name, email, and password

  // Check if all required fields are provided
  if (!name || !email || !password) {
    res.status(400); // Set HTTP status to 400 (Bad Request)
    throw new Error('Please add all fields'); // Throw an error for missing fields
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Set HTTP status to 400 (Bad Request)
    throw new Error('User already exists'); // Throw an error if user exists
  }

  // Hash the user's password
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

  // Create a new user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Check if user was successfully created
  if (user) {
    res.status(201).json({ // Send a 201 response with user data and token
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Set HTTP status to 400 (Bad Request)
    throw new Error('Invalid user data'); // Throw an error for invalid user data
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Destructuring request body to get email and password

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ // Send a response with user data and token
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Set HTTP status to 400 (Bad Request)
    throw new Error('Invalid credentials'); // Throw an error for invalid credentials
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user); // Send the user data as a response
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Set token expiration time to 30 days
  });
};

module.exports = {
  registerUser, // Export the registerUser function
  loginUser, // Export the loginUser function
  getMe, // Export the getMe function
};
