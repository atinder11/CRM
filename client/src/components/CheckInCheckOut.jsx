// import { useEffect, useState } from "react";

// const CheckInCheckOut = () => {
//   const [checkedIn, setCheckedIn] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);

//   const formatTime = (ms) => {
//     const sec = Math.floor(ms / 1000);
//     const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
//     const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
//     const secs = String(sec % 60).padStart(2, "0");
//     return `${hrs}:${mins}:${secs}`;
//   };

//   const handleCheckIn = () => {
//     setCheckedIn(true);
//     const start = Date.now();
//     const id = setInterval(() => setTimer(Date.now() - start), 1000);
//     setIntervalId(id);
//   };

//   const handleCheckOut = () => {
//     clearInterval(intervalId);
//     setCheckedIn(false);
//     setTimer(0);
//   };

//   useEffect(() => () => clearInterval(intervalId), [intervalId]);

//   return (
//     <div className="my-6">
//       <button className="btn btn-success mr-4" onClick={handleCheckIn} disabled={checkedIn}>
//         Check In
//       </button>
//       <button className="btn btn-error" onClick={handleCheckOut} disabled={!checkedIn}>
//         Check Out
//       </button>
//       <div className="mt-3 text-lg">
//         <strong>Working Time: {formatTime(timer)}</strong>
//       </div>
//     </div>
//   );
// };

// export default CheckInCheckOut;



import React, { useState, useEffect } from "react";

const CheckInCheckOut = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now - new Date(startTime);
        const hrs = String(Math.floor(diff / 1000 / 3600)).padStart(2, "0");
        const mins = String(
          Math.floor((diff / 1000 / 60) % 60)
        ).padStart(2, "0");
        const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
        setTimer(`${hrs}:${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const handleCheckIn = () => {
    setStartTime(new Date());
  };

  const handleCheckOut = async () => {
    const checkOutTime = new Date();
    const totalHours = (
      (checkOutTime - new Date(startTime)) /
      (1000 * 60 * 60)
    ).toFixed(2);

    try {
      const res = await fetch("http://localhost:8000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          checkIn: startTime,
          checkOut: checkOutTime,
          totalHours,
        }),
      });

      const data = await res.json();
      alert(data.message || "Check Out Success");
    } catch (err) {
      alert("Network error");
    }

    setStartTime(null);
    setTimer("00:00:00");
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleCheckIn}
        disabled={startTime}
        className="btn btn-success mr-2"
      >
        Check In
      </button>
      <button
        onClick={handleCheckOut}
        disabled={!startTime}
        className="btn btn-error"
      >
        Check Out
      </button>
      <div className="mt-2 font-semibold">Working Time: {timer}</div>
    </div>
  );
};

export default CheckInCheckOut;
