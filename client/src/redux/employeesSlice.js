// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk to fetch employees from backend API
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees', // Action type name
  async (_, thunkAPI) => { // Async logic
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get base API URL from environment variables
    const token = localStorage.getItem('token'); // Get JWT token from localStorage

    // Make POST request to fetch users
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content type
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    });

    // If response is not OK, throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    // Return the JSON response
    return await response.json();
  }
);

// Create the Redux slice for employees
const employeesSlice = createSlice({
  name: 'employees', // Slice name
  initialState: { list: [], loading: false, error: null }, // Initial state
  reducers: {
    // Reducer to manually set employees list
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle pending state of async fetch
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true; // Set loading to true
      state.error = null; // Clear any previous error
    });

    // Handle fulfilled state
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false; // Set loading to false
      state.list = action.payload; // Set employee list to payload
    });

    // Handle rejected state
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false; // Set loading to false
      state.error = action.error.message; // Store error message
    });
  },
});

// Export the setEmployees action
export const { setEmployees } = employeesSlice.actions;

// Export the reducer to use in the store
export default employeesSlice.reducer;
