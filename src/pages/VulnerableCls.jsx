import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

import { AiOutlineMenu } from 'react-icons/ai';

const barChartData = [
  { name: "Category 1", value: 30 },
  { name: "Category 2", value: 20 },
  { name: "Category 3", value: 15 },
  { name: "Category 4", value: 10 },
  { name: "Category 5", value: 5 },
  { name: "Category 6", value: 2 },
];

const heatmapData = [
  { risk: "None", IMS: 0, Linux: 0, Server: 0, Business: 0, CMS: 0, Windows: 0 },
  { risk: "Low", IMS: 2, Linux: 1, Server: 4, Business: 1, CMS: 0, Windows: 0 },
  { risk: "Medium", IMS: 1, Linux: 2, Server: 2, Business: 2, CMS: 1, Windows: 1 },
  { risk: "High", IMS: 0, Linux: 2, Server: 4, Business: 1, CMS: 0, Windows: 0 },
  { risk: "Critical", IMS: 0, Linux: 1, Server: 1, Business: 0, CMS: 0, Windows: 0 },
];

const lineChartData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  Critical: Math.random() * 4,
  High: Math.random() * 3,
  Medium: Math.random() * 2,
  Low: Math.random(),
}));

const VulnerableCls = () => {

  return (
    <>
     
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}


        {/* Section 1: Bar Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Vulnerable Configuration Items (CIs) by CI Class
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Section 2: Heatmap */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Vulnerable Items (VIs) by Risk Rating and CI Class
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Risk Rating</th>
                    <th className="border border-gray-300 p-2">IMS Server</th>
                    <th className="border border-gray-300 p-2">Linux Server</th>
                    <th className="border border-gray-300 p-2">Server</th>
                    <th className="border border-gray-300 p-2">Business Server</th>
                    <th className="border border-gray-300 p-2">CMS Server</th>
                    <th className="border border-gray-300 p-2">Windows Server</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border border-gray-300 p-2">{row.risk}</td>
                      <td className="border border-gray-300 p-2">{row.IMS}</td>
                      <td className="border border-gray-300 p-2">{row.Linux}</td>
                      <td className="border border-gray-300 p-2">{row.Server}</td>
                      <td className="border border-gray-300 p-2">{row.Business}</td>
                      <td className="border border-gray-300 p-2">{row.CMS}</td>
                      <td className="border border-gray-300 p-2">{row.Windows}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Average Vulnerable Items per CI
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Critical" stroke="#f56565" />
              <Line type="monotone" dataKey="High" stroke="#ed8936" />
              <Line type="monotone" dataKey="Medium" stroke="#4299e1" />
              <Line type="monotone" dataKey="Low" stroke="#48bb78" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Section 4: Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Unmatched CIs</h3>
            <h2 className="text-3xl font-bold text-gray-800">733</h2>
            <p className="text-xs text-red-500">▲ +2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Vulnerable CIs Without Owners</h3>
            <h2 className="text-3xl font-bold text-gray-800">566</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Retired or Stolen CIs</h3>
            <h2 className="text-3xl font-bold text-gray-800">0</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">Other Metric</h3>
            <h2 className="text-3xl font-bold text-gray-800">123</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default VulnerableCls;
