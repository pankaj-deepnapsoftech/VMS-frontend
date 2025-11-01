// ASMDashboard.responsive.jsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaExternalLinkAlt, FaRegQuestionCircle } from "react-icons/fa";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const ASMDashboard = () => {
  const score = 62;
  const data = [
    { month: "Jul", Critical: 0, High: 0, Medium: 1, Low: 1, Info: 0 },
    { month: "Aug", Critical: 0, High: 1, Medium: 2, Low: 2, Info: 1 },
    { month: "Sep", Critical: 0, High: 0, Medium: 3, Low: 4, Info: 2 },
  ];

  const assetRiskData = [
    { name: "High", value: 7 },
    { name: "Medium", value: 3 },
    { name: "Low", value: 1 },
  ];

  const threatScore = 66;

  const vulnerabilities = [
    {
      vulnerability: "Content Security Policy (CSP) Header Not Set",
      severity: "Medium",
      endpoint: "https://secured.ai/",
    },
    {
      vulnerability: "Missing Anti-clickjacking Header",
      severity: "Medium",
      endpoint: "https://secured.ai/",
    },
    {
      vulnerability:
        "Insufficient Site Isolation Against Spectre Vulnerability",
      severity: "Low",
      endpoint: "https://secured.ai/",
    },
    {
      vulnerability: "Permissions Policy Header Not Set",
      severity: "Low",
      endpoint: "https://secured.ai/",
    },
    {
      vulnerability:
        "Server Leaks Version Information via 'Server' HTTP Response Header",
      severity: "Low",
      endpoint: "https://secured.ai/",
    },
  ];

  const dataa = [
    {
      url: "https://secured.ai/",
      vulnerability: "Content Security Policy (CSP) Header Not Set",
      severity: "Medium",
    },
    {
      url: "https://secured.ai/",
      vulnerability: "Missing Anti-clickjacking Header",
      severity: "Medium",
    },
    {
      url: "https://secured.ai/",
      vulnerability: "Incorrect Site Isolation Against Spectre Vulnerability",
      severity: "Low",
    },
    {
      url: "https://secured.ai/",
      vulnerability: "Permissions Policy Header Not Set",
      severity: "Low",
    },
    {
      url: "https://secured.ai/",
      vulnerability:
        'Server Leaks Version Information via "Server" HTTP Response Header Field',
      severity: "Low",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Medium":
        return "bg-yellow-600/20 text-yellow-400 border border-yellow-600";
      case "Low":
        return "bg-green-600/20 text-green-400 border border-green-600";
      default:
        return "bg-gray-600/20 text-gray-400 border border-gray-600";
    }
  };

  // Reusable card wrapper classes
  const card =
    "bg-slate-900 border border-slate-800 rounded-xl shadow-md p-4 sm:p-6";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6">
      {/* Container to center content and limit width */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Cyber Risk Posture
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-lg mx-auto md:mx-0">
              Executive-level insights into vulnerabilities, external threats,
              and security performance.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-blue-600 text-white text-sm sm:text-base font-medium shadow hover:bg-blue-700 transition">
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

            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-200 text-sm sm:text-base font-medium hover:bg-slate-700 transition">
              Last Month
              <svg
                className="w-4 h-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-slate-200 text-sm sm:text-base font-medium hover:bg-slate-700 transition">
              Previous Scans
              <svg
                className="w-4 h-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Top row: score + vulnerability tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Score Card (spans 2 columns on md) */}
          <div className="md:col-span-2">
            <div className={card + " flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"}>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 justify-center sm:justify-start">
                  Cyber Hygiene Score <span className="text-slate-400 text-sm">ⓘ</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto sm:mx-0">
                  Reflects your organizations overall security posture. Aim for a
                  higher score.
                </p>

                <button className="mt-4 sm:mt-6 px-4 sm:px-5 py-2 sm:py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm rounded-md border border-slate-700 transition w-full sm:w-auto">
                  Improve Score
                </button>
              </div>

              <div className="flex items-center justify-center">
                {/* responsive size using tailwind width/h classes */}
                <div className="w-28 h-28 sm:w-36 sm:h-36">
                  <CircularProgressbar
                    value={score}
                    text={`${score}`}
                    strokeWidth={10}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: `url(#grad-main)`,
                      trailColor: "#0f1724",
                      textSize: "26px",
                    })}
                  />
                  {/* local gradient defs used by pathColor url */}
                  <svg style={{ height: 0 }}>
                    <defs>
                      <linearGradient id="grad-main" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#F44336" />
                        <stop offset="50%" stopColor="#FF9800" />
                        <stop offset="100%" stopColor="#FFEB3B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerability tiles (1 column on md) */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              <div className="col-span-3 sm:col-span-3 bg-red-600 text-white rounded-lg p-3 flex flex-col items-center justify-center shadow">
                <h3 className="text-xs sm:text-sm font-medium text-center">Total Vulnerabilities</h3>
                <p className="text-lg sm:text-2xl font-bold mt-1">11</p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              <div className="rounded-lg p-2 flex flex-col items-center justify-center bg-slate-900 border border-slate-700 shadow">
                <h3 className="text-[11px] sm:text-xs font-medium">Critical</h3>
                <p className="text-lg sm:text-xl font-bold mt-0.5">0</p>
                <span className="text-green-400 text-[10px] mt-0.5">▲ +0.53%</span>
              </div>

              <div className="rounded-lg p-2 flex flex-col items-center justify-center bg-slate-900 border border-red-700 shadow">
                <h3 className="text-[11px] sm:text-xs font-medium">High</h3>
                <p className="text-lg sm:text-xl font-bold mt-0.5">0</p>
                <span className="text-red-400 text-[10px] mt-0.5">▼ -5.5%</span>
              </div>

              <div className="rounded-lg p-2 flex flex-col items-center justify-center bg-slate-900 border border-yellow-700 shadow">
                <h3 className="text-[11px] sm:text-xs font-medium">Medium</h3>
                <p className="text-lg sm:text-xl font-bold mt-0.5">2</p>
                <span className="text-green-400 text-[10px] mt-0.5">▲ +0.53%</span>
              </div>

              <div className="rounded-lg p-2 flex flex-col items-center justify-center bg-slate-900 border border-green-700 shadow">
                <h3 className="text-[11px] sm:text-xs font-medium">Low</h3>
                <p className="text-lg sm:text-xl font-bold mt-0.5">5</p>
                <span className="text-red-400 text-[10px] mt-0.5">▼ -5.5%</span>
              </div>

              <div className="rounded-lg p-2 flex flex-col items-center justify-center bg-slate-900 border border-blue-700 shadow">
                <h3 className="text-[11px] sm:text-xs font-medium">Info</h3>
                <p className="text-lg sm:text-xl font-bold mt-0.5">4</p>
                <span className="text-green-400 text-[10px] mt-0.5">▲ +0.53%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Risk Trends and Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Trends */}
          <div className={card}>
            <h2 className="text-base sm:text-lg font-semibold mb-3">Risk Trends Over Time</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              <button className="px-3 py-1 text-xs sm:text-sm rounded bg-blue-600 text-white">Monthly</button>
              <button className="px-3 py-1 text-xs sm:text-sm rounded bg-slate-800 text-slate-300">Weekly</button>
              <button className="px-3 py-1 text-xs sm:text-sm rounded bg-slate-800 text-slate-300">Today</button>
            </div>

            {/* Chart wrapper with deterministic height so ResponsiveContainer can size itself */}
            <div className="w-full h-64 sm:h-72 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: "#0f1724", border: "none" }} labelStyle={{ color: "#fff" }} />
                  <Legend />
                  <Line type="monotone" dataKey="Critical" stroke="#f87171" strokeWidth={2} />
                  <Line type="monotone" dataKey="High" stroke="#fb923c" strokeWidth={2} />
                  <Line type="monotone" dataKey="Medium" stroke="#facc15" strokeWidth={2} />
                  <Line type="monotone" dataKey="Low" stroke="#4ade80" strokeWidth={2} />
                  <Line type="monotone" dataKey="Info" stroke="#60a5fa" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Two-column content under chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Risk Bar Chart */}
              <div className="bg-transparent p-0">
                <h3 className="text-lg font-semibold mb-3">Asset Risk by Severity</h3>
                <div className="w-full h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assetRiskData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#cbd5e1" />
                      <YAxis allowDecimals={false} stroke="#cbd5e1" />
                      <Tooltip contentStyle={{ backgroundColor: "#0f1724", border: "none" }} labelStyle={{ color: "#fff" }} />
                      <Bar dataKey="value" fill="#ef4444" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Threat Intelligence */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-3">Threat Intelligence Score</h3>
                <div className="w-32 h-20">
                  <CircularProgressbar
                    value={threatScore}
                    maxValue={100}
                    text={`${threatScore}`}
                    circleRatio={0.5}
                    styles={buildStyles({
                      rotation: 0.75,
                      strokeLinecap: "round",
                      pathColor: "#fbbf24",
                      textColor: "#fff",
                      trailColor: "#0f1724",
                      textSize: "18px",
                    })}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-3 text-center">Moderate concerns detected</p>
              </div>
            </div>
          </div>

          {/* Compliance Coverage */}
          <div className={card + " flex flex-col justify-between"}>
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-3">Compliance Coverage</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg p-4 flex flex-col items-center justify-center border border-slate-700">
                  <h3 className="text-sm sm:text-base font-medium text-slate-200 text-center">OWASP Coverage</h3>
                  <div className="w-24 h-12 sm:w-28 sm:h-14 mt-3 mb-3">
                    <CircularProgressbar
                      value={76.67}
                      maxValue={100}
                      text={`76.67`}
                      circleRatio={0.5}
                      styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: "round",
                        pathColor: "#3b82f6",
                        textColor: "#fff",
                        trailColor: "#0f1724",
                        textSize: "16px",
                      })}
                    />
                  </div>
                </div>

                <div className="rounded-lg p-4 flex flex-col items-center justify-center border border-slate-700">
                  <h3 className="text-sm sm:text-base font-medium text-slate-200 text-center">NVD Coverage</h3>
                  <div className="w-24 h-12 sm:w-28 sm:h-14 mt-3 mb-3">
                    <CircularProgressbar
                      value={72}
                      maxValue={100}
                      text={`72`}
                      circleRatio={0.5}
                      styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: "round",
                        pathColor: "#22c55e",
                        textColor: "#fff",
                        trailColor: "#0f1724",
                        textSize: "16px",
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Open Ports & Services</h3>
                  <div className="overflow-x-auto">
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
                </div>

                <div className="border border-slate-700 rounded-lg p-4 flex flex-col">
                  <h3 className="text-lg font-semibold mb-3">Security Headers</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded">Present (6)</button>
                    <button className="px-3 py-1 text-xs bg-red-900 text-red-300 rounded">Missing (3)</button>
                  </div>
                  <div className="text-sm space-y-2">
                    <p className="border border-slate-700 p-2 rounded bg-slate-800">content-security-policy</p>
                    <p className="border border-slate-700 p-2 rounded bg-slate-800">x-content-type-options</p>
                    <p className="border border-slate-700 p-2 rounded bg-slate-800">strict-transport-security</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attack Surface + Vulnerable Endpoints stacked at bottom with responsive widths */}
            <div className="mt-6 space-y-4">
              <div className="border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  Attack Surface Index <span className="text-slate-400 text-sm">ⓘ</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="bg-slate-800 rounded-lg p-3 text-center">
                    <div className="text-blue-400 text-xl font-bold">3</div>
                    <div className="text-xs text-slate-300 mt-1">Exposed Services</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 text-center">
                    <div className="text-red-400 text-xl font-bold">1</div>
                    <div className="text-xs text-slate-300 mt-1">Public IPs</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 text-center">
                    <div className="text-yellow-400 text-xl font-bold">3</div>
                    <div className="text-xs text-slate-300 mt-1">Open Ports</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3 text-center">
                    <div className="text-blue-400 text-xl font-bold">1</div>
                    <div className="text-xs text-slate-300 mt-1">Subdomains</div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="border border-slate-700 rounded-md px-3 py-2 text-sm text-blue-400 hover:bg-slate-800 transition">Details</button>
                </div>
              </div>

              <div className="border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Vulnerable Endpoints</h3>
                <div className="space-y-3">
                  {dataa.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between border border-slate-800 rounded-lg p-3 hover:bg-slate-800 transition"
                    >
                      <div className="mb-2 sm:mb-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 font-medium flex items-center gap-1 break-all"
                        >
                          GET {item.url}
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                        <p className="text-sm text-slate-400">{item.vulnerability}</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-center ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-blue-400 text-sm font-medium hover:underline">Show All →</button>
              </div>

              <div className="border border-slate-700 rounded-lg p-4">
                <h3 className="text-base font-semibold flex items-center gap-2">Assets Intelligence Graph <FaRegQuestionCircle className="text-slate-400 text-sm" /></h3>
                <p className="text-sm text-slate-400 mt-1">
                  Visualizes your domain’s subdomains, WHOIS, SSL certificates, and DNS resolution—helping you map external exposures and dependencies at a glance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Vulnerabilities card */}
        <div className={`${card} max-w-full`}>
          <h2 className="text-lg font-semibold mb-4">Top Vulnerabilities</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {["All", "Critical", "High", "Medium", "Low"].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1 text-xs rounded ${
                  filter === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="py-2">Vulnerability</th>
                  <th>Severity</th>
                  <th>Endpoint</th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilities.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-800">
                    <td className="py-3">{item.vulnerability}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.severity === "High"
                            ? "bg-orange-700 text-orange-200"
                            : item.severity === "Medium"
                            ? "bg-yellow-700 text-yellow-200"
                            : "bg-green-700 text-green-200"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="text-blue-400 hover:underline">
                      <a href={item.endpoint} target="_blank" rel="noopener noreferrer">
                        {item.endpoint}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <button className="text-blue-400 hover:underline text-sm">Show All</button>
          </div>
        </div>

        {/* Latest Security News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${card} mb-6`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Latest Security News
                  <span className="text-green-400 text-xs font-medium">LIVE</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time cybersecurity threats and updates • <span className="italic">Last update: 2:11</span>
                </p>
              </div>

              <button className="p-2 rounded-md hover:bg-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  emblem: "C",
                  title: "CISA Releases Security Advisory for Critical Infrastructure",
                  desc:
                    "The Cybersecurity and Infrastructure Security Agency has issued new guidance for protecting critical infrastructure from cyber threats.",
                  meta: "CISA • 3h ago • Read more",
                  level: "CRITICAL",
                  badgeColor: "text-red-400",
                  iconBg: "bg-red-100 text-red-600",
                },
                {
                  emblem: "A",
                  title: "Latest Cybersecurity Threats and Vulnerabilities",
                  desc:
                    "Comprehensive coverage of the latest security risks, data breaches, and vulnerability disclosures affecting organizations worldwide.",
                  meta: "BleepingComputer • 5h ago",
                  level: "HIGH",
                  badgeColor: "text-orange-400",
                  iconBg: "bg-yellow-100 text-yellow-600",
                },
                {
                  emblem: "S",
                  title: "Security Week - Latest Cybersecurity News",
                  desc:
                    "Security news updates with a focus on cyber threats, vulnerabilities, and industry developments from security experts.",
                  meta: "SecurityWeek • 8h ago",
                  level: "MEDIUM",
                  badgeColor: "text-yellow-400",
                  iconBg: "bg-blue-100 text-blue-600",
                },
                {
                  emblem: "K",
                  title: "Knobs on Security - In-depth Security Analysis",
                  desc:
                    "In-depth cybersecurity reporting and analysis on the latest threats from renowned security journalist Brian Krebs.",
                  meta: "KrebsOnSecurity • 1d ago",
                  level: "HIGH",
                  badgeColor: "text-orange-400",
                  iconBg: "bg-slate-100 text-slate-700",
                },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${n.iconBg} flex items-center justify-center rounded-full font-bold`}>{n.emblem}</div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-100">{n.title}</h3>
                    <p className="text-xs text-slate-400">{n.desc}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-slate-500">{n.meta}</span>
                      <span className={`text-xs font-bold ${n.badgeColor}`}>{n.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder: future right-column (keeps layout balanced on larger screens) */}
          <div className={`${card} hidden md:block`}>
            <h3 className="text-lg font-semibold mb-2">Additional Insights</h3>
            <p className="text-sm text-slate-400">Reserved space for future widgets or quick actions (threat feed, scan controls, export options).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASMDashboard;
