import React from "react";
import { useSelector } from "react-redux";

const UserDetails = ({ profileData }) => {
  // Use profileData from props or fallback to Redux
  const reduxProfile = useSelector((state) => state.profile.data);
  const data = profileData && Object.keys(profileData).length ? profileData : reduxProfile;

  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center text-gray-500">No profile data found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
      <img
        src={data.profilePic ? data.profilePic : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-purple-500 mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">{data.name || "Employee"}</h2>
      <div className="text-gray-600 mb-1">Employee ID: <span className="font-semibold">{data.empId || "-"}</span></div>
      <div className="text-gray-600 mb-1">Email: <span className="font-semibold">{data.email || "-"}</span></div>
      <div className="text-gray-600 mb-1">Role: <span className="font-semibold">{data.role || "-"}</span></div>
      <div className="text-gray-600 mb-1">Position: <span className="font-semibold">{data.position || "-"}</span></div>
      <div className="text-gray-500 text-sm mt-2">Last updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "-"}</div>
    </div>
  );
};

export default UserDetails;
