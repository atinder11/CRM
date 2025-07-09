import React from "react";

const EmployeesTable = ({ employees }) => (
  <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
    <h4 className="text-xl font-semibold mb-4 text-gray-800">All Employees</h4>
    <table className="min-w-full table-auto border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-700">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Position</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((u, i) => (
          <tr key={i} className="hover:bg-gray-50 text-gray-800">
            <td className="p-2 border">{u.name}</td>
            <td className="p-2 border">{u.email}</td>
            <td className="p-2 border">{u.role}</td>
            <td className="p-2 border">{u.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeesTable;
