import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch announcements
export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async (_, thunkAPI) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/announcement/view-announcement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    return await response.json();
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState: { list: [], loading: false, error: null },
  reducers: {
    setAnnouncements: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAnnouncements } = announcementsSlice.actions;
export default announcementsSlice.reducer;
