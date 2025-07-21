// Importing functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch weekly attendance data
export const fetchAttendanceWeek = createAsyncThunk(
  'attendance/fetchAttendanceWeek', // action type
  async (email, thunkAPI) => { // receives email and thunkAPI
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // get API base URL from env
    const token = localStorage.getItem('token'); // get token from localStorage

    // Make POST request to fetch weekly attendance
    const response = await fetch(`${API_BASE_URL}/attendance/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // set content type
        Authorization: `Bearer ${token}`, // send token in Authorization header
      },
      body: JSON.stringify({ email, filter: 'week' }), // send email and filter
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attendance week'); // throw error if response not ok
    }

    return await response.json(); // return parsed response
  }
);

// Async thunk to fetch monthly attendance data
export const fetchAttendanceMonth = createAsyncThunk(
  'attendance/fetchAttendanceMonth', // action type
  async (email, thunkAPI) => { // receives email and thunkAPI
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // get API base URL
    const token = localStorage.getItem('token'); // get token from localStorage

    // Make POST request to fetch monthly attendance
    const response = await fetch(`${API_BASE_URL}/attendance/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // set content type
        Authorization: `Bearer ${token}`, // send token in Authorization header
      },
      body: JSON.stringify({ email, filter: 'month' }), // send email and filter
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attendance month'); // throw error if response not ok
    }

    return await response.json(); // return parsed response
  }
);

// Async thunk to fetch all attendance records (admin use)
export const fetchAllAttendance = createAsyncThunk(
  'attendance/fetchAllAttendance', // action type
  async (_, thunkAPI) => { // no input param
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // get API base URL
    const token = localStorage.getItem('token'); // get token from localStorage

    // Make GET request to fetch all attendance data
    const response = await fetch(`${API_BASE_URL}/attendance/all`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token in Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch all attendance'); // throw error if response not ok
    }

    return await response.json(); // return parsed response
  }
);

// Creating a slice for attendance
const attendanceSlice = createSlice({
  name: 'attendance', // slice name
  initialState: { week: [], month: [], loading: false, error: null }, // initial state

  // Regular reducers
  reducers: {
    // Manually set weekly attendance
    setAttendanceWeek: (state, action) => {
      state.week = action.payload;
    },
    // Manually set monthly attendance
    setAttendanceMonth: (state, action) => {
      state.month = action.payload;
    },
  },

  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Pending state for weekly fetch
      .addCase(fetchAttendanceWeek.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state for weekly fetch
      .addCase(fetchAttendanceWeek.fulfilled, (state, action) => {
        state.loading = false;
        state.week = action.payload;
      })
      // Rejected state for weekly fetch
      .addCase(fetchAttendanceWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Pending state for monthly fetch
      .addCase(fetchAttendanceMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state for monthly fetch
      .addCase(fetchAttendanceMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.month = action.payload;
      })
      // Rejected state for monthly fetch
      .addCase(fetchAttendanceMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators
export const { setAttendanceWeek, setAttendanceMonth } = attendanceSlice.actions;

// Export reducer
export default attendanceSlice.reducer;
