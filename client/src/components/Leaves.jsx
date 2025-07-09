// import { useEffect, useState } from "react";

// const Leaves = ({ name, email }) => {
//   const [reason, setReason] = useState("");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [leaves, setLeaves] = useState([]);

//   const fetchLeaves = () => {
//     fetch("http://localhost:8000/leave-list", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     })
//       .then((res) => res.json())
//       .then((data) => setLeaves(data));
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, [email]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:8000/leave", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, reason, from, to }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("Leave applied");
//       fetchLeaves();
//       setReason("");
//       setFrom("");
//       setTo("");
//     } else {
//       alert(data.error || "Failed to apply leave");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Leave Requests</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
//           <div>
//             <label>Reason</label>
//             <input className="input input-bordered w-full" value={reason} onChange={(e) => setReason(e.target.value)} required />
//           </div>
//           <div>
//             <label>From Date</label>
//             <input type="date" className="input input-bordered w-full" value={from} onChange={(e) => setFrom(e.target.value)} required />
//           </div>
//           <div>
//             <label>To Date</label>
//             <input type="date" className="input input-bordered w-full" value={to} onChange={(e) => setTo(e.target.value)} required />
//           </div>
//           <button className="btn btn-primary">Apply Leave</button>
//         </form>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="font-semibold mb-4">Your Applied Leaves</h3>
//           <ul className="space-y-2">
//             {leaves.length === 0 ? (
//               <li className="text-center">No leaves found.</li>
//             ) : (
//               leaves.map((l, idx) => (
//                 <li key={idx} className="border p-2 rounded-md">
//                   <strong>{l.reason}</strong><br />
//                   From: {new Date(l.from).toLocaleDateString()} To: {new Date(l.to).toLocaleDateString()}<br />
//                   <small>Applied on: {new Date(l.appliedAt).toLocaleDateString()}</small>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaves;


import React, { useEffect, useState } from "react";

const Leaves = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [leaves, setLeaves] = useState([]);
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchLeaves = () => {
    fetch("http://localhost:8000/leave-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => setLeaves(data));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(from) > new Date(to)) {
      return alert("From date cannot be after To date");
    }

    const res = await fetch("http://localhost:8000/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        reason,
        from,
        to,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Leave applied successfully");
      setReason("");
      setFrom("");
      setTo("");
      fetchLeaves();
    } else {
      alert(data.error || "Failed to apply for leave");
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Leave Request</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Apply Leave
          </button>
        </form>

        <div>
          <h4 className="text-lg mb-2">Your Leaves</h4>
          <ul className="space-y-2">
            {leaves.length === 0 ? (
              <li className="list-group-item">No leaves found</li>
            ) : (
              leaves.map((l, i) => (
                <li key={i} className="p-3 border rounded">
                  <strong>{l.reason}</strong>
                  <br />
                  {new Date(l.from).toLocaleDateString()} →{" "}
                  {new Date(l.to).toLocaleDateString()}
                  <br />
                  <small>Applied on: {new Date(l.appliedAt).toLocaleDateString()}</small>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
