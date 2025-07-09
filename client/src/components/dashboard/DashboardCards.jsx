import React from "react";
const DashboardCards = ({ setActiveTab }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold">Employees</h3>
      <p className="mb-4">View and manage all employee data.</p>
      <button 
        className="btn btn-sm btn-neutral"
        onClick={() => setActiveTab("employees")}
      >
        View Employees
      </button>
    </div>
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold">Announcements</h3>
      <p className="mb-4">Post or view announcements.</p>
      <button 
        className="btn btn-sm btn-neutral"
        onClick={() => setActiveTab("announcements")}
      >
        Go to Announcements
      </button>
    </div>
    <div className="bg-gradient-to-r from-purple-800 to-indigo-600 text-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold">Attendance</h3>
      <p className="mb-4">Track working hours & logs.</p>
      <button 
        className="btn btn-sm btn-neutral"
        onClick={() => setActiveTab("attendance")}
      >
        Show Attendance
      </button>
    </div>
    <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold">Leave Requests</h3>
      <p className="mb-4">Approve or reject leave requests.</p>
      <button 
        className="btn btn-sm btn-neutral"
        onClick={() => setActiveTab("leaves")}
      >
        Manage Leaves
      </button>
    </div>
  </div>
);

export default DashboardCards;
