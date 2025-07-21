// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch leave data for all users (admin-level)
export const fetchLeaves = createAsyncThunk(
  'leaves/fetchLeaves', // Action type
  async (email, thunkAPI) => { // Accepts email for querying leaves
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get API base URL from environment variables
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

    // Make a POST request to fetch all leaves
    const response = await fetch(`${API_BASE_URL}/leave/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set request content type to JSON
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
      body: JSON.stringify({ email }), // Send email in request body
    });

    // If response is not ok, throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch leaves');
    }

    return await response.json(); // Parse and return JSON response
  }
);

// Create the leaves slice
const leavesSlice = createSlice({
  name: 'leaves', // Slice name
  initialState: {
    list: [],      // List of all leave records
    form: {},      // Current leave form data
    loading: false, // Loading status for async actions
    error: null     // Error state
  },
  reducers: {
    // Action to manually set leave list
    setLeaves: (state, action) => {
      state.list = action.payload;
    },
    // Action to set form data
    setLeaveForm: (state, action) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchLeaves pending state
    builder.addCase(fetchLeaves.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null;   // Clear previous errors
    });
    // Handle fetchLeaves fulfilled state
    builder.addCase(fetchLeaves.fulfilled, (state, action) => {
      state.loading = false; // Stop loading
      state.list = action.payload; // Update leave list with payload
    });
    // Handle fetchLeaves rejected state
    builder.addCase(fetchLeaves.rejected, (state, action) => {
      state.loading = false;           // Stop loading
      state.error = action.error.message; // Store error message
    });
  },
});

// Export actions for use in components
export const { setLeaves, setLeaveForm } = leavesSlice.actions;

// Export the reducer to include in the store
export default leavesSlice.reducer;
