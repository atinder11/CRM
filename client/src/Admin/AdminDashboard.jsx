import React, { useState } from "react";

import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [resultBox, setResultBox] = useState("");
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const API = "http://localhost:8000";

  const showAttendance = async () => {
    try {
      const [attendanceRes, usersRes] = await Promise.all([
        fetch(`${API}/attendance-all`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }),
        fetch(`${API}/get-users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }),
      ]);
      const attendanceData = await attendanceRes.json();

      const html = (
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

      setResultBox(html);
      setShowChart(false);
    } catch (err) {
      console.error(err);
      setResultBox(<p className="text-red-500">Error loading attendance data.</p>);
    }
  };



  const getAllLeaves = async () => {
  try {
    const res = await fetch(`${API}/all-leaves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.length === 0) {
      setResultBox(<p className="text-gray-500">No leave applications found.</p>);
      return;
    }

    const leaveCards = data.map((leave, i) => (
      

<div key={i} className="bg-white shadow rounded-lg p-4 mb-4">
  <h6 className="text-lg font-semibold mb-2">
    {leave.name} <span className="text-sm text-gray-600">({leave.email})</span>
  </h6>
  <p className="mb-1"><strong>Reason:</strong> {leave.reason}</p>
  <p className="mb-3">
    <strong>From:</strong> {new Date(leave.from).toLocaleDateString()}{" "}
    <strong>To:</strong> {new Date(leave.to).toLocaleDateString()}
  </p>
  <button
    className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
    onClick={() =>
      openOutlook(
        leave.email,
        leave.name,
        leave.reason,
        leave.from,
        leave.to
      )
    }
  >
    <PiMicrosoftOutlookLogoFill size={18} /> Reply via Mail
    </button>
      </div>

    ));

    setResultBox(
      <div>
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Leave Applications</h4>
        {leaveCards}
      </div>
    );
    setShowChart(false);
  } catch (err) {
    console.error(err);
    setResultBox(<p className="text-red-500">Failed to fetch leave data.</p>);
  }
};




  const openOutlook = (email, name, reason, fromDate, toDate) => {
  const subject = `Regarding Your Leave Application`;
  const body = `Hi ${name},\n\nYour leave request from ${new Date(
    fromDate
  ).toLocaleDateString()} to ${new Date(toDate).toLocaleDateString()} for the reason "${reason}" has been received.\n\nRegards,\nAdmin`;

  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(url, "_blank");
};





  const getEmployees = async () => {
    try {
      const res = await fetch(`${API}/get-users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      const roleCount = {};
      data.forEach((emp) => {
        roleCount[emp.role] = (roleCount[emp.role] || 0) + 1;
      });

      const chartData = Object.keys(roleCount).map((role) => ({
        role,
        count: roleCount[role],
      }));
      setChartData(chartData);
      setShowChart(true);

      const html = (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">All Employees</h4>
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Position</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50 text-gray-800">
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.role}</td>
                  <td className="p-2 border">{u.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      setResultBox(html);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white p-5 rounded-xl flex justify-between items-center mb-8 shadow">
        <div className="text-2xl font-bold flex items-center gap-2">
          <i className="bi bi-speedometer2"></i> Admin Panel
        </div>
        <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location.href = "/login"; // or use navigate("/login") if using useNavigate()
  }}
  className="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
>
  <i className="bi bi-box-arrow-right mr-1"></i> Logout
</button>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center">Welcome to Admin Dashboard</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
          <i className="bi bi-clock-history text-4xl text-purple-600"></i>
          <h5 className="mt-3 font-semibold">Show Attendance</h5>
          <button
            className="bg-purple-600 text-white mt-3 px-4 py-2 rounded w-full hover:bg-purple-700"
            onClick={showAttendance}
          >
            View
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
          <i className="bi bi-megaphone text-4xl text-green-600"></i>
          <h5 className="mt-3 font-semibold">Post Announcement</h5>
          <button
            className="bg-green-600 text-white mt-3 px-4 py-2 rounded w-full hover:bg-green-700"
            onClick={() => (window.location.href = "/announcement")}
          >
            Post
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
          <i className="bi bi-people text-4xl text-blue-600"></i>
          <h5 className="mt-3 font-semibold">Show All Employees</h5>
          <button
            className="bg-blue-600 text-white mt-3 px-4 py-2 rounded w-full hover:bg-blue-700"
            onClick={getEmployees}
          >
            Fetch
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
          <i className="bi bi-journal-check text-4xl text-yellow-600"></i>
          <h5 className="mt-3 font-semibold">See Leave Applications</h5>
         <button
  className="bg-yellow-500 text-white mt-3 px-4 py-2 rounded w-full hover:bg-yellow-600"
  onClick={getAllLeaves}
>
  View
</button>
        </div>
      </div>

      {showChart && (
        <div className="bg-white rounded-xl p-6 shadow w-full max-w-4xl mx-auto mb-10">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
            Employees by Role
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Number of Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-6">{resultBox}</div>
    </div>
  );
};

export default AdminDashboard;
