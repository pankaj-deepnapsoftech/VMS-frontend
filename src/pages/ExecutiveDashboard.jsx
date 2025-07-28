import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuthContext, useReportContext } from "@/context";
import Loader from "@/components/Loader/Loader";
import { summaryData } from "@/constants/dynomic.data";



const complianceData = [
  { title: "HIPAA", percent: 87, color: "#4F7FFF" },
  { title: "PCI-DSS", percent: 55, color: "#28C4B9" },
  { title: "SOC", percent: 78, color: "#F29C1F" },
  { title: "GDPR", percent: 85, color: "#A259FF" },
];

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Threat Detection",
    "Incident Response",
    "Vulnerability Mgmt",
    "Compliance",
    "Risk Assessment",
    "Security Monitoring",
  ],
  datasets: [
    {
      label: "SOC Coverage",
      data: [85, 70, 75, 60, 65, 80],
      backgroundColor: "rgba(79, 127, 255, 0.1)",
      borderColor: "#4F7FFF",
      pointBackgroundColor: "#4F7FFF",
      borderWidth: 2,
    },
    {
      label: "ROC Coverage",
      data: [90, 80, 85, 75, 70, 85],
      backgroundColor: "rgba(29, 195, 126, 0.1)",
      borderColor: "#1DC37E",
      pointBackgroundColor: "#1DC37E",
      borderWidth: 2,
    },
  ],
};

