import React from "react";
import EmployeesTable from "../admin/EmployeesTable";
import Announcements from "./DashboardAnnouncements";
import AttendanceHistory from "./DashboardAttendanceHistory";
import LeaveSection from "./DashboardLeaveSection";
import UserDetails from "./DashboardUserDetails";
import { useSelector } from "react-redux";

const DashboardContent = ({
  activeTab,
  handleLeaveSubmit,
  handleLeaveChange
}) => {
  const employees = useSelector((state) => state.employees.list);
  const announcements = useSelector((state) => state.announcements.list);
  const attendanceWeek = useSelector((state) => state.attendance.week);
  const attendanceMonth = useSelector((state) => state.attendance.month);
  const leaves = useSelector((state) => state.leaves.list);
  const leaveForm = useSelector((state) => state.leaves.form);
  const profileData = useSelector((state) => state.profile.data);

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
