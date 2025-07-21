import React from "react";

const AdminHeaderCard = ({ name, role, profilePic, onCheckIn, checkedIn, onLogout }) => (
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
    }}
  >
    <img
      src={profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      alt="Profile"
      style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid #7c3aed", objectFit: "cover" }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>{name || "Admin"}</div>
      <div style={{ color: "#6b7280", fontSize: 14 }}>Role: {role || "Admin"}</div>
    </div>
    <button
      onClick={onCheckIn}
      style={{
        background: checkedIn ? "#22c55e" : "#7c3aed",
        color: "white",
        border: "none",
        borderRadius: 8,
        padding: "10px 20px",
        fontWeight: 600,
        fontSize: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        cursor: checkedIn ? "not-allowed" : "pointer",
        opacity: checkedIn ? 0.7 : 1,
        transition: "all 0.2s",
        marginRight: 16
      }}
      disabled={checkedIn}
    >
      {checkedIn ? "Checked In" : "Check In"}
    </button>
    <button
      onClick={onLogout}
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: 8,
        padding: "10px 16px",
        fontWeight: 600,
        fontSize: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </div>
);

export default AdminHeaderCard;
