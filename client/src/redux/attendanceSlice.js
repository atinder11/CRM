import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch attendance week
export const fetchAttendanceWeek = createAsyncThunk(
  'attendance/fetchAttendanceWeek',
  async (email, thunkAPI) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/attendance/attendance-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, filter: 'week' }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch attendance week');
    }
    return await response.json();
  }
);

// Thunk to fetch attendance month
export const fetchAttendanceMonth = createAsyncThunk(
  'attendance/fetchAttendanceMonth',
  async (email, thunkAPI) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/attendance/attendance-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, filter: 'month' }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch attendance month');
    }
    return await response.json();
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { week: [], month: [], loading: false, error: null },
  reducers: {
    setAttendanceWeek: (state, action) => {
      state.week = action.payload;
    },
    setAttendanceMonth: (state, action) => {
      state.month = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceWeek.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceWeek.fulfilled, (state, action) => {
        state.loading = false;
        state.week = action.payload;
      })
      .addCase(fetchAttendanceWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAttendanceMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.month = action.payload;
      })
      .addCase(fetchAttendanceMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAttendanceWeek, setAttendanceMonth } = attendanceSlice.actions;
export default attendanceSlice.reducer;
