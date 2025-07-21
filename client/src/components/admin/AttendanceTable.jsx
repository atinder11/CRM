import React, { useState } from "react";
import DataTable from "react-data-table-component";

const AttendanceTable = ({ attendanceData }) => {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearch = e => setSearchText(e.target.value.toLowerCase());
  const handleFilter = e => setFilterStatus(e.target.value);
  const handleFromDate = e => setFromDate(e.target.value);
  const handleToDate = e => setToDate(e.target.value);
  const resetFilters = () => {
    setSearchText("");
    setFilterStatus("all");
    setFromDate("");
    setToDate("");
  };

  const filteredData = attendanceData.filter(row => {
    const name = row.userId?.name?.toLowerCase() || "";
    const checkInDate = new Date(row.checkIn);

    const matchesSearch = name.includes(searchText);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "checked-in" && !row.checkOut) ||
      (filterStatus === "checked-out" && row.checkOut);

    const matchesFrom = fromDate ? checkInDate >= new Date(fromDate) : true;
    const matchesTo = toDate ? checkInDate <= new Date(toDate) : true;

    return matchesSearch && matchesStatus && matchesFrom && matchesTo;
  });

  const columns = [
    {
      name: "Name",
      selector: row => row.userId?.name || "N/A",
      sortable: true,
    },
    {
      name: "Check In",
      selector: row => new Date(row.checkIn).toLocaleString(),
      sortable: true,
    },
    {
      name: "Check Out",
      selector: row =>
        row.checkOut ? new Date(row.checkOut).toLocaleString() : "—",
      sortable: true,
    },
    {
      name: "Total Hours",
      selector: row => {
        if (row.totalHours !== undefined) return row.totalHours;
        if (row.checkIn && row.checkOut) {
          const checkIn = new Date(row.checkIn);
          const checkOut = new Date(row.checkOut);
          return ((checkOut - checkIn) / (1000 * 60 * 60)).toFixed(2);
        }
        return "—";
      },
      sortable: true,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Attendance List</h4>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={filterStatus}
            onChange={handleFilter}
            className="border px-2 py-1 rounded text-sm text-gray-700"
          >
            <option value="all">All</option>
            <option value="checked-in">Checked-in Only</option>
            <option value="checked-out">Checked-out Only</option>
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={handleFromDate}
            className="border px-2 py-1 rounded text-sm text-gray-700"
          />

          <input
            type="date"
            value={toDate}
            onChange={handleToDate}
            className="border px-2 py-1 rounded text-sm text-gray-700"
          />

          <button
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm text-gray-800"
          >
            Reset
          </button>
        </div>

        <input
          type="text"
          placeholder="Search name..."
          value={searchText}
          onChange={handleSearch}
          className="border px-2 py-1 rounded text-sm text-gray-700 w-44"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        striped
        persistTableHead
        noDataComponent="No matching records found"
      />
    </div>
  );
};

export default AttendanceTable;
