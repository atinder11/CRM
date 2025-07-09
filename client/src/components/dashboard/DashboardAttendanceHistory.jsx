import React from "react";

const DashboardAttendanceHistory = ({ attendanceWeek, attendanceMonth }) => (
  <div>
    <h4 className="text-xl font-semibold mb-4">Attendance</h4>
    <div className="mb-6">
      <strong>Last 7 Days:</strong>
      <ul className="list-group">
        {attendanceWeek.length === 0 ? (
          <li className="list-group-item text-center">No records</li>
        ) : (
          attendanceWeek.map((a, index) => (
            <li key={index} className="list-group-item">
              {new Date(a.checkIn).toLocaleString()} → {new Date(a.checkOut).toLocaleString()} | {a.totalHours} hrs
            </li>
          ))
        )}
      </ul>
    </div>
    <div>
      <strong>Last 30 Days:</strong>
      <ul className="list-group">
        {attendanceMonth.length === 0 ? (
          <li className="list-group-item text-center">No records</li>
        ) : (
          attendanceMonth.map((a, index) => (
            <li key={index} className="list-group-item">
              {new Date(a.checkIn).toLocaleString()} → {new Date(a.checkOut).toLocaleString()} | {a.totalHours} hrs
            </li>
          ))
        )}
      </ul>
    </div>
  </div>
);

export default DashboardAttendanceHistory;
