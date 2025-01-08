const mongoose = require('mongoose'); // Importing the mongoose library

// Define the schema for notes
const notesSchema = mongoose.Schema(
  {
    // Field to associate the note with a user
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the ObjectId of a User
      required: true, // This field is required
      ref: 'User', // Reference to the 'User' model
    },
    // Field to store the text of the note
    text: {
      type: String, // Text field of type String
      required: [true, 'Please add a text value'], // This field is required with a custom error message
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' timestamps
  }
);

// Export the Notes model using the notesSchema
module.exports = mongoose.model('Notes', notesSchema);
