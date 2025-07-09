import React from "react";
import { FaUsers, FaBullhorn, FaCalendarCheck, FaFileAlt, FaSignOutAlt, FaHome } from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab, logout }) => (
  <div
    className="bg-gradient-to-b from-purple-700 to-purple-900 text-white w-full md:w-64 p-4 space-y-4"
    style={{
      position: 'sticky',
      top: 0,
      height: '100vh',
      minHeight: '100vh',
      maxHeight: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <h3 className="text-center text-2xl font-bold tracking-wide">rStar Panel</h3>
    <button
      className={`btn ${activeTab === "dashboard" ? "btn-active" : "btn-ghost"} justify-start w-full`}
      onClick={() => setActiveTab("dashboard")}
    >
      <FaHome className="mr-2" /> Dashboard
    </button>
    <button
      className={`btn ${activeTab === "employees" ? "btn-active" : "btn-ghost"} justify-start w-full`}
      onClick={() => setActiveTab("employees")}
    >
      <FaUsers className="mr-2" /> All Employees
    </button>
    <button
      className={`btn ${activeTab === "announcements" ? "btn-active" : "btn-ghost"} justify-start w-full`}
      onClick={() => setActiveTab("announcements")}
    >
      <FaBullhorn className="mr-2" /> Announcements
    </button>
    <button
      className={`btn ${activeTab === "attendance" ? "btn-active" : "btn-ghost"} justify-start w-full`}
      onClick={() => setActiveTab("attendance")}
    >
      <FaCalendarCheck className="mr-2" /> Attendance
    </button>
    <button
      className={`btn ${activeTab === "leaves" ? "btn-active" : "btn-ghost"} justify-start w-full`}
      onClick={() => setActiveTab("leaves")}
    >
      <FaFileAlt className="mr-2" /> Leave Requests
    </button>
    <div style={{ flex: 1 }} />
    <button
      className="btn btn-error justify-start w-full"
      onClick={logout}
    >
      <FaSignOutAlt className="mr-2" /> Logout
    </button>
  </div>
);

export default Sidebar;
