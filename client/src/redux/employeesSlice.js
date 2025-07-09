import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch employees
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, thunkAPI) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/get-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return await response.json();
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { list: [], loading: false, error: null },
  reducers: {
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
