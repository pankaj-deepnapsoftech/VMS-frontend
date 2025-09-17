import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ASMDashboard = () => {
  const score = 62;
  // Dummy chart data
  const data = [
    { month: "Jul", Critical: 0, High: 0, Medium: 1, Low: 1, Info: 0 },
    { month: "Aug", Critical: 0, High: 1, Medium: 2, Low: 2, Info: 1 },
    { month: "Sep", Critical: 0, High: 0, Medium: 3, Low: 4, Info: 2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Cyber Risk Posture
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Executive-level insights into vulnerabilities, external threats, and
            security performance.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {/* Download */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
            Download
          </button>

          {/* Last Month */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-200 font-medium hover:bg-slate-700 transition">
            Last Month
            <svg
              className="w-4 h-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Previous Scans */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-200 font-medium hover:bg-slate-700 transition">
            Previous Scans
            <svg
              className="w-4 h-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Cyber Hygiene Score */}
        <div className="flex items-center justify-between bg-slate-900 shadow-md rounded-xl p-8 border border-slate-800">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-1">
              Cyber Hygiene Score <span className="text-slate-400">ⓘ</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Reflects your organizations overall security posture. Aim for a
              higher score.
            </p>

            <button className="mt-6 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-md border border-slate-700 transition">
              Improve Score
            </button>
          </div>

          {/* Score Chart */}
          <div className="flex flex-col items-center">
            <div className="w-36 h-36">
              <CircularProgressbar
                value={score}
                text={`${score}`}
                strokeWidth={12}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: `url(#gradientDark)`,
                  trailColor: "#1e293b",
                  textSize: "32px",
                })}
              />
              <svg style={{ height: 0 }}>
                <defs>
                  <linearGradient
                    id="gradientDark"
                    gradientTransform="rotate(90)"
                  >
                    <stop offset="0%" stopColor="#F44336" />
                    <stop offset="50%" stopColor="#FF9800" />
                    <stop offset="100%" stopColor="#FFEB3B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="mt-3 text-xs text-slate-400 whitespace-nowrap">
              Moderate Risk - Action Needed
            </p>
          </div>
        </div>

        {/* Vulnerabilities */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-red-600 text-white rounded-lg p-1.5 flex flex-col items-center justify-center shadow">
            <h3 className="text-xs font-medium">Total Vulnerabilities</h3>
            <p className="text-lg font-bold mt-0.5">11</p>
          </div>

          <div className="border border-slate-700 rounded-lg p-1.5 flex flex-col items-center justify-center bg-slate-900 shadow">
            <h3 className="text-xs font-medium">Critical</h3>
            <p className="text-lg font-bold mt-0.5">0</p>
            <span className="text-green-400 text-[10px] mt-0.5">▲ +0.53%</span>
          </div>

          <div className="border border-red-700 rounded-lg p-1.5 flex flex-col items-center justify-center bg-slate-900 shadow">
            <h3 className="text-xs font-medium">High</h3>
            <p className="text-lg font-bold mt-0.5">0</p>
            <span className="text-red-400 text-[10px] mt-0.5">▼ -5.5%</span>
          </div>

          <div className="border border-yellow-700 rounded-lg p-1.5 flex flex-col items-center justify-center bg-slate-900 shadow">
            <h3 className="text-xs font-medium">Medium</h3>
            <p className="text-lg font-bold mt-0.5">2</p>
            <span className="text-green-400 text-[10px] mt-0.5">▲ +0.53%</span>
          </div>

          <div className="border border-green-700 rounded-lg p-1.5 flex flex-col items-center justify-center bg-slate-900 shadow">
            <h3 className="text-xs font-medium">Low</h3>
            <p className="text-lg font-bold mt-0.5">5</p>
            <span className="text-red-400 text-[10px] mt-0.5">▼ -5.5%</span>
          </div>

          <div className="border border-blue-700 rounded-lg p-1.5 flex flex-col items-center justify-center bg-slate-900 shadow">
            <h3 className="text-xs font-medium">Info</h3>
            <p className="text-lg font-bold mt-0.5">4</p>
            <span className="text-green-400 text-[10px] mt-0.5">▲ +0.53%</span>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Risk Trends */}
        <div className="bg-slate-900 p-6 shadow-md rounded-xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Risk Trends Over Time</h2>
          <div className="flex gap-2 mb-4">
            <button className="px-3 py-1 text-xs rounded bg-blue-600 text-white">
              Monthly
            </button>
            <button className="px-3 py-1 text-xs rounded bg-slate-800 text-slate-300">
              Weekly
            </button>
            <button className="px-3 py-1 text-xs rounded bg-slate-800 text-slate-300">
              Today
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line type="monotone" dataKey="Critical" stroke="#f87171" />
              <Line type="monotone" dataKey="High" stroke="#fb923c" />
              <Line type="monotone" dataKey="Medium" stroke="#facc15" />
              <Line type="monotone" dataKey="Low" stroke="#4ade80" />
              <Line type="monotone" dataKey="Info" stroke="#60a5fa" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Coverage */}
        <div className="bg-slate-900 h-fit p-6 shadow-md rounded-xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Compliance Coverage</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* OWASP Coverage */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center shadow h-full">
              <h3 className="text-sm font-medium text-slate-200">
                OWASP Coverage
              </h3>
              <div className="w-28 h-14 mt-2 mb-10">
                <CircularProgressbar
                  value={76.67}
                  maxValue={100}
                  text={`76.67`}
                  circleRatio={0.5}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "round",
                    pathColor: "#3b82f6", // blue
                    textColor: "#fff",
                    trailColor: "#1e293b",
                    textSize: "22px",
                  })}
                />
              </div>
            </div>

            {/* NVD Coverage */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center shadow h-full">
              <h3 className="text-sm font-medium text-slate-200">
                NVD Coverage
              </h3>
              <div className="w-28 h-14 mt-2 mb-10">
                <CircularProgressbar
                  value={72}
                  maxValue={100}
                  text={`72`}
                  circleRatio={0.5}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "round",
                    pathColor: "#22c55e", // green
                    textColor: "#fff",
                    trailColor: "#1e293b",
                    textSize: "22px",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 mb-20 md:grid-cols-2 gap-6">
        {/* Open Ports & Services */}
        <div className="bg-slate-900 p-6 shadow-md rounded-xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Open Ports & Services</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="py-2">Port</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="py-2">22</td>
                <td>SSH</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2">80</td>
                <td>HTTP</td>
              </tr>
              <tr>
                <td className="py-2">443</td>
                <td>HTTPS</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Security Headers */}
        <div className="bg-slate-900 -mt-32 p-6 shadow-md rounded-xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">Security Headers</h2>
          <div className="flex gap-3 mb-4">
            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded">
              Present (6)
            </button>
            <button className="px-3 py-1 text-xs bg-red-900 text-red-300 rounded">
              Missing (3)
            </button>
          </div>
          <div className="text-sm">
            <p className="border border-slate-700 p-2 rounded mb-2 bg-slate-800">
              content-security-policy
            </p>
            <p className="border border-slate-700 p-2 rounded mb-2 bg-slate-800">
              x-content-type-options
            </p>
            <p className="border border-slate-700 p-2 rounded bg-slate-800">
              strict-transport-security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASMDashboard;
