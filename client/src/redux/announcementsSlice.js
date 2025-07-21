// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk for fetching announcements from the backend
export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements', // Action type prefix
  async (_, thunkAPI) => { // Async function body (no input payload needed here)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get API base URL from environment variable
    const token = localStorage.getItem('token'); // Get JWT token from local storage

    // Make POST request to fetch announcements
    const response = await fetch(`${API_BASE_URL}/announcement/view`, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Set request body format
        Authorization: `Bearer ${token}`, // Pass the token in Authorization header
      }, 
    });

    // If response is not ok, throw error
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }

    return await response.json(); // Return parsed JSON data
  }
);

// Create a Redux slice for announcements
const announcementsSlice = createSlice({
  name: 'announcements', // Slice name
  initialState: { list: [], loading: false, error: null }, // Initial state
  reducers: {
    // Reducer to manually set announcements list
    setAnnouncements: (state, action) => {
      state.list = action.payload; // Update list with payload
    },
  },
  extraReducers: (builder) => {
    // Handle async states of fetchAnnouncements
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true; // Set loading true when fetching starts
        state.error = null;   // Reset error
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;      // Set loading false on success
        state.list = action.payload; // Update list with fetched data
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;        // Set loading false on failure
        state.error = action.error.message; // Set error message
      });
  },
});

// Export the action to set announcements manually
export const { setAnnouncements } = announcementsSlice.actions;

// Export the reducer to use in the Redux store
export default announcementsSlice.reducer;
