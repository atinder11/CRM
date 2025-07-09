import React, { useState } from "react";
import AttendanceTable from "../components/admin/AttendanceTable";
import LeaveApplications from "../components/admin/LeaveApplications";
import EmployeesTable from "../components/admin/EmployeesTable";
import EmployeesBarChart from "../components/admin/EmployeesBarChart";
import DashboardHeader from "../components/admin/DashboardHeader";
import DashboardCard from "../components/admin/DashboardCard";

const AdminDashboard = () => {
  const [resultBox, setResultBox] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const showAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const attendanceRes = await fetch(`${API_BASE_URL}/attendance/attendance-all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({}),
      });
      const attendanceData = await attendanceRes.json();
      setAttendanceData(attendanceData);
      setResultBox("attendance");
      setShowChart(false);
    } catch (err) {
      console.error(err);
      setResultBox("error-attendance");
    }
  };

  const getAllLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/leave/all-leaves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      setLeaves(data);
      setResultBox("leaves");
      setShowChart(false);
    } catch (err) {
      console.error(err);
      setResultBox("error-leaves");
    }
  };




  const openOutlook = (email, name, reason, fromDate, toDate) => {
    const subject = `Regarding Your Leave Application`;
    const body = `Hi ${name},\n\nYour leave request from ${new Date(
      fromDate
    ).toLocaleDateString()} to ${new Date(toDate).toLocaleDateString()} for the reason "${reason}" has been received.\n\nRegards,\nAdmin`;
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  };





  const getEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/auth/get-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      setEmployees(data);
      const roleCount = {};
      data.forEach((emp) => {
        roleCount[emp.role] = (roleCount[emp.role] || 0) + 1;
      });
      const chartData = Object.keys(roleCount).map((role) => ({
        role,
        count: roleCount[role],
      }));
      setChartData(chartData);
      setShowChart(true);
      setResultBox("employees");
    } catch (err) {
      console.error(err);
      setResultBox("error-employees");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <DashboardHeader onLogout={handleLogout} />
      <h2 className="text-3xl font-bold mb-8 text-center">Welcome to Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          iconClass="bi bi-clock-history text-purple-600"
          title="Show Attendance"
          buttonText="View"
          buttonClass="bg-purple-600 text-white hover:bg-purple-700"
          onClick={showAttendance}
        />
        <DashboardCard
          iconClass="bi bi-megaphone text-green-600"
          title="Post Announcement"
          buttonText="Post"
          buttonClass="bg-green-600 text-white hover:bg-green-700"
          onClick={() => (window.location.href = "/announcement")}
        />
        <DashboardCard
          iconClass="bi bi-people text-blue-600"
          title="Show All Employees"
          buttonText="Fetch"
          buttonClass="bg-blue-600 text-white hover:bg-blue-700"
          onClick={getEmployees}
        />
        <DashboardCard
          iconClass="bi bi-journal-check text-yellow-600"
          title="See Leave Applications"
          buttonText="View"
          buttonClass="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={getAllLeaves}
        />
      </div>
      {showChart && <EmployeesBarChart chartData={chartData} />}
      <div className="mt-6">
        {resultBox === "attendance" && <AttendanceTable attendanceData={attendanceData} />}
        {resultBox === "leaves" && <LeaveApplications leaves={leaves} openOutlook={openOutlook} />}
        {resultBox === "employees" && <EmployeesTable employees={employees} />}
        {resultBox === "error-attendance" && <p className="text-red-500">Error loading attendance data.</p>}
        {resultBox === "error-leaves" && <p className="text-red-500">Failed to fetch leave data.</p>}
        {resultBox === "error-employees" && <p className="text-red-500">Failed to fetch employees data.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
