import React from "react";

const AdminSidebar = ({ children }) => (
  <div
    style={{
      position: "sticky",
      top: 0,
      height: "100vh",
      zIndex: 40,
      minWidth: 220,
      background: "linear-gradient(to bottom, #7c3aed, #1e293b)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: 24,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      borderRadius: 16,
    }}
  >
    <h3 style={{ textAlign: "center", fontWeight: 700, fontSize: 24, letterSpacing: 1 }}>Admin Sidebar</h3>
    {children}
  </div>
);

export default AdminSidebar;
