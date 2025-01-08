import axios from 'axios'; // Importing axios for making HTTP requests

const API_URL = '/api/users/'; // The base URL for the user-related API endpoints

// Register user
const register = async (userData) => {
  // Sending a POST request to the API to register a new user
  const response = await axios.post(API_URL, userData);

  // If the response contains user data, save it to localStorage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  // Return the response data (user data)
  return response.data;
};

// Login user
const login = async (userData) => {
  // Sending a POST request to the API to log in the user
  const response = await axios.post(API_URL + 'login', userData);

  // If the response contains user data, save it to localStorage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  // Return the response data (user data)
  return response.data;
};

// Logout user
const logout = () => {
  // Remove the user data from localStorage to log the user out
  localStorage.removeItem('user');
};

// Exporting the authentication service with the register, login, and logout methods
const authService = {
  register,
  logout,
  login,
};

export default authService; // Exporting authService for use in other parts of the application
