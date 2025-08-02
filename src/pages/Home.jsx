import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTVMCardsContext } from "../context";

const data = [
  { name: "Critical", green: 2, yellow: 4, red: 1 },
  { name: "High", green: 5, yellow: 6, red: 2 },
  { name: "Medium", green: 9, yellow: 11, red: 4 },
  { name: "Low", green: 11, yellow: 14, red: 5 },
];

// Register Chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

// This will be replaced with dynamic data from API

const vulnerabilityData = [
  { label: "Open", value: 50, color: "#EF4444" },
  { label: "Closed", value: 67, color: "#22C55E" },
  { label: "Re Open", value: 25, color: "#F97316" },
  { label: "On Hold", value: 8, color: "#3B82F6" },
];

const InventoryData = [
  { label: "App assessed", value: 30, color: "#EF4444" },
  { label: "IPs assessed", value: 25, color: "#22C55E" },
  { label: "App not assessed", value: 45, color: "#F97316" },
  { label: "IPs not assessed", value: 8, color: "#3B82F6" },
];

const DashboardCards = () => {
  const { tvmCardsData, loading } = useTVMCardsContext();
  
  // Create dynamic card data from API
  const cardData = [
    {
      title: "Applications",
      value: tvmCardsData.applications.toString(),
      icon: "/Icons/TVM1.png",
      color: "#3B82F6",
    },
    {
      title: "Infrastructure IPs",
      value: tvmCardsData.infrastructureIPs.toString(),
      icon: "/Icons/TVM2.png",
      color: "#22C55E",
    },
    {
      title: "Total Vulnerabilities",
      value: tvmCardsData.totalVulnerabilities.toString(),
      icon: "/Icons/TVM3.png",
      color: "#EF4444",
    },
    {
      title: "Remediated",
      value: tvmCardsData.remediated.toString(),
      icon: "/Icons/TVM4.png",
      color: "#10B981",
    },
    {
      title: "Exceptions",
      value: tvmCardsData.exceptions.toString(),
      icon: "/Icons/TVM5.png",
      color: "#F59E0B",
    },
  ];

  // Total Vulnerabilities (for Doughnut center text)
  const total = vulnerabilityData.reduce((sum, item) => sum + item.value, 0);
  const totall = InventoryData.reduce((sum, item) => sum + item.value, 0);

  // Doughnut Chart Data
  const doughnutData = {
    labels: vulnerabilityData.map((item) => item.label),
    datasets: [
      {
        data: vulnerabilityData.map((item) => item.value),
        backgroundColor: vulnerabilityData.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  // Line Chart Data
  const labels = ["Apr", "May", "Jun", "Jul"];
  const lineData = {
    labels,
    datasets: [
      {
        label: "Critical",
        data: [45, 40, 35, 32],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "High",
        data: [30, 32, 33, 34],
        borderColor: "#F97316",
        backgroundColor: "rgba(249,115,22,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Medium",
        data: [20, 22, 23, 22],
        borderColor: "#FACC15",
        backgroundColor: "rgba(250,204,21,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Low",
        data: [10, 12, 14, 15],
        borderColor: "#22C55E",
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Informational",
        data: [7, 8, 9, 10],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Line Chart Options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#9CA3AF" },
      },
      y: {
        min: 0,
        max: 60,
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#9CA3AF", stepSize: 15 },
      },
    },
  };

  const data = [
    {
      label: "Easily Exploitable",
      value: 60.5,
      color: "bg-red-500",
      icon: "/Icons/Exploitability1.png",
    },
    {
      label: "Network Exploitable",
      value: 30.6,
      color: "bg-orange-500",
      icon: "/Icons/Exploitability2.png",
    },
    {
      label: "Public Exploit Available",
      value: 83.2,
      color: "bg-yellow-400",
      icon: "/Icons/Exploitability3.png",
    },
    {
      label: "High Lateral Movement",
      value: 45.1,
      color: "bg-green-500",
      icon: "/Icons/Exploitability4.png",
    },
  ];

  const vulnerableData = [
    {
      label: "Overdue Critical / High Vulnerable Items",
      value: 85,
      color: "bg-red-500",
    },
    {
      label: "by Assignment Group",
      value: 65,
      color: "bg-orange-500",
    },
    {
      label: "Medium Priority Items",
      value: 45,
      color: "bg-yellow-400",
    },
    {
      label: "Low Priority Completed",
      value: 25,
      color: "bg-green-500",
    },
  ];

  const tableData = [
    { name: "webApplication", june: 1, trend: "/Icons/SVG1.png" },
    { name: "mobileApplication", june: 0, trend: null },
    { name: "ApiServer", june: 0, trend: null },
    { name: "webApplication", june: 1, trend: "/Icons/SVG2.png" },
    { name: "mobileApplication", june: 0, trend: null },
    { name: "ApiServer", june: 0, trend: null },
  ];

  const tableDataa = [
    { name: "webApplication", june: 1, trend: "/Icons/SVG1.png" },
    { name: "mobileApplication", june: 0, trend: null },
    { name: "ApiServer", june: 0, trend: null },
  ];

  const categories = ["Critical", "High", "Medium", "Low"];
  const greenData = [1, 5, 9, 12];
  const yellowData = [4, 6, 12, 14];
  const redData = [0.5, 2, 4, 6];

  const maxY = 16;

  return (
    <div className="w-full px-4 sm:px-6">
      {/* Search bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#161e3e] text-white mt-8 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none border border-gray-700"
        />
      </div>

      {/* Cards */}
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bg-[#161e3e] rounded-xl px-4 py-4 shadow-md border border-gray-800 animate-pulse"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-md"></div>
                  <div className="h-4 bg-gray-600 rounded w-20"></div>
                </div>
                <div className="h-6 bg-gray-600 rounded w-12 mt-3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 min-w-[300px] sm:min-w-0"
            style={{ minWidth: "fit-content" }}
          >
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-[#161e3e] rounded-xl px-4 py-4 shadow-md border border-gray-800 hover:shadow-lg transition-shadow flex flex-col items-start min-w-[200px] sm:min-w-0"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-md">
                    <img src={card.icon} alt={card.title} className="w-7 h-7" />
                  </div>
                  <p
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </p>
                </div>
                <p className="text-xl font-semibold text-white mt-3 ml-1">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* First Row */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Vulnerability Status Card */}
        <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 w-full md:w-[360px] lg:w-[360px] h-auto shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-base font-semibold">
              Vulnerability Status
            </h2>
            <button className="text-gray-400 text-sm">•••</button>
          </div>

          {/* Doughnut Chart */}
          <div className="relative flex justify-center items-center h-[120px] sm:h-[140px] md:h-[150px]">
            <Doughnut
              data={doughnutData}
              options={{
                cutout: "70%",
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: false },
                },
              }}
            />
            <div className="absolute flex flex-col items-center">
              <p className="text-white text-lg font-bold">{total}</p>
              <p className="text-gray-400 text-xs">Total</p>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-y-2 mt-3">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-2 pl-4 sm:pl-6">
              {vulnerabilityData.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <p className="text-white text-xs">
                    {item.label}{" "}
                    <span className="text-gray-400">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col items-start gap-2">
              {vulnerabilityData.slice(2, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <p className="text-white text-xs">
                    {item.label}{" "}
                    <span className="text-gray-400">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart Card */}
        <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 flex-1 h-auto shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
            <h2 className="text-white text-base sm:text-lg font-semibold truncate">
              Vulnerable Items by Risk Rating
            </h2>
            <div className="flex items-center gap-2 flex-shrink-0">
              <select className="bg-[#0E1430] text-gray-300 text-sm px-2 sm:px-3 py-1 rounded-lg border border-gray-700 focus:outline-none">
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="text-gray-400 text-lg">•••</button>
            </div>
          </div>

          {/* Line Chart Container */}
          <div className="w-full h-[150px] md:h-[160px] overflow-hidden">
            <Line
              data={lineData}
              options={{
                ...lineOptions,
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
            {lineData.datasets.map((ds, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ds.borderColor }}
                ></span>
                <p className="text-white text-xs">{ds.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row  */}
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-4 w-full">
        {/* Exploitability */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full md:w-[360px] lg:flex-1">
          <h2 className="text-lg font-semibold mb-4">Exploitability</h2>
          {data.map((item, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between h-[30px] items-center mb-2">
                <div className="flex items-center gap-2">
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-[#1B2B45] h-2 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Status */}
        <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 w-full md:w-[360px] lg:flex-1 h-auto shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-base font-semibold">
              Inventory Status
            </h2>
            <button className="text-gray-400 text-sm">•••</button>
          </div>

          {/* Doughnut Chart */}
          <div className="relative flex justify-center items-center h-[200px] sm:h-[240px]">
            <Doughnut
              data={doughnutData}
              options={{
                cutout: "70%",
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: false },
                },
              }}
            />
            <div className="absolute flex flex-col items-center">
              <p className="text-white text-lg font-bold">{totall}</p>
              <p className="text-gray-400 text-xs">Total</p>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-y-2 mt-3">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-2 pl-4 sm:pl-6">
              {InventoryData.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <p className="text-white text-xs">
                    {item.label}{" "}
                    <span className="text-gray-400">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col items-start gap-2">
              {InventoryData.slice(2, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <p className="text-white text-xs">
                    {item.label}{" "}
                    <span className="text-gray-400">{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical / High Vulnerable Items */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="mb-1 text-lg font-semibold">
            Critical / High Vulnerable Items
          </div>
          <div className="text-xs text-gray-400 mb-4">by Assignment Group</div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">June</div>
              <div className="col-span-3">Trend</div>
            </div>

            {/* Data Rows */}
            {tableData.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-1 border-b border-[#1B2B45] items-center"
              >
                <div className="col-span-6 truncate">{row.name}</div>
                <div className="col-span-3">{row.june}</div>
                <div className="col-span-3">
                  {row.trend ? (
                    <img
                      src={row.trend}
                      alt="trend"
                      className="w-4 h-4 inline-block"
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row  */}
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-4 w-full">
        {/* Card 1: Closed Vulnerable Items */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full md:w-[360px] lg:flex-1">
          <h2 className="text-lg font-semibold mb-4">
            Closed Vulnerable Items by Remediation Target Status
          </h2>
          {vulnerableData.map((item, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-[#1B2B45] h-2 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Card 2: Vulnerable Items by Age */}
        <div className="bg-[#161e3e] rounded-xl p-4 w-full md:w-[360px] lg:flex-1 text-white shadow-lg border border-gray-800">
          <div className="font-semibold text-sm mb-1">
            Vulnerable Items by Age
          </div>

          {/* Chart */}
          <div className="flex mt-4 h-[160px] sm:h-[180px]">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between mr-2 text-[10px] text-gray-500">
              {[...Array(5)].map((_, i) => {
                const value = maxY - i * 4;
                return (
                  <div
                    key={value}
                    style={{ height: "32px" }}
                    className="flex items-center"
                  >
                    {value}
                  </div>
                );
              })}
            </div>

            {/* Grid + Bars */}
            <div className="relative flex-1 overflow-hidden">
              {/* Horizontal dotted lines */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 w-full border-t border-dotted border-gray-600"
                  style={{ top: `${i * 32}px` }}
                />
              ))}

              {/* Bar Groups */}
              <div className="flex justify-around items-end h-full z-10 relative">
                {categories.map((label, i) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className="flex items-end space-x-1">
                      <div
                        className="w-2 rounded-sm bg-green-500"
                        style={{ height: `${(greenData[i] / maxY) * 160}px` }}
                      />
                      <div
                        className="w-2 rounded-sm bg-yellow-400"
                        style={{ height: `${(yellowData[i] / maxY) * 160}px` }}
                      />
                      <div
                        className="w-2 rounded-sm bg-red-500"
                        style={{ height: `${(redData[i] / maxY) * 160}px` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-300 mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center text-xs text-gray-400 gap-3 mt-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              0–30 days
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              31–90 days
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              90+ days
            </div>
          </div>
        </div>

        {/* Card 3: Overdue Critical / High Vulnerable Items */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="mb-1 text-lg font-semibold">
            Overdue Critical / High Vulnerable Items
          </div>
          <div className="text-xs text-gray-400 mb-4">by Assignment Group</div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">June</div>
              <div className="col-span-3">Trend</div>
            </div>

            {/* Data Rows */}
            {tableDataa.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-1 border-b border-[#1B2B45] items-center"
              >
                <div className="col-span-6 truncate">{row.name}</div>
                <div className="col-span-3">{row.june}</div>
                <div className="col-span-3">
                  {row.trend ? (
                    <img
                      src={row.trend}
                      alt="trend"
                      className="w-4 h-4 inline-block"
                    />
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fourth Row  */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        <div className="bg-[#161e3e] mb-10 rounded-xl p-4 w-full text-white shadow-lg border mb-20 border-gray-800">
          <div className="font-semibold text-sm mb-3">
            Open and Closed Vulnerable Items
          </div>

          {/* Chart Container */}
          <div className="flex mt-2 h-[180px] sm:h-[200px] relative">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between mr-2 text-[9px] sm:text-[10px] text-gray-500">
              {[32, 24, 16, 8, 0].map((v, i) => (
                <div key={i} className="h-[36px] sm:h-[40px] flex items-center">
                  {v}
                </div>
              ))}
            </div>

            {/* Grid + Bars */}
            <div className="relative flex-1 overflow-hidden">
              {/* Horizontal Dotted Lines */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-dotted border-gray-600"
                  style={{ top: `${i * 36}px` }}
                />
              ))}

              {/* Bars */}
              <div className="flex justify-around items-end h-full relative z-10">
                {["Jan", "Feb", "Mar", "Apr", "May", "June"].map((month, i) => {
                  const openVal = [14, 2, 32, 24, 16, 8][i];
                  const closedVal = [2, 13, 28, 20, 14, 10][i];
                  const exceptionVal = [1, 10, 13, 11, 5, 0][i];
                  return (
                    <div key={month} className="flex flex-col items-center">
                      <div className="flex items-end space-x-[3px] sm:space-x-[4px]">
                        <div
                          className="w-3 sm:w-4 rounded-sm bg-red-500"
                          style={{ height: `${(openVal / 32) * 180}px` }}
                        />
                        <div
                          className="w-3 sm:w-4 rounded-sm bg-blue-500"
                          style={{ height: `${(closedVal / 32) * 180}px` }}
                        />
                        <div
                          className="w-3 sm:w-4 rounded-sm bg-green-400"
                          style={{ height: `${(exceptionVal / 32) * 180}px` }}
                        />
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-300 mt-1">
                        {month}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center text-[10px] sm:text-xs text-gray-400 gap-3 sm:space-x-4 mt-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Open
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Closed
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Exception
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
