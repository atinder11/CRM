import React from "react";
import { useSelector } from "react-redux";
import EmployeesTable from "../admin/EmployeesTable";
import Announcements from "./DashboardAnnouncements";
import AttendanceHistory from "./DashboardAttendanceHistory";
import LeaveSection from "./DashboardLeaveSection";
import UserDetails from "./DashboardUserDetails";

const DashboardContent = ({ activeTab, handleLeaveSubmit, handleLeaveChange }) => {
  const {
    employees,
    announcements,
    attendanceWeek,
    attendanceMonth,
    leaves,
    leaveForm,
    profileData
  } = useDashboardSelectors();

  const getUserLeaves = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const userId = user._id || user.id || user.userId || "";
    const userEmail = user.email || "";

    return leaves.filter((l) =>
      (l.userId && userId && (l.userId === userId || l.userId?._id === userId)) ||
      (!l.userId && l.email === userEmail)
    );
  };

  switch (activeTab) {
    case "employees":
      return <EmployeesTable employees={employees} />;

    case "announcements":
      return <Announcements announcements={announcements} />;

    case "attendance":
      return <AttendanceHistory attendanceWeek={attendanceWeek} attendanceMonth={attendanceMonth} />;

    case "leaves":
      const userLeaves = getUserLeaves();
      return (
        <LeaveSection
          leaves={userLeaves}
          leaveForm={leaveForm}
          handleLeaveSubmit={handleLeaveSubmit}
          handleLeaveChange={handleLeaveChange}
        />
      );

    default:
      return <UserDetails profileData={profileData} />;
  }
};

const useDashboardSelectors = () => ({
  employees: useSelector((state) => state.employees.list),
  announcements: useSelector((state) => state.announcements.list),
  attendanceWeek: useSelector((state) => state.attendance.week),
  attendanceMonth: useSelector((state) => state.attendance.month),
  leaves: useSelector((state) => state.leaves.list),
  leaveForm: useSelector((state) => state.leaves.form),
  profileData: useSelector((state) => state.profile.data),
});

export default DashboardContent;
