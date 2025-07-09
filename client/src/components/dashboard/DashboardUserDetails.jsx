import React from "react";

const DashboardUserDetails = ({ profileData }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">User Details</h4>
    {profileData && !profileData.error ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
        {[
          { label: "Work Number", value: profileData.workNumber },
          { label: "Location", value: profileData.location },
          { label: "Shift", value: profileData.shift },
          { label: "Skills", value: profileData.skills },
          { label: "About Me", value: profileData.aboutMe },
          { label: "Marital Status", value: profileData.maritalStatus },
          { label: "Address", value: profileData.address },
          { label: "Education", value: profileData.education },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-lg p-4 hover:shadow transition duration-300"
          >
            <div className="text-xs uppercase text-purple-600 tracking-wide font-semibold mb-1">
              {item.label}
            </div>
            <div className="text-base font-medium text-gray-800">
              {item.value?.trim() ? item.value : <span className="text-red-500 italic">No details found</span>}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center">
        <p className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-md mt-4 mb-4">
          No profile details found. Please create your profile.
        </p>
        <a
          href="/profile-builder"
          className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Go to Profile Builder
        </a>
      </div>
    )}
  </div>
);

export default DashboardUserDetails;
