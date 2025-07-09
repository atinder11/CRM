import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch leaves
export const fetchLeaves = createAsyncThunk(
  'leaves/fetchLeaves',
  async (email, thunkAPI) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/leave/leave-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch leaves');
    }
    return await response.json();
  }
);

const leavesSlice = createSlice({
  name: 'leaves',
  initialState: { list: [], form: {}, loading: false, error: null },
  reducers: {
    setLeaves: (state, action) => {
      state.list = action.payload;
    },
    setLeaveForm: (state, action) => {
      state.form = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLeaves, setLeaveForm } = leavesSlice.actions;
export default leavesSlice.reducer;
