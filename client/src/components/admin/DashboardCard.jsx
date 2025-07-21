import React from "react";

const DashboardCard = ({ icon, title, buttonText, onClick, iconClass, buttonClass }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
    <i className={`${iconClass} text-4xl`}></i>
    <h5 className="mt-3 font-semibold">{title}</h5>
    <button
      className={`${buttonClass} mt-3 px-4 py-2 rounded w-full transition`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  </div>
);

export default DashboardCard;
