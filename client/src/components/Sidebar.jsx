// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="h-screen w-64 bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-6 fixed">
//       <h2 className="text-2xl font-bold mb-10 text-center">rStar Panel</h2>
//       <div className="space-y-4">
//         <button onClick={() => navigate("/dashboard")} className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-white hover:text-indigo-900">
//           <i className="bi bi-house-door-fill mr-3"></i>Dashboard
//         </button>
//         <button onClick={() => navigate("/employees")} className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-white hover:text-indigo-900">
//           <i className="bi bi-people-fill mr-3"></i>All Employees
//         </button>
//         <button onClick={() => navigate("/announcements")} className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-white hover:text-indigo-900">
//           <i className="bi bi-megaphone-fill mr-3"></i>Announcements
//         </button>
//         <button onClick={() => navigate("/attendance")} className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-white hover:text-indigo-900">
//           <i className="bi bi-calendar-check-fill mr-3"></i>Attendance
//         </button>
//         <button onClick={() => navigate("/leaves")} className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-white hover:text-indigo-900">
//           <i className="bi bi-file-earmark-text-fill mr-3"></i>Leave Requests
//         </button>
//         <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-white hover:text-indigo-900">
//           <i className="bi bi-box-arrow-right mr-3"></i>Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import React from "react";

// const Sidebar = ({ setActivePage, handleLogout }) => {
//   return (
//     <div className="w-64 bg-gradient-to-b from-purple-700 to-indigo-800 min-h-screen p-4 text-white">
//       <h3 className="text-center text-2xl mb-8">rStar Panel</h3>
//       {[
//         { name: "Employees", icon: "👥" },
//         { name: "Announcements", icon: "📢" },
//         { name: "Attendance", icon: "📅" },
//         { name: "Leaves", icon: "📝" },
//       ].map((item) => (
//         <button
//           key={item.name}
//           onClick={() => setActivePage(item.name)}
//           className="w-full flex items-center gap-2 mb-3 px-4 py-2 rounded hover:bg-white/20"
//         >
//           <span>{item.icon}</span> {item.name}
//         </button>
//       ))}
//       <button
//         onClick={handleLogout}
//         className="w-full flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 mt-4"
//       >
//         🔒 Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;








import React from "react";
import { FaHome, FaUsers, FaBullhorn, FaCalendarCheck, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ setActivePage, handleLogout }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 to-indigo-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">rStar Panel</h2>

      <button
        onClick={() => setActivePage("Dashboard")}
        className="flex items-center gap-3 w-full mb-4 hover:bg-white hover:text-purple-900 px-4 py-2 rounded"
      >
        <FaHome /> Home
      </button>

      <button
        onClick={() => setActivePage("Employees")}
        className="flex items-center gap-3 w-full mb-4 hover:bg-white hover:text-purple-900 px-4 py-2 rounded"
      >
        <FaUsers /> Employees
      </button>

      <button
        onClick={() => setActivePage("Announcements")}
        className="flex items-center gap-3 w-full mb-4 hover:bg-white hover:text-purple-900 px-4 py-2 rounded"
      >
        <FaBullhorn /> Announcements
      </button>

      <button
        onClick={() => setActivePage("Attendance")}
        className="flex items-center gap-3 w-full mb-4 hover:bg-white hover:text-purple-900 px-4 py-2 rounded"
      >
        <FaCalendarCheck /> Attendance
      </button>

      <button
        onClick={() => setActivePage("Leaves")}
        className="flex items-center gap-3 w-full mb-4 hover:bg-white hover:text-purple-900 px-4 py-2 rounded"
      >
        <FaClipboardList /> Leaves
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full mt-10 hover:bg-white hover:text-red-700 px-4 py-2 rounded"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
