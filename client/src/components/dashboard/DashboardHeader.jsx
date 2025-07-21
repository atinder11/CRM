import React from "react";
import { FaUserEdit } from "react-icons/fa";

const DashboardHeader = ({
  empName = "User",
  empRole = "Employee",
  profilePic,
  onEditProfile,
  onLogout
}) => {
  const imageUrl = profilePic
    ? `${import.meta.env.VITE_API_BASE_URL3}/uploads/${profilePic}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  console.log("ProfilePic Filename:", profilePic);
  console.log("Full URL:", imageUrl);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, <span className="font-bold">{empName}</span>
          </h2>
          <p className="text-sm text-gray-600">Role: {empRole}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-neutral flex items-center"
          onClick={onEditProfile}
        >
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>
        <button
          type="button"
          className="btn btn-error"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
