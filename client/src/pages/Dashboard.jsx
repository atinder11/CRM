import React, { useState, useEffect } from "react";
import { FaUsers, FaBullhorn, FaCalendarCheck, FaFileAlt, FaSignOutAlt, FaHome, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const empName = user.name || "Employee";
  const empEmail = user.email || "";
  const empRole = user.role || "Employee";

  const [activeTab, setActiveTab] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [attendanceWeek, setAttendanceWeek] = useState([]);
  const [attendanceMonth, setAttendanceMonth] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const [profilePic, setProfilePic] = useState("");
  const [leaveForm, setLeaveForm] = useState({
    reason: "",
    from: "",
    to: ""
  });
const [checkedIn, setCheckedIn] = useState(false);
const [checkInTime, setCheckInTime] = useState(null);
const [elapsed, setElapsed] = useState(0);
const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token || !user?.email) {
    navigate("/login");
  }
}, [navigate]);

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  useEffect(() => {
  const fetchProfile = async () => {
    const res = await fetch("http://localhost:8000/get-user-profile", {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
      body: JSON.stringify({ email: empEmail })
    });
    const data = await res.json();
    if (data?.profilePic) {
      setProfilePic(`http://localhost:8000${data.profilePic}`);
    }
  };

  if (empEmail) {
    fetchProfile();
  }
}, [empEmail]);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:8000/get-user-profile", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
        body: JSON.stringify({ email: empEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setProfileData(data);
      } else {
        setProfileData(null);
      }
    } catch {
      setProfileData(null);
    }
  };

  if (empEmail) fetchProfile();
}, [empEmail]);





const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const startTimer = (start) => {
  const interval = setInterval(() => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(start)) / 1000);
    setElapsed(seconds);
  }, 1000);
  setIntervalId(interval);
};

const stopTimer = () => {
  clearInterval(intervalId);
  setElapsed(0);
  setCheckInTime(null);
};




const handleCheckIn = async () => {
  try {
    const res = await fetch('http://localhost:8000/check-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: empName, email: empEmail, role: empRole })
    });
    const data = await res.json();
    if (data.data?.checkIn) {
      setCheckedIn(true);
      setCheckInTime(data.data.checkIn);
      startTimer(data.data.checkIn);
    }
  } catch {
    alert("Check-in failed");
  }
};

const handleCheckOut = async () => {
  try {
    const res = await fetch('http://localhost:8000/check-out', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: empEmail })
    });
    const data = await res.json();
    if (data.message === 'Check-out successful') {
      setCheckedIn(false);
      stopTimer();
      alert(`Checked out! Total hours: ${data.data.totalHours}`);
    }
  } catch {
    alert("Check-out failed");
  }
};



