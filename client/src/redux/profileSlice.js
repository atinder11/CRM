import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch profile data
export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async (email, thunkAPI) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/profile/get-user-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    return await response.json();
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: {}, loading: false, error: null },
  reducers: {
    setProfileData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
