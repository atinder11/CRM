import React from "react";
import { FaUserEdit } from "react-icons/fa";

const DashboardHeaderCard = ({ empName, empRole, profilePic, onEditProfile, onLogout, checkedIn, handleCheckIn, handleCheckOut, formatTime, elapsed }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 24,
      background: "white",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      padding: 20,
      marginBottom: 16,
      minWidth: 320,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}
  >
    <img
      src={profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      alt="Profile"
      style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #7c3aed", objectFit: "cover" }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>{empName || "Employee"}</div>
      <div style={{ color: "#6b7280", fontSize: 14 }}>Role: {empRole || "Employee"}</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      {/* Check In/Out Button and Timer */}
      {!checkedIn ? (
        <button
          onClick={handleCheckIn}
          style={{
            background: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "all 0.2s",
            marginBottom: 6
          }}
        >
          Check In
        </button>
      ) : (
        <>
          <button
            onClick={handleCheckOut}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: 6
            }}
          >
            Check Out
          </button>
          <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 16, marginTop: 2 }}>
            ⏱ Working Time: {formatTime(elapsed)}
          </div>
        </>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className="btn btn-neutral"
          onClick={onEditProfile}
        >
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>
        <button
          className="btn btn-error"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

export default DashboardHeaderCard;
