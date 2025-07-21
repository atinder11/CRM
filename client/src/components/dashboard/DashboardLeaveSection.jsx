import React from "react";

// Debug log for leaves prop
// eslint-disable-next-line no-console
const debugLeaves = (leaves) => { console.log('[DashboardLeaveSection] leaves:', leaves); };

const DashboardLeaveSection = ({ leaves, leaveForm, handleLeaveSubmit, handleLeaveChange }) => {
  debugLeaves(leaves);
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Apply Leave Form */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h4 className="text-xl font-semibold mb-4 text-purple-700">Apply for Leave</h4>
      <form onSubmit={handleLeaveSubmit} className="space-y-4">
        <div>
          <label htmlFor="reason" className="block font-medium text-gray-700">Reason</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={leaveForm.reason}
            onChange={handleLeaveChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="from" className="block font-medium text-gray-700">From Date</label>
          <input
            type="date"
            id="from"
            name="from"
            value={leaveForm.from}
            onChange={handleLeaveChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="to" className="block font-medium text-gray-700">To Date</label>
          <input
            type="date"
            id="to"
            name="to"
            value={leaveForm.to}
            onChange={handleLeaveChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
          Apply Leave
        </button>
      </form>
    </div>
    {/* Applied Leaves */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h4 className="text-xl font-semibold mb-4 text-purple-700">Your Applied Leaves</h4>
      <ul className="space-y-3">
        {leaves.length === 0 ? (
          <li className="text-center text-gray-500">No leaves found.</li>
        ) : (
          leaves.map((l, index) => {
            const from = new Date(l.from).toLocaleDateString();
            const to = new Date(l.to).toLocaleDateString();
            const appliedAt = new Date(l.appliedAt).toLocaleDateString();
            return (
              <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <strong className="block text-purple-800">{l.reason}</strong>
                <p className="text-sm text-gray-700">From: {from} — To: {to}</p>
                <p className="text-xs text-gray-500">Applied on: {appliedAt}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  </div>
  );
};

export default DashboardLeaveSection;
