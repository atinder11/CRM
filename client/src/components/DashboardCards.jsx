const cards = [
  { title: "Employees", color: "from-purple-600 to-indigo-800", desc: "View and manage employees", action: "Employees" },
  { title: "Announcements", color: "from-fuchsia-600 to-pink-500", desc: "Post or view announcements", action: "Announcements" },
  { title: "Attendance", color: "from-indigo-700 to-purple-600", desc: "Track logs and hours", action: "Attendance" },
  { title: "Leave Requests", color: "from-pink-700 to-rose-500", desc: "Manage leave approvals", action: "Leaves" },
];

const DashboardCards = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-md hover:shadow-xl`}>
          <h3 className="text-lg font-bold">{card.title}</h3>
          <p className="mt-2 mb-4 text-sm">{card.desc}</p>
          <button className="btn btn-sm bg-white text-black" onClick={() => onSelect(card.action)}>
            {card.title === "Leave Requests" ? "Manage Leaves" : `Go to ${card.title}`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
