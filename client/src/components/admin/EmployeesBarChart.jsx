import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const EmployeesBarChart = ({ chartData }) => (
  <div className="bg-white rounded-xl p-6 shadow w-full max-w-4xl mx-auto mb-10">
    <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
      Employees by Role
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" name="Number of Employees" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default EmployeesBarChart;
