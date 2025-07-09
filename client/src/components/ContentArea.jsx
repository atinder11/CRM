// const ContentArea = ({ activePage }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mt-6">
//       {activePage === "Employees" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">All Employees</h2>
//           <p>Employee table will be here.</p>
//         </div>
//       )}

//       {activePage === "Announcements" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Announcements</h2>
//           <p>Announcements list will be here.</p>
//         </div>
//       )}

//       {activePage === "Attendance" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Attendance</h2>
//           <p>Attendance records will be shown here.</p>
//         </div>
//       )}

//       {activePage === "Leaves" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
//           <p>Leave application and list will be here.</p>
//         </div>
//       )}

//       {!activePage && (
//         <div className="text-center text-gray-500">
//           <p>Select a section to view details.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContentArea;




// import React from "react";
// import Employees from "./Employees";
// import Announcements from "./Announcements";
// import Attendance from "./Attendance";
// import Leaves from "./Leaves";

// const ContentArea = ({ activePage }) => {
//   switch (activePage) {
//     case "Employees":
//       return <Employees />;
//     case "Announcements":
//       return <Announcements />;
//     case "Attendance":
//       return <Attendance />;
//     case "Leaves":
//       return <Leaves />;
//     default:
//       return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//           {[
//             { name: "Employees", desc: "View and manage all employee data." },
//             { name: "Announcements", desc: "Post or view announcements." },
//             { name: "Attendance", desc: "Track working hours & logs." },
//             { name: "Leaves", desc: "Apply or manage leave requests." },
//           ].map((card) => (
//             <div
//               key={card.name}
//               className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6 hover:scale-105 transition cursor-pointer"
//               onClick={() => activePage !== card.name && window.dispatchEvent(new CustomEvent('sidebar-click', { detail: card.name }))}
//             >
//               <h4 className="text-xl font-bold mb-2">{card.name}</h4>
//               <p>{card.desc}</p>
//             </div>
//           ))}
//         </div>
//       );
//   }
// };

// export default ContentArea;


import React from "react";
import { FaUsers, FaBullhorn, FaCalendarCheck, FaClipboardList } from "react-icons/fa";
import Employees from "./Employees";
import Announcements from "./Announcements";
import Attendance from "./Attendance";
import Leaves from "./Leaves";

const ContentArea = ({ activePage, setActivePage }) => {
  if (activePage === "Dashboard") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <FaUsers className="text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Employees</h3>
              <p className="text-sm">View and manage employees</p>
            </div>
          </div>
          <button
            onClick={() => setActivePage("Employees")}
            className="bg-white text-purple-700 mt-4 px-4 py-1 rounded"
          >
            View Employees
          </button>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <FaBullhorn className="text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Announcements</h3>
              <p className="text-sm">Post or view announcements</p>
            </div>
          </div>
          <button
            onClick={() => setActivePage("Announcements")}
            className="bg-white text-pink-700 mt-4 px-4 py-1 rounded"
          >
             Announcements
          </button>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <FaCalendarCheck className="text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Attendance</h3>
              <p className="text-sm">Check your attendance logs</p>
            </div>
          </div>
          <button
            onClick={() => setActivePage("Attendance")}
            className="bg-white text-indigo-700 mt-4 px-4 py-1 rounded"
          >
            Show Attendance
          </button>
        </div>

        <div className="bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white p-6 rounded-xl shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <FaClipboardList className="text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Leaves</h3>
              <p className="text-sm">Apply or view leaves</p>
            </div>
          </div>
          <button
            onClick={() => setActivePage("Leaves")}
            className="bg-white text-rose-700 mt-4 px-4 py-1 rounded"
          >
            Manage Leaves
          </button>
        </div>
      </div>
    );
  }

  if (activePage === "Employees") {
    return <Employees />;
  }
  if (activePage === "Announcements") {
    return <Announcements />;
  }
  if (activePage === "Attendance") {
    return <Attendance />;
  }
  if (activePage === "Leaves") {
    return <Leaves />;
  }

  return null;
};

export default ContentArea;
