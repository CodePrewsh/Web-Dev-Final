const express = require("express"); // Importing the Express library
const router = express.Router(); // Creating an instance of the Express router
const {
  getNotes, // Controller function to get all notes
  setNotes, // Controller function to create a new note
  updateNotes, // Controller function to update an existing note
  deleteNotes, // Controller function to delete a note
} = require("../controllers/notesController"); // Importing the notes controller functions

const { protect } = require("../middleware/authMiddleware"); // Importing the middleware to protect routes

// Define routes for notes
router
  .route("/") // Route for the root of the notes endpoint
  .get(protect, getNotes) // GET request to fetch notes, protected by the middleware
  .post(protect, setNotes); // POST request to create a new note, protected by the middleware

router
  .route("/:id") // Route for specific note operations by ID
  .delete(protect, deleteNotes) // DELETE request to remove a note, protected by the middleware
  .put(protect, updateNotes); // PUT request to update a note, protected by the middleware

// Export the router for use in the application
module.exports = router;
