import React from "react";
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

const summaryData = [
  {
    title: "Risk Score",
    value: "1,247",
    change: "-12%",
    trendColor: "text-red-400",
    icon: "/Icons/executive1.png",
    backgroundColor: "blue",
  },
  {
    title: "Financial Exposure",
    value: "$8.2M",
    change: "-8%",
    trendColor: "text-orange-400",
    icon: "/Icons/executive2.png",
  },
  {
    title: "MTTR",
    value: "4.2 days",
    change: "+15%",
    trendColor: "text-green-400",
    icon: "/Icons/executive3.png",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "+3%",
    trendColor: "text-blue-400",
    icon: "/Icons/executive4.png",
  },
];

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
  const percentage = (1247 / 2000) * 100;

  return (
    <div className="min-h-screen bg-background p-6 font-sans">
      <div className="flex flex-col gap-3 max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Executive Summary */}
          <div className="bg-[#161d3d] rounded-2xl p-4 w-full md:w-[65%] shadow-md border border-gray-800">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-white text-xl font-semibold">
                Executive Summary
              </h2>
              <span className="text-white text-xl font-bold">...</span>
            </div>

            <div className="flex gap-x-3">
              {summaryData.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#1C2543] px-3 py-2 text-white shadow-sm border border-[#303A60] flex flex-col justify-between h-[100px] w-1/4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{item.title}</span>
                    <img src={item.icon} alt="icon" className="w-6 h-6" />
                  </div>
                  <div className="text-base font-semibold">{item.value}</div>
                  <div className={`${item.trendColor} text-xs`}>
                    {item.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-[#161d3d] text-white rounded-xl p-5 w-full max-w-[500px] flex justify-between shadow-lg border border-[#1A233A]">
            {/* Left: Progress Bars */}
            <div className="flex flex-col gap-4 w-2/3 pr-4">
              <h2 className="text-white text-base font-semibold mb-1">
                Compliance Status
              </h2>
              {complianceData.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1 text-white/80">
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
            <div className="w-1/3 flex flex-col items-center justify-center">
              <div className="w-24 h-24 relative">
                <CircularProgressbarWithChildren
                  value={85.5}
                  strokeWidth={10}
                  styles={buildStyles({
                    pathColor: "#1DC37E",
                    trailColor: "#2B3348",
                  })}
                >
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-semibold text-white">85.5%</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <p className="text-xs text-gray-400 mt-2">Overall Compliance</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Risk Score Overview */}
          <div className="bg-[#161d3d] text-white rounded-2xl p-4 w-[310px] h-[340px] shadow-md border border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold">Risk Score Overview</h2>
              <span className="text-xl font-bold">...</span>
            </div>

            <div className="w-28 h-28 mx-auto my-1">
              <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: "#FF7F0E",
                  trailColor: "#1E2A3E",
                })}
              >
                <div className="flex flex-col items-center">
                  <p className="text-lg font-bold text-white">1247</p>
                  <p className="text-[11px] text-gray-400">/ 2000</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>

            <p className="text-xs text-center text-white mt-1">
              Current Risk Score
            </p>

            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-green-400 text-xs">↓ 12%</p>
            </div>
          </div>

          {/* SOC vs ROC Coverage */}
          <div className="bg-[#161d3d] text-white rounded-2xl p-4 w-full md:w-[340px] h-[340px] shadow-md border border-gray-800">
            <h2 className="text-base font-semibold mb-4">
              SOC vs ROC Coverage Comparison
            </h2>
            <div className="h-44">
              <Radar data={data} options={options} />
            </div>
            <div className="flex gap-6 justify-center mt-1 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4F7FFF] inline-block" />
                SOC Coverage
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1DC37E] inline-block" />
                ROC Coverage
              </div>
            </div>
          </div>

          {/* Risk Heat Map */}
          <div className="bg-[#161d3d] p-6 h-[340px] rounded-md w-full max-w-6xl text-white font-sans">
            <h2 className="text-lg font-semibold mb-6">Risk Heat Map</h2>

            <div className="grid grid-cols-[150px_repeat(5,1fr)] gap-1 items-center">
              <div></div>
              <div className="text-sm text-white/70 text-center">Very Low</div>
              <div className="text-sm text-white/70 text-center">Low</div>
              <div className="text-sm text-white/70 text-center">Medium</div>
              <div className="text-sm text-white/70 text-center">High</div>
              <div className="text-sm text-white/70 text-center">Critical</div>

              <div className="text-sm text-white/70">Very Low</div>
              <div className="h-8 rounded bg-green-500"></div>
              <div className="h-8 rounded bg-green-500"></div>
              <div className="h-8 rounded bg-yellow-400"></div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-red-500"></div>

              <div className="text-sm text-white/70">Low</div>
              <div className="h-8 rounded bg-green-500"></div>
              <div className="h-8 rounded bg-green-500"></div>
              <div className="h-8 rounded bg-yellow-400"></div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-red-500"></div>

              <div className="text-sm text-white/70">Medium</div>
              <div className="h-8 rounded bg-yellow-400"></div>
              <div className="h-8 rounded bg-yellow-400"></div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-red-500"></div>

              <div className="text-sm text-white/70">High</div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-orange-500"></div>
              <div className="h-8 rounded bg-red-500"></div>
              <div className="h-8 rounded bg-red-500"></div>

              <div className="text-sm text-white/70">Critical</div>
              <div className="h-8 rounded bg-red-500"></div>
              <div className="h-8 rounded bg-red-500"></div>
              <div className="h-8 rounded bg-red-500"></div>
              <div className="h-8 rounded bg-red-500"></div>
              <div className="h-8 rounded bg-red-500"></div>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-white/60">
              <span>↑ Business Impact</span>
              <span>Likelihood →</span>
            </div>
          </div>
        </div>

        <div className="bg-[#161d3d] border h-[500px] border-gray-800 p-6 rounded-md w-full max-w-6xl text-white mb-20 font-sans">
          <h2 className="text-lg font-semibold mb-4">Top 10 Risk Indicators</h2>

          <div className="space-y-3 h-[20px">
            <div className="bg-[#242f49] rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Unpatched Critical CVE-2024-1234</p>
                <p className="text-sm text-white/60">Web Server</p>
                <p className="text-sm text-white/60">
                  Likelihood:{" "}
                  <span className="text-white font-semibold">95%</span>
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded">
                  Critical
                </span>
                <p className="text-sm text-white/60 mt-1">
                  Exposure:{" "}
                  <span className="text-white font-semibold">$2.4M</span>
                </p>
              </div>
            </div>

            <div className="bg-[#242f49] rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Weak Authentication Controls</p>
                <p className="text-sm text-white/60">Database</p>
                <p className="text-sm text-white/60">
                  Likelihood:{" "}
                  <span className="text-white font-semibold">78%</span>
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded">
                  High
                </span>
                <p className="text-sm text-white/60 mt-1">
                  Exposure:{" "}
                  <span className="text-white font-semibold">$1.8M</span>
                </p>
              </div>
            </div>

            <div className="bg-[#242f49] rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Outdated SSL Certificates</p>
                <p className="text-sm text-white/60">Load Balancer</p>
                <p className="text-sm text-white/60">
                  Likelihood:{" "}
                  <span className="text-white font-semibold">85%</span>
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded">
                  High
                </span>
                <p className="text-sm text-white/60 mt-1">
                  Exposure:{" "}
                  <span className="text-white font-semibold">$950K</span>
                </p>
              </div>
            </div>

            <div className="bg-[#242f49] rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Privileged Account Misuse</p>
                <p className="text-sm text-white/60">Domain Controller</p>
                <p className="text-sm text-white/60">
                  Likelihood:{" "}
                  <span className="text-white font-semibold">67%</span>
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded">
                  Critical
                </span>
                <p className="text-sm text-white/60 mt-1">
                  Exposure:{" "}
                  <span className="text-white font-semibold">$3.2M</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
