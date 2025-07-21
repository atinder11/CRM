import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importing necessary Redux Toolkit functions

// Async thunk to fetch profile data
export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData', // Action type
  async (email, thunkAPI) => { // Takes email and thunkAPI for dispatching and error handling
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get API base URL from environment
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const userStr = localStorage.getItem('user'); // Get user string from localStorage
      const user = userStr ? JSON.parse(userStr) : null; // Parse user JSON or set to null

      // Make API call to get profile data
      const res = await fetch(`${API_BASE_URL}/profile/get`, {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Set request content type
          Authorization: `Bearer ${token}`, // Attach Bearer token
        },
        body: JSON.stringify({ email, userId: user?._id }), // Send email and userId in body
      });

      // Handle non-OK response
      if (!res.ok) {
        const error = await res.json(); // Parse error message
        return thunkAPI.rejectWithValue(error?.error || 'Failed to fetch profile data'); // Dispatch rejection with custom message
      }

      return await res.json(); // Return the fetched profile data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Dispatch rejection with error message
    }
  }
);

// Create slice for profile state
const profileSlice = createSlice({
  name: 'profile', // Slice name
  initialState: {
    data: {}, // Profile data object
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    setProfileData: (state, action) => { // Reducer to manually set profile data
      state.data = action.payload; // Assign payload to state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => { // When request is pending
        state.loading = true; // Set loading to true
        state.error = null; // Reset error
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => { // On success
        state.loading = false; // Stop loading
        state.data = action.payload; // Set profile data
      })
      .addCase(fetchProfileData.rejected, (state, action) => { // On failure
        state.loading = false; // Stop loading
        state.error = action.payload || action.error.message; // Set error message
      });
  },
});

// Export the action and reducer
export const { setProfileData } = profileSlice.actions; // Named export for manual data setting
export default profileSlice.reducer; // Export reducer for store setup
