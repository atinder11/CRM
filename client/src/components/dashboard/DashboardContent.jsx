import React from "react";
import EmployeesTable from "../admin/EmployeesTable";
import Announcements from "./DashboardAnnouncements";
import AttendanceHistory from "./DashboardAttendanceHistory";
import LeaveSection from "./DashboardLeaveSection";
import UserDetails from "./DashboardUserDetails";

const DashboardContent = ({
  activeTab,
  employees,
  announcements,
  attendanceWeek,
  attendanceMonth,
  leaves,
  leaveForm,
  handleLeaveSubmit,
  handleLeaveChange,
  profileData
}) => {
  switch (activeTab) {
    case "employees":
      return <EmployeesTable employees={employees} />;
    case "announcements":
      return <Announcements announcements={announcements} />;
    case "attendance":
      return <AttendanceHistory attendanceWeek={attendanceWeek} attendanceMonth={attendanceMonth} />;
    case "leaves":
      return <LeaveSection leaves={leaves} leaveForm={leaveForm} handleLeaveSubmit={handleLeaveSubmit} handleLeaveChange={handleLeaveChange} />;
    default:
      return <UserDetails profileData={profileData} />;
  }
};

export default DashboardContent;
