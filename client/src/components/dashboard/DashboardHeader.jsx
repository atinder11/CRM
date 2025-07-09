import React from "react";
import { FaUserEdit } from "react-icons/fa";

const DashboardHeader = ({ empName, empRole, profilePic, onEditProfile, onLogout }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
    <div>
      <div className="flex items-center gap-4">
        <img
          src={profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, <span className="font-bold">{empName}</span>
          </h2>
          <p className="text-sm text-gray-600">Role: {empRole}</p>
        </div>
      </div>
    </div>
    <div className="flex gap-2">
      <button
        className="btn btn-neutral"
        onClick={onEditProfile}
      >
        <FaUserEdit className="mr-2" /> Edit Profile
      </button>
      <button
        className="btn btn-error"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  </div>
);

export default DashboardHeader;
