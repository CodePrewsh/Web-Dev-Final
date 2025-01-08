import { configureStore } from '@reduxjs/toolkit'; // Importing Redux Toolkit's configureStore function
import authReducer from '../features/auth/authSlice'; // Importing the auth slice reducer
import notesReducer from '../features/notes/notesSlice'; // Importing the notes slice reducer

// Configuring the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Adding the auth slice to the store
    notes: notesReducer, // Adding the notes slice to the store
  },
});
