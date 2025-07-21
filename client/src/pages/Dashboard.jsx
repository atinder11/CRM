import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeaderCard from "../components/dashboard/DashboardHeaderCard";
import DashboardCards from "../components/dashboard/DashboardCards";
import DashboardContent from "../components/dashboard/DashboardContent";
import { fetchProfileData } from "../redux/profileSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const empName = user.name || "Employee";
  const empEmail = user.email || "";
  const empRole = user.role || "Employee";
  const empId = user.empId || "";
  const userId = user._id || user.id || user.userId || "";

  const [activeTab, setActiveTab] = useState("dashboard");
  const [profilePic, setProfilePic] = useState("");
  const [leaveForm, setLeaveForm] = useState({ reason: "", from: "", to: "" });

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      const userObj = JSON.parse(localStorage.getItem("user")) || {};
      const leavePayload = {
        ...leaveForm,
        email: userObj.email || "",
        name: userObj.name || "",
        userId: userObj._id || userObj.id || userObj.userId || "",
      };
      const res = await fetch(`${API_BASE_URL}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(leavePayload)
      });
      if (!res.ok) {
        console.error('Leave apply failed:', res.status, await res.text());
        return;
      }
      alert('Leave request submitted!');
      setLeaveForm({ reason: '', from: '', to: '' });
      import('../redux/leavesSlice').then(module => {
        dispatch(module.fetchLeaves(leavePayload.email));
      });
    } catch (err) {
      console.error('Leave apply error:', err);
    }
  };

  // Fetch initial data
  useEffect(() => {
    import('../redux/employeesSlice').then(module => {
      dispatch(module.fetchEmployees());
    });
    import('../redux/announcementsSlice').then(module => {
      dispatch(module.fetchAnnouncements());
    });
    import('../redux/attendanceSlice').then(module => {
      dispatch(module.fetchAttendanceWeek(empEmail));
      dispatch(module.fetchAttendanceMonth(empEmail));
    });
    import('../redux/leavesSlice').then(module => {
      const userObj = JSON.parse(localStorage.getItem("user")) || {};
      const uid = userObj._id || userObj.id || userObj.userId;
      if (uid) {
        dispatch(module.fetchLeaves(uid));
      } else {
        dispatch(module.fetchLeaves(empEmail));
      }
    });
  }, [dispatch, empEmail]);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user?.email) {
      navigate("/login");
      return;
    }
    if (user.role === "admin") {
      navigate("/admin");
      return;
    }
  }, [navigate]);

  // Check-In status logic
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/attendance/status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!res.ok) {
          console.error('Check-in status fetch failed:', res.status, await res.text());
          return;
        }
        const data = await res.json();
        if (data?.checkedIn && data?.checkIn) {
          setCheckedIn(true);
          setCheckInTime(data.checkIn);
          startTimer(new Date(data.checkIn));
        } else {
          setCheckedIn(false);
          setCheckInTime(null);
          stopTimer();
        }
      } catch (err) {
        console.error('Check-in status error:', err);
      }
    };
    fetchStatus();
    return () => stopTimer();
  }, [empEmail]);

  const startTimer = (startTime) => {
    if (intervalId) clearInterval(intervalId);
    const initialElapsed = Math.floor((Date.now() - new Date(startTime)) / 1000);
    setElapsed(initialElapsed);
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - new Date(startTime)) / 1000));
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setElapsed(0);
    setIntervalId(null);
  };

  const handleCheckIn = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) {
        console.error('Check-in failed:', res.status, await res.text());
        return;
      }
      const data = await res.json();
      if (data?.data?.checkIn) {
        setCheckedIn(true);
        setCheckInTime(data.data.checkIn);
        startTimer(new Date(data.data.checkIn));
      }
      import('../redux/attendanceSlice').then(module => {
        dispatch(module.fetchAttendanceWeek(empEmail));
        dispatch(module.fetchAttendanceMonth(empEmail));
      });
    } catch (err) {
      console.error('Check-in error:', err);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) {
        console.error('Check-out failed:', res.status, await res.text());
        return;
      }
      const data = await res.json();
      if (data?.data?.checkOut) {
        setCheckedIn(false);
        setCheckInTime(null);
        stopTimer();
      }
      import('../redux/attendanceSlice').then(module => {
        dispatch(module.fetchAttendanceWeek(empEmail));
        dispatch(module.fetchAttendanceMonth(empEmail));
      });
    } catch (err) {
      console.error('Check-out error:', err);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    if (activeTab === 'announcements') {
      import('../redux/announcementsSlice').then(module => {
        dispatch(module.fetchAnnouncements());
      });
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(`${API_BASE_URL}/profile/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ email: empEmail, userId: user?._id })
        });
        if (!res.ok) {
          console.error('Profile fetch failed:', res.status, await res.text());
          return;
        }
        const data = await res.json();
        if (data?.profilePic) {
          let baseUrl = API_BASE_URL;
          if (baseUrl.endsWith('/api')) baseUrl = baseUrl.replace(/\/api$/, '');
          setProfilePic(`${baseUrl}${data.profilePic}`);
        } else {
          setProfilePic("");
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    };
    if (empEmail) {
      fetchProfilePic();
      dispatch(fetchProfileData(empEmail));
    }
  }, [empEmail, dispatch]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      <div style={{ position: 'sticky', top: 0, alignSelf: 'flex-start', zIndex: 40, height: '100vh' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
      </div>

      <main className="flex-1 p-4">
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

        {activeTab === "dashboard" && (
          <DashboardCards setActiveTab={setActiveTab} />
        )}

        <div className="mt-6 bg-white rounded-xl shadow-md p-6 min-h-[300px]">
          <DashboardContent
            activeTab={activeTab}
            leaveForm={leaveForm}
            handleLeaveChange={handleLeaveChange}
            handleLeaveSubmit={handleLeaveSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

