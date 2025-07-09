import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';
import announcementsReducer from './announcementsSlice';
import attendanceReducer from './attendanceSlice';
import leavesReducer from './leavesSlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    announcements: announcementsReducer,
    attendance: attendanceReducer,
    leaves: leavesReducer,
    profile: profileReducer,
  },
});

export default store;
