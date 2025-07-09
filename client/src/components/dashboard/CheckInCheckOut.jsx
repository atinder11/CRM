import React from "react";

const CheckInCheckOut = ({ checkedIn, handleCheckIn, handleCheckOut, formatTime, elapsed }) => (
  <div className="mb-6 flex flex-wrap gap-4 items-center">
    {!checkedIn ? (
      <button className="btn btn-success" onClick={handleCheckIn}>Check In</button>
    ) : (
      <button className="btn btn-error" onClick={handleCheckOut}>Check Out</button>
    )}
    {checkedIn && (
      <div className="text-lg font-medium text-green-700">
        ⏱ Working Time: {formatTime(elapsed)}
      </div>
    )}
  </div>
);

export default CheckInCheckOut;
