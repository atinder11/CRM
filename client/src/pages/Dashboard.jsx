import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeaderCard from "../components/dashboard/DashboardHeaderCard";
import DashboardCards from "../components/dashboard/DashboardCards";
import CheckInCheckOut from "../components/dashboard/CheckInCheckOut";
import DashboardContent from "../components/dashboard/DashboardContent";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
      const res = await fetch(`${API_BASE_URL}/profile/get-user-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email: empEmail })
      });
      const data = await res.json();
      if (data?.profilePic) {
        setProfilePic(`${API_BASE_URL?.startsWith('/api') ? '' : API_BASE_URL || ''}${data.profilePic}`);
      }
    };
    if (empEmail) {
      fetchProfile();
    }
  }, [empEmail]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/profile/get-user-profile`, {
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
    const res = await fetch(`${API_BASE_URL}/attendance/check-in`, {
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
    const res = await fetch(`${API_BASE_URL}/attendance/check-out`, {
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
    const res = await fetch(`${API_BASE_URL}/attendance/check-in-status`, {
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
      const res = await fetch(`${API_BASE_URL}/auth/get-users`, {
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
      const res = await fetch(`${API_BASE_URL}/announcement/view-announcement`, {
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
        fetch(`${API_BASE_URL}/attendance/attendance-list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ email: empEmail, filter: "week" })
        }),
        fetch(`${API_BASE_URL}/attendance/attendance-list`, {
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
      const res = await fetch(`${API_BASE_URL}/leave/leave-list`, {
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
      const res = await fetch(`${API_BASE_URL}/leave/leave`, {
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
      {/* Sticky Sidebar */}
      <div style={{ position: 'sticky', top: 0, alignSelf: 'flex-start', zIndex: 40, height: '100vh' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Sticky Header */}

        {/* Sticky Header Card with Check In */}
        <DashboardHeaderCard
          empName={empName}
          empRole={empRole}
          profilePic={profilePic}
          onEditProfile={() => navigate('/profile-builder')}
          onLogout={logout}
          checkedIn={checkedIn}
          handleCheckIn={handleCheckIn}
          handleCheckOut={handleCheckOut}
          formatTime={formatTime}
          elapsed={elapsed}
        />

        {/* Dashboard Cards - Only shown on dashboard */}
        {activeTab === "dashboard" && (
          <DashboardCards setActiveTab={setActiveTab} />
        )}

        {/* Dynamic Content Area */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 min-h-[300px]">
          <DashboardContent
            activeTab={activeTab}
            employees={employees}
            announcements={announcements}
            attendanceWeek={attendanceWeek}
            attendanceMonth={attendanceMonth}
            leaves={leaves}
            leaveForm={leaveForm}
            handleLeaveSubmit={handleLeaveSubmit}
            handleLeaveChange={handleLeaveChange}
            profileData={profileData}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;