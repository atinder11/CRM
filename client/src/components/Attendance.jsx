// import { useEffect, useState } from "react";

// const Attendance = ({ email }) => {
//   const [weekData, setWeekData] = useState([]);
//   const [monthData, setMonthData] = useState([]);

//   useEffect(() => {
//     const fetchAttendance = async (filter, setter) => {
//       const res = await fetch("http://localhost:8000/attendance-list", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, filter }),
//       });
//       const data = await res.json();
//       setter(data);
//     };

//     fetchAttendance("week", setWeekData);
//     fetchAttendance("month", setMonthData);
//   }, [email]);

//   const renderList = (data) => {
//     if (data.length === 0) return <li className="text-center">No records</li>;
//     return data.map((a, idx) => (
//       <li key={idx} className="border p-2 rounded-md">
//         {new Date(a.checkIn).toLocaleString()} → {new Date(a.checkOut).toLocaleString()} | {a.totalHours} hrs
//       </li>
//     ));
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Attendance</h2>
//       <div className="mb-4">
//         <strong>Last 7 Days:</strong>
//         <ul className="space-y-2">{renderList(weekData)}</ul>
//       </div>
//       <div>
//         <strong>Last 30 Days:</strong>
//         <ul className="space-y-2">{renderList(monthData)}</ul>
//       </div>
//     </div>
//   );
// };

// export default Attendance;



// import React, { useEffect, useState } from "react";

// const Attendance = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [week, setWeek] = useState([]);
//   const [month, setMonth] = useState([]);

//   useEffect(() => {
//     Promise.all([
//       fetch("http://localhost:8000/attendance-list", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: user.email, filter: "week" }),
//       }).then((res) => res.json()),
//       fetch("http://localhost:8000/attendance-list", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: user.email, filter: "month" }),
//       }).then((res) => res.json()),
//     ])
//       .then(([weekData, monthData]) => {
//         setWeek(weekData);
//         setMonth(monthData);
//       })
//       .catch(() => alert("Failed to load attendance"));
//   }, []);

//   const renderList = (data) =>
//     data.length === 0 ? (
//       <li className="list-group-item">No records found</li>
//     ) : (
//       data.map((item, index) => (
//         <li key={index} className="list-group-item">
//           {new Date(item.checkIn).toLocaleString()} →{" "}
//           {new Date(item.checkOut).toLocaleString()} | {item.totalHours} hrs
//         </li>
//       ))
//     );

//   return (
//     <div>
//       <h2 className="text-xl mb-4">Attendance</h2>
//       <div>
//         <h4>Last 7 Days</h4>
//         <ul>{renderList(week)}</ul>
//       </div>
//       <br />
//       <div>
//         <h4>Last 30 Days</h4>
//         <ul>{renderList(month)}</ul>
//       </div>
//     </div>
//   );
// };

// export default Attendance;








import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Attendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("week");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:8000/attendance-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, filter: "week" }),
      }).then((res) => res.json()),
      fetch("http://localhost:8000/attendance-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, filter: "month" }),
      }).then((res) => res.json()),
    ])
      .then(([weekData, monthData]) => {
        setWeek(weekData);
        setMonth(monthData);
      })
      .catch(() => alert("Failed to load attendance"))
      .finally(() => setLoading(false));
  }, []);

  const renderRecordItem = (item, index) => (
    <motion.li 
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-2 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-gray-700">
            {new Date(item.checkIn).toLocaleDateString()}
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {new Date(item.checkIn).toLocaleTimeString()}
            </span>
            <span className="text-gray-400">→</span>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {new Date(item.checkOut).toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full text-sm">
          {item.totalHours} hrs
        </div>
      </div>
    </motion.li>
  );

  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 rounded-lg p-8 text-center"
    >
      <div className="text-gray-400 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-gray-500 font-medium">No records found</h3>
      <p className="text-gray-400 text-sm mt-1">Your attendance records will appear here</p>
    </motion.div>
  );

  const calculateSummary = (data) => {
    const totalHours = data.reduce((sum, item) => sum + parseFloat(item.totalHours), 0);
    const daysPresent = data.length;
    return { totalHours, daysPresent };
  };

  const weekSummary = calculateSummary(week);
  const monthSummary = calculateSummary(month);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4 md:p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Records</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Welcome,</span>
          <span className="font-medium text-blue-600">{user.name || user.email}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("week")}
            className={`px-4 py-3 font-medium text-sm focus:outline-none ${activeTab === "week" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Weekly View
          </button>
          <button
            onClick={() => setActiveTab("month")}
            className={`px-4 py-3 font-medium text-sm focus:outline-none ${activeTab === "month" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Monthly View
          </button>
        </div>

        <div className="p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-blue-600 text-sm font-medium">Days Present</div>
                  <div className="text-2xl font-bold text-blue-800 mt-1">
                    {activeTab === "week" ? weekSummary.daysPresent : monthSummary.daysPresent}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-green-600 text-sm font-medium">Total Hours</div>
                  <div className="text-2xl font-bold text-green-800 mt-1">
                    {activeTab === "week" ? weekSummary.totalHours.toFixed(1) : monthSummary.totalHours.toFixed(1)}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {activeTab === "week" ? "Last 7 Days" : "Last 30 Days"}
              </h3>

              <ul className="space-y-3">
                {activeTab === "week" 
                  ? (week.length === 0 ? renderEmptyState() : week.map(renderRecordItem))
                  : (month.length === 0 ? renderEmptyState() : month.map(renderRecordItem))
                }
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        Last updated: {new Date().toLocaleString()}
      </div>
    </motion.div>
  );
};

export default Attendance;