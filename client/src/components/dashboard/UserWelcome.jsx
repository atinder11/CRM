import React from "react";

const UserWelcome = ({ empName, empRole, profilePic }) => (
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
);

export default UserWelcome;
