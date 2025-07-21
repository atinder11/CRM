
import React from "react";

const DashboardHeader = ({ onLogout }) => (
  <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-blue-700 text-white p-5 rounded-xl flex justify-between items-center mb-8 shadow">
    <div className="text-2xl font-bold flex items-center gap-2">
      <i className="bi bi-speedometer2"></i> Admin Panel
    </div>
    <button
      onClick={onLogout}
      className="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
    >
      <i className="bi bi-box-arrow-right mr-1"></i> Logout
    </button>
  </div>
);

export default DashboardHeader;