useEffect(() => {
  const fetchCheckInStatus = async () => {
    const res = await fetch('http://localhost:8000/check-in-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: empEmail })
    });
    const data = await res.json();
    if (data.checkedIn) {
      setCheckedIn(true);
      setCheckInTime(data.checkIn);
      const now = new Date();
      const start = new Date(data.checkIn);
      setElapsed(Math.floor((now - start) / 1000));
      startTimer(start);
    }
  };

  fetchCheckInStatus();
  return () => clearInterval(intervalId);
}, []);















  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:8000/get-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      alert('Error loading employees: ' + error.message);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("http://localhost:8000/view-announcement", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
      });
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      alert("Error loading announcements");
    }
  };

  const fetchAttendance = async () => {
    try {
      const [weekRes, monthRes] = await Promise.all([
        fetch("http://localhost:8000/attendance-list", {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
          body: JSON.stringify({ email: empEmail, filter: "week" })
        }),
        fetch("http://localhost:8000/attendance-list", {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
          body: JSON.stringify({ email: empEmail, filter: "month" })
        })
      ]);

      const weekData = await weekRes.json();
      const monthData = await monthRes.json();
      setAttendanceWeek(weekData);
      setAttendanceMonth(monthData);
    } catch (err) {
      alert("Error loading attendance");
    }
  };

  const fetchLeaves = async () => {
    try {
      const res = await fetch("http://localhost:8000/leave-list", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
        body: JSON.stringify({ email: empEmail })
      });
      const data = await res.json();
      setLeaves(data);
    } catch (err) {
      alert("Error loading leaves");
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const { reason, from, to } = leaveForm;

    if (new Date(from) > new Date(to)) {
      alert("From date cannot be after To date");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/leave", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
},
        body: JSON.stringify({ 
          name: empName, 
          email: empEmail, 
          reason, 
          from, 
          to 
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Leave applied successfully");
        setLeaveForm({ reason: "", from: "", to: "" });
        fetchLeaves();
      } else {
        alert(data.error || "Failed to apply for leave");
      }
    } catch (err) {
      alert("Network error or server down");
    }
  };

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "employees":
        return (
          <div>
            <h4 className="text-xl font-semibold mb-4">Employee List</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">Loading...</td>
                    </tr>
                  ) : (
                    employees.map((emp, index) => (
                      <tr key={index}>
                        <td>{emp.name || '-'}</td>
                        <td>{emp.email}</td>
                        <td>{emp.role || '-'}</td>
                        <td>{emp.position || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "announcements":
        return (
      <div>
  <h4 className="text-xl font-semibold mb-4 text-purple-700">Announcements</h4>
  <ul className="space-y-4">
    {announcements.length === 0 ? (
      <li className="text-center text-gray-500">No announcements found.</li>
    ) : (
      announcements.map((a, index) => (
        <li key={index} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <h5 className="text-lg font-semibold text-purple-800 mb-1">{a.subject}</h5>
          <p className="text-gray-700 mb-2">{a.body}</p>
          <small className="text-sm text-gray-500 block mb-3">
            {new Date(a.date).toLocaleString()}
          </small>

          {a.attachment && a.attachment.endsWith(".pdf") && (
            <a
              href={`http://localhost:8000${a.attachment}`}
              download
              target="_blank"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              <BsFileEarmarkArrowDownFill className="text-lg" />
              Download Attachment
            </a>
          )}
        </li>
      ))
    )}
  </ul>
</div>



        );
      case "attendance":
        return (
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
      case "leaves":
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
      default:
        return (
      <div className="bg-white rounded-xl shadow-md p-6">
  <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">User Details</h4>

  {profileData ? (
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
    <p className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-md mt-4">
      No profile details found.
    </p>
  )}
</div>

        );
    }
  };

  useEffect(() => {
    if (activeTab === "employees") {
      fetchEmployees();
    } else if (activeTab === "announcements") {
      fetchAnnouncements();
    } else if (activeTab === "attendance") {
      fetchAttendance();
    } else if (activeTab === "leaves") {
      fetchLeaves();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-purple-700 to-purple-900 text-white w-full md:w-64 p-4 space-y-4">
        <h3 className="text-center text-2xl font-bold tracking-wide">rStar Panel</h3>

        {/* Home Button */}
        <button 
          className={`btn ${activeTab === "dashboard" ? "btn-active" : "btn-ghost"} justify-start w-full`}
          onClick={() => setActiveTab("dashboard")}
        >
          <FaHome className="mr-2" /> Dashboard
        </button>

        <button 
          className={`btn ${activeTab === "employees" ? "btn-active" : "btn-ghost"} justify-start w-full`}
          onClick={() => setActiveTab("employees")}
        >
          <FaUsers className="mr-2" /> All Employees
        </button>

        <button 
          className={`btn ${activeTab === "announcements" ? "btn-active" : "btn-ghost"} justify-start w-full`}
          onClick={() => setActiveTab("announcements")}
        >
          <FaBullhorn className="mr-2" /> Announcements
        </button>

        <button 
          className={`btn ${activeTab === "attendance" ? "btn-active" : "btn-ghost"} justify-start w-full`}
          onClick={() => setActiveTab("attendance")}
        >
          <FaCalendarCheck className="mr-2" /> Attendance
        </button>

        <button 
          className={`btn ${activeTab === "leaves" ? "btn-active" : "btn-ghost"} justify-start w-full`}
          onClick={() => setActiveTab("leaves")}
        >
          <FaFileAlt className="mr-2" /> Leave Requests
        </button>

        <button
          className="btn btn-error justify-start w-full"
          onClick={logout}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            {/* <h2 className="text-2xl font-semibold">
              Welcome, <span className="font-bold">{empName}</span>
            </h2> */}


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

            {/* <p className="text-sm text-gray-600">Role: {empRole}</p> */}
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-neutral"
              onClick={() => navigate('/profile-builder')}
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
            <button
              className="btn btn-error"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Check-in/Check-out */}
    {activeTab === "dashboard" && (
  <div className="mb-6 flex flex-wrap gap-4 items-center">
    {!checkedIn ? (
      <button className="btn btn-success" onClick={handleCheckIn}>Check In</button>
    ) : (
      <button className="btn btn-error" onClick={handleCheckOut}>Check Out</button>
    )}
    {checkedIn && (
      <div className="text-lg font-medium text-green-700">
        ⏱ Working Time: {formatTime(elapsed)}
      </div>
    )}
  </div>
)}


        {/* Dashboard Cards - Only shown on dashboard */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold">Employees</h3>
              <p className="mb-4">View and manage all employee data.</p>
              <button 
                className="btn btn-sm btn-neutral"
                onClick={() => setActiveTab("employees")}
              >
                View Employees
              </button>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold">Announcements</h3>
              <p className="mb-4">Post or view announcements.</p>
              <button 
                className="btn btn-sm btn-neutral"
                onClick={() => setActiveTab("announcements")}
              >
                Go to Announcements
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-800 to-indigo-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold">Attendance</h3>
              <p className="mb-4">Track working hours & logs.</p>
              <button 
                className="btn btn-sm btn-neutral"
                onClick={() => setActiveTab("attendance")}
              >
                Show Attendance
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold">Leave Requests</h3>
              <p className="mb-4">Approve or reject leave requests.</p>
              <button 
                className="btn btn-sm btn-neutral"
                onClick={() => setActiveTab("leaves")}
              >
                Manage Leaves
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Content Area */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 min-h-[300px]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;