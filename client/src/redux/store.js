// Importing configureStore from Redux Toolkit to create the Redux store
import { configureStore } from '@reduxjs/toolkit';

// Importing individual reducers from their respective slices
import employeesReducer from './employeesSlice';
import announcementsReducer from './announcementsSlice';
import attendanceReducer from './attendanceSlice';
import leavesReducer from './leavesSlice';
import profileReducer from './profileSlice';

// Creating and configuring the Redux store with all slices/reducers
const store = configureStore({
  reducer: {
    employees: employeesReducer,       // State slice for employees
    announcements: announcementsReducer, // State slice for announcements
    attendance: attendanceReducer,     // State slice for attendance
    leaves: leavesReducer,             // State slice for leave requests
    profile: profileReducer,           // State slice for user profile
  },
});

// Exporting the configured Redux store to be used in the app
export default store;
