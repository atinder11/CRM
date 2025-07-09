import React from "react";

const AttendanceTable = ({ attendanceData }) => (
  <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
    <h4 className="text-xl font-semibold mb-4 text-gray-800">Attendance List</h4>
    <table className="min-w-full table-auto border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-700">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Check In</th>
          <th className="p-2 border">Check Out</th>
          <th className="p-2 border">Total Hours</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((a, i) => {
          const checkIn = new Date(a.checkIn);
          const checkOut = a.checkOut ? new Date(a.checkOut) : null;
          const totalHours =
            a.totalHours !== undefined
              ? a.totalHours
              : checkOut
              ? ((checkOut - checkIn) / (1000 * 60 * 60)).toFixed(2)
              : "—";
          return (
            <tr key={i} className="hover:bg-gray-50 text-gray-800">
              <td className="p-2 border">{a.name || "N/A"}</td>
              <td className="p-2 border">{checkIn.toLocaleString()}</td>
              <td className="p-2 border">{checkOut ? checkOut.toLocaleString() : "—"}</td>
              <td className="p-2 border">{totalHours}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AttendanceTable;
