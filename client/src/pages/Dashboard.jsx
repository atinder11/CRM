import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeaderCard from "../components/dashboard/DashboardHeaderCard";
import DashboardCards from "../components/dashboard/DashboardCards";
import CheckInCheckOut from "../components/dashboard/CheckInCheckOut";
import DashboardContent from "../components/dashboard/DashboardContent";
import { fetchEmployees } from "../redux/employeesSlice";
import { fetchAnnouncements } from "../redux/announcementsSlice";
import { fetchAttendanceWeek, fetchAttendanceMonth } from "../redux/attendanceSlice";
import { fetchLeaves } from "../redux/leavesSlice";
import { fetchProfileData } from "../redux/profileSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const empName = user.name || "Employee";
  const empEmail = user.email || "";
  const empRole = user.role || "Employee";

  const [activeTab, setActiveTab] = useState("dashboard");
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

  // Redux selectors
  const employees = useSelector((state) => state.employees.list);
  const announcements = useSelector((state) => state.announcements.list);
  const attendanceWeek = useSelector((state) => state.attendance.week);
  const attendanceMonth = useSelector((state) => state.attendance.month);
  const leaves = useSelector((state) => state.leaves.list);
  const profileData = useSelector((state) => state.profile.data);

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
    // Fetch profile pic separately if needed
    const fetchProfilePic = async () => {
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
      fetchProfilePic();
      dispatch(fetchProfileData(empEmail));
    }
  }, [empEmail, dispatch]);





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
        dispatch(fetchLeaves(empEmail));
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
      dispatch(fetchEmployees());
    } else if (activeTab === "announcements") {
      dispatch(fetchAnnouncements());
    } else if (activeTab === "attendance") {
      dispatch(fetchAttendanceWeek(empEmail));
      dispatch(fetchAttendanceMonth(empEmail));
    } else if (activeTab === "leaves") {
      dispatch(fetchLeaves(empEmail));
    }
    // Always fetch announcements for dashboard
    dispatch(fetchAnnouncements());
  }, [activeTab, dispatch, empEmail]);
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
          leaveForm={leaveForm}
          handleLeaveSubmit={handleLeaveSubmit}
          handleLeaveChange={handleLeaveChange}
        />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;