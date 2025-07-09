// import { useEffect, useState } from "react";

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/view-announcement", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => setAnnouncements(data))
//       .catch(() => alert("Error fetching announcements"));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Announcements</h2>
//       {announcements.length === 0 ? (
//         <p>No announcements found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {announcements.map((a, idx) => (
//             <li key={idx} className="bg-white rounded-xl p-4 shadow">
//               <strong>{a.subject}</strong>
//               <p>{a.body}</p>
//               <small>{new Date(a.date).toLocaleString()}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Announcements;



import React, { useEffect, useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/view-announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch(() => alert("Failed to load announcements"));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Announcements</h2>
      <ul className="list-group">
        {announcements.length === 0 ? (
          <li className="list-group-item">No announcements found</li>
        ) : (
          announcements.map((a, i) => (
            <li key={i} className="list-group-item">
              <strong>{a.subject}</strong>
              <br />
              {a.body}
              <br />
              <small>{new Date(a.date).toLocaleString()}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Announcements;
