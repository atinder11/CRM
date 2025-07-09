import React from "react";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

const LeaveApplications = ({ leaves, openOutlook }) => {
  if (!leaves || leaves.length === 0) {
    return <p className="text-gray-500">No leave applications found.</p>;
  }
  return (
    <div>
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Leave Applications</h4>
      {leaves.map((leave, i) => (
        <div key={i} className="bg-white shadow rounded-lg p-4 mb-4">
          <h6 className="text-lg font-semibold mb-2">
            {leave.name} <span className="text-sm text-gray-600">({leave.email})</span>
          </h6>
          <p className="mb-1"><strong>Reason:</strong> {leave.reason}</p>
          <p className="mb-3">
            <strong>From:</strong> {new Date(leave.from).toLocaleDateString()} {" "}
            <strong>To:</strong> {new Date(leave.to).toLocaleDateString()}
          </p>
          <button
            className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
            onClick={() => openOutlook(leave.email, leave.name, leave.reason, leave.from, leave.to)}
          >
            <PiMicrosoftOutlookLogoFill size={18} /> Reply via Mail
          </button>
        </div>
      ))}
    </div>
  );
};

export default LeaveApplications;
