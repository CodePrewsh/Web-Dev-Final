import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importing Redux Toolkit's createSlice and createAsyncThunk
import authService from './authService'; // Importing the authService for authentication actions

// Get user from localStorage (to persist user data across page reloads)
const user = JSON.parse(localStorage.getItem('user'));

// Initial state for the auth slice
const initialState = {
  user: user ? user : null, // If user data exists in localStorage, use it; otherwise, set user to null
  isError: false, // Boolean to track error state
  isSuccess: false, // Boolean to track success state
  isLoading: false, // Boolean to track loading state during async operations
  message: '', // Message to store any error or success message
};

// Register user using createAsyncThunk to handle async logic
export const register = createAsyncThunk(
  'auth/register', // Name of the action
  async (user, thunkAPI) => {
    try {
      // Attempt to register the user via the authService
      return await authService.register(user);
    } catch (error) {
      // Handle error and return the error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user using createAsyncThunk to handle async logic
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    // Attempt to log in the user via the authService
    return await authService.login(user);
  } catch (error) {
    // Handle error and return the error message
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user using createAsyncThunk
export const logout = createAsyncThunk('auth/logout', async () => {
  // Logout the user via the authService
  await authService.logout();
});

// Auth slice to manage authentication state
export const authSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reset authentication state
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // Handle pending, fulfilled, and rejected states for async actions
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true; // Set loading to true when registration starts
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false when registration succeeds
        state.isSuccess = true; // Set success to true
        state.user = action.payload; // Store the user data in the state
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false when registration fails
        state.isError = true; // Set error to true
        state.message = action.payload; // Store the error message
        state.user = null; // Reset the user data
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Set loading to true when login starts
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false when login succeeds
        state.isSuccess = true; // Set success to true
        state.user = action.payload; // Store the user data in the state
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false when login fails
        state.isError = true; // Set error to true
        state.message = action.payload; // Store the error message
        state.user = null; // Reset the user data
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null; // Clear the user data on logout
      });
  },
});

// Export the reset action and the reducer for the auth slice
export const { reset } = authSlice.actions;
export default authSlice.reducer;