const options = {
  scales: {
    r: {
      angleLines: { color: "#2B3348" },
      grid: { color: "#2B3348" },
      pointLabels: {
        color: "#FFFFFF",
        font: { size: 12 },
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default function ExecutiveSummaryPage() {

  const { token } = useAuthContext();
  const { GetRiskData, dasboardData, loading } = useReportContext();

  const [tenant, setTenant] = useState('');


  

  useEffect(() => {
    if (token) {
      GetRiskData(tenant);
    }

  }, [token, tenant]);



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get('tenant') || '');
  }, [location.search]);


  return loading ? <Loader /> : (
    <div className="min-h-screen bg-background p-6 font-sans">
      <div className="flex flex-col mb-10 gap-3 max-w-7xl mx-auto">
        {/* First Row */}
        <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
          {/* Executive Summary */}
          <div className="bg-[#161d3d] rounded-2xl p-4 sm:p-5 w-full xl:w-[65%] shadow-md border border-gray-800">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg sm:text-xl text-white font-semibold">
                Executive Summary
              </h2>
              <button className="text-white/50 hover:text-white text-lg leading-none">
                ⋯
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
              {summaryData(dasboardData).map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#1C2543] px-3 py-2 text-white shadow-sm border border-[#303A60] flex flex-col justify-between h-[100px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-300">
                      {item.title}
                    </span>
                    <img
                      src={item.icon}
                      alt="icon"
                      className="w-7 h-7 sm:w-8 sm:h-8"
                    />
                  </div>
                  <div className="text-sm sm:text-base font-semibold">
                    {item.value}
                  </div>
                  <div className={`${item.trendColor} text-xs sm:text-sm`}>
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-[#161d3d] text-white rounded-xl p-4 sm:p-5 w-full xl:w-[35%] shadow-lg border border-[#1A233A] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Compliance Status
              </h2>
              <button className="text-white/50 hover:text-white text-lg leading-none">
                ⋯
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left: Progress Bars */}
              <div className="flex flex-col gap-4 w-full md:w-2/3">
                {complianceData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1 text-white/80">
                      <span>{item.title}</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#2B3348] rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Circular Chart */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
                  <CircularProgressbarWithChildren
                    value={85.5}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: "#1DC37E",
                      trailColor: "#2B3348",
                    })}
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-base sm:text-xl font-semibold text-white">
                        85.5%
                      </p>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                  Overall Compliance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
       <div className="flex flex-col gap-4 w-full">
          {/* First Row: Risk Score, SOC vs ROC, Risk Heat Map */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Risk Score Overview */}
            <div className="bg-[#161d3d] text-white rounded-2xl p-4 w-full lg:w-1/4 shadow-md border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-base sm:text-lg font-semibold">
                  Risk Score Overview
                </h2>
                <button className="text-white/50 hover:text-white text-lg sm:text-xl leading-none">
                  ⋯
                </button>
              </div>
              <div className="w-24 h-24 mx-auto my-2">
              <CircularProgressbarWithChildren
                value={dasboardData?.risk_score ? (dasboardData?.risk_score / 1000) * 100 : "0"}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: "#FF7F0E",
                  trailColor: "#1E2A3E",
                })}
              >
                <p className="text-lg font-bold">{dasboardData?.risk_score ? dasboardData?.risk_score : "0"}</p>
                <p className="text-xs text-gray-400">/ 1000</p>
              </CircularProgressbarWithChildren>
            </div>

              <p className="text-xs text-center text-white mt-1">
                Current Risk Score
              </p>
              <div className="flex items-center justify-center mt-2">
                <p className="text-green-400 text-xs">↓ 12%</p>
              </div>
            </div>

            {/* SOC vs ROC Coverage */}
            <div className="bg-[#161d3d] text-white rounded-2xl p-4 w-full lg:w-1/4 shadow-md border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-base sm:text-lg font-semibold">
                  SOC vs ROC Coverage
                </h2>
                <button className="text-white/50 hover:text-white text-lg sm:text-xl leading-none">
                  ⋯
                </button>
              </div>
              <div className="h-36 sm:h-40">
                <Radar data={data} options={options} />
              </div>
              <div className="flex flex-wrap gap-4 justify-center mt-2 text-xs text-white/80">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4F7FFF]" /> SOC
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1DC37E]" /> ROC
                </div>
              </div>
            </div>

            {/* Risk Heat Map */}
            <div className="bg-[#161d3d] border border-gray-800 p-4 rounded-2xl w-full lg:w-2/4 text-white">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-base sm:text-lg font-semibold">
                  Risk Heat Map
                </h2>
                <button className="text-white/50 hover:text-white text-lg sm:text-xl leading-none">
                  ⋯
                </button>
              </div>

              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-1 text-[10px] sm:text-xs md:text-sm min-w-[400px]">
                  <div></div>
                  <div className="text-center text-white/70">VL</div>
                  <div className="text-center text-white/70">Low</div>
                  <div className="text-center text-white/70">Med</div>
                  <div className="text-center text-white/70">High</div>
                  <div className="text-center text-white/70">Crit</div>

                  {/* Rows */}
                  {["VL", "Low", "Med", "High", "Crit"].map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      <div className="text-white/70">{row}</div>
                      {[...Array(5)].map((_, cIdx) => (
                        <div
                          key={cIdx}
                          className={`h-8 rounded ${
                            rIdx === 0 || rIdx === 1
                              ? cIdx < 2
                                ? "bg-green-500"
                                : cIdx === 2
                                ? "bg-yellow-400"
                                : cIdx === 3
                                ? "bg-orange-500"
                                : "bg-red-500"
                              : rIdx === 2
                              ? cIdx < 2
                                ? "bg-yellow-400"
                                : cIdx < 4
                                ? "bg-orange-500"
                                : "bg-red-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-xs text-white/60 mt-4">
                <span>↑ Impact</span>
                <span>Likelihood →</span>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="bg-[#161d3d] border border-gray-800 p-4 sm:p-6 rounded-2xl w-full text-white font-sans">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                Top 10 Risk Indicators
              </h2>
              <button className="text-white/50 hover:text-white text-lg sm:text-xl leading-none">
                ⋯
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Unpatched Critical CVE-2024-1234",
                  system: "Web Server",
                  likelihood: "95%",
                  level: "Critical",
                  exposure: "$2.4M",
                },
                {
                  title: "Weak Authentication Controls",
                  system: "Database",
                  likelihood: "78%",
                  level: "High",
                  exposure: "$1.8M",
                },
                {
                  title: "Outdated SSL Certificates",
                  system: "Load Balancer",
                  likelihood: "85%",
                  level: "High",
                  exposure: "$950K",
                },
                {
                  title: "Privileged Account Misuse",
                  system: "Domain Controller",
                  likelihood: "67%",
                  level: "Critical",
                  exposure: "$3.2M",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#242f49] rounded-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-sm sm:text-base">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60">
                      {item.system}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60">
                      Likelihood:{" "}
                      <span className="text-white font-semibold">
                        {item.likelihood}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        item.level === "Critical"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-orange-600/20 text-orange-400"
                      }`}
                    >
                      {item.level}
                    </span>
                    <p className="text-xs sm:text-sm text-white/60 mt-1">
                      Exposure:{" "}
                      <span className="text-white font-semibold">
                        {item.exposure}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>







        {/* Fourth Row  */}
        <div className="flex gap-4 w-full h-[380px]">
          {/* Asset Inventory */}
          <div className="bg-[#161d3d] p-4 border border-gray-800 rounded-xl flex-1 text-white font-sans flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-base font-semibold">Asset Inventory</h2>
              <button className="text-white/50 hover:text-white text-lg leading-none">
                ⋯
              </button>
            </div>

            {/* Circle Graph */}
            <div className="flex justify-center items-center mb-1">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="#8B5CF6"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                  <p className="text-lg font-bold">691</p>
                  <p className="text-[10px] text-white/60">Total Assets</p>
                </div>
              </div>
            </div>

            {/* Asset Details */}
            <div className="space-y-2 text-xs mt-auto">
              {[
                {
                  color: "bg-blue-500",
                  name: "Cloud Assets",
                  total: "145",
                  critical: "23",
                },
                {
                  color: "bg-red-500",
                  name: "IoT Devices",
                  total: "89",
                  critical: "12",
                },
                {
                  color: "bg-yellow-400",
                  name: "Endpoints",
                  total: "234",
                  critical: "45",
                },
                {
                  color: "bg-green-400",
                  name: "Network Infra",
                  total: "67",
                  critical: "8",
                },
                {
                  color: "bg-purple-400",
                  name: "Mobile Devices",
                  total: "156",
                  critical: "19",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${item.color}`}
                    ></span>
                    <span>{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span>{item.total}</span>
                    <br />
                    <span className="text-red-500 text-[10px]">
                      {item.critical} critical
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Exposure */}
          <div className="bg-[#161d3d] p-4 border border-gray-800 rounded-xl flex-1 text-white shadow-lg font-sans flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold">Financial Exposure</h2>
              <button className="text-white/50 hover:text-white text-lg leading-none">
                ⋯
              </button>
            </div>

            {/* Values */}
            <div className="flex items-end gap-4 mb-4">
              <div>
                <p className="text-[20px] font-bold text-[#FF5C5C]">$12.8M</p>
                <p className="text-xs text-white/70">Value at Risk (VaR)</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#FFA93B]">$4.2M</p>
                <p className="text-xs text-white/70">Potential Impact</p>
              </div>
            </div>

            {/* Bars */}
            <div className="flex flex-col justify-center gap-4 mt-auto">
              {[
                {
                  label: "Data Breach Risk",
                  value: "$8.4M",
                  color: "#FF5C5C",
                  width: "100%",
                },
                {
                  label: "System Downtime",
                  value: "$2.8M",
                  color: "#FFA93B",
                  width: "33%",
                },
                {
                  label: "Compliance Fines",
                  value: "$1.6M",
                  color: "#FFD233",
                  width: "20%",
                },
              ].map((bar, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: bar.width, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remediation Workflow */}
          <div className="bg-[#161d3d] p-4 border border-gray-800 rounded-xl flex-1 text-white shadow-lg font-sans flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold">Remediation Workflow</h2>
              <button className="text-white/50 hover:text-white text-lg leading-none">
                ⋯
              </button>
            </div>

            <div className="flex items-end gap-6 mb-5">
              <div>
                <p className="text-[20px] font-bold">156</p>
                <p className="text-xs text-white/70">Total Tasks</p>
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#27D27D]">4.2 days</p>
                <p className="text-xs text-white/70">MTTR</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 mt-auto">
              {[
                {
                  label: "Assigned",
                  value: 89,
                  color: "#4D9EFF",
                  width: "57%",
                },
                {
                  label: "In Progress",
                  value: 34,
                  color: "#FFA93B",
                  width: "22%",
                },
                {
                  label: "Completed",
                  value: 67,
                  color: "#27D27D",
                  width: "43%",
                },
              ].map((bar, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{bar.label}</span>
                    <span style={{ color: bar.color }}>{bar.value}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: bar.width, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Threat Intelligence Feed */}
          <div className="bg-[#161d3d] p-4 border border-gray-800 rounded-xl flex-1 text-white shadow-lg font-sans flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-base font-semibold">
                Threat Intelligence Feed
              </h2>
              <button className="text-white/50 hover:text-white text-lg leading-none">
                ⋯
              </button>
            </div>

            <div className="flex-1 space-y-2">
              {[
                {
                  title: "APT29",
                  severity: "Critical",
                  color: "text-red-500",
                  desc: "Active campaign targeting financial institutions",
                  time: "2 min ago",
                },
                {
                  title: "Ransomware",
                  severity: "High",
                  color: "text-orange-400",
                  desc: "New LockBit variant detected in the wild",
                  time: "15 min ago",
                },
                {
                  title: "Phishing",
                  severity: "Medium",
                  color: "text-yellow-300",
                  desc: "Credential harvesting campaign via email",
                  time: "32 min ago",
                },
                {
                  title: "Malware",
                  severity: "High",
                  color: "text-orange-400",
                  desc: "Banking trojan with new evasion techniques",
                  time: "45 min ago",
                },
              ].map((feed, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-gray-600 pl-2 space-y-0.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">{feed.title}</span>
                    <span className={`text-xs ${feed.color}`}>
                      {feed.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70">{feed.desc}</p>
                  <p className="text-[10px] text-white/50">{feed.time}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1 text-green-400 text-xs">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
              <span>Live Feed Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
