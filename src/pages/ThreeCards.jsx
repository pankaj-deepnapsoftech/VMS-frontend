import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useAuthContext, useTVMCardsContext } from "@/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Gradient background utility for charts
const createGradient = (ctx, chartArea) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, "rgba(255, 99, 132, 0.8)");
  gradient.addColorStop(1, "rgba(255, 99, 132, 0.3)");
  return gradient;
};

// Mock data for all charts with consistent dark theme colors
const chartColors = {
  primary: "rgba(255, 99, 132, 0.8)", // Red for critical
  secondary: "rgba(54, 162, 235, 0.8)", // Blue for assets
  tertiary: "rgba(75, 192, 192, 0.8)", // Teal for high value
  quaternary: "rgba(153, 102, 255, 0.8)", // Purple for vulnerabilities
  quinary: "rgba(255, 159, 64, 0.8)", // Orange for closed/exploitable
};

const mockTop5Risks = {
  labels: ["Risk A", "Risk B", "Risk C", "Risk D", "Risk E"],
  datasets: [
    {
      label: "Risk Score",
      data: [95, 85, 75, 65, 55],
    },
  ],
  years: [2024, 2023, 2022, 2021, 2020],
};

const mockTop5VulnerableAssets = {
  labels: ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5"],
  datasets: [
    {
      label: "Vulnerability Count",
      data: [50, 45, 40, 35, 30],
    },
  ],
  years: [2025, 2024, 2023, 2022, 2021],
};

const mockTop5HighValueAssets = {
  labels: ["Server X", "Database Y", "Endpoint Z", "Cloud VM1", "Firewall 5"],
  datasets: [
    {
      label: "Importance Score",
      data: [98, 92, 89, 85, 80],
    },
  ],
  years: [2025, 2024, 2023, 2022, 2021],
};

const mockTop5OpenVulnerabilities = {
  labels: ["Vuln-001", "Vuln-002", "Vuln-003", "Vuln-004", "Vuln-005"],
  datasets: [
    {
      label: "Severity",
      data: [9.8, 8.5, 7.2, 6.9, 5.4],
      backgroundColor: chartColors.quaternary,
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

const mockTop5ClosedVulnerabilities = {
  labels: ["Vuln-006", "Vuln-007", "Vuln-008", "Vuln-009", "Vuln-010"],
  datasets: [
    {
      label: "Severity",
      data: [9.0, 8.0, 7.0, 6.0, 5.0],
      backgroundColor: chartColors.quinary,
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
    },
  ],
};

const mockTop5UniqueVulnerabilities = {
  labels: ["Unique-1", "Unique-2", "Unique-3", "Unique-4", "Unique-5"],
  datasets: [
    {
      label: "Occurrences",
      data: [20, 18, 15, 12, 10],
      backgroundColor: chartColors.quaternary,
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

const mockCriticalVulnerabilities = {
  labels: ["Critical"],
  datasets: [
    {
      label: "Count",
      data: [42],
      backgroundColor: [chartColors.primary],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

const mockHighVulnerabilities = {
  labels: ["High"],
  datasets: [
    {
      label: "Count",
      data: [120],
      backgroundColor: [chartColors.quinary],
      borderColor: ["rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

const mockSLABreachedCount = {
  labels: ["SLA Breached"],
  datasets: [
    {
      label: "Count",
      data: [15],
      backgroundColor: [chartColors.primary],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

const mockExceptionCount = {
  labels: ["Exceptions"],
  datasets: [
    {
      label: "Count",
      data: [8],
      backgroundColor: [chartColors.tertiary],
      borderColor: ["rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

const mockBreachVulnerabilities = {
  labels: ["Breach-1", "Breach-2", "Breach-3", "Breach-4", "Breach-5"],
  datasets: [
    {
      label: "Severity",
      data: [9.5, 8.8, 7.9, 6.5, 5.2],
      backgroundColor: chartColors.primary,
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const mockExceptionVulnerabilities = {
  labels: ["Except-1", "Except-2", "Except-3", "Except-4", "Except-5"],
  datasets: [
    {
      label: "Severity",
      data: [8.0, 7.5, 6.8, 5.9, 4.7],
      backgroundColor: chartColors.tertiary,
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const mockTop5ExploitableVulnerabilities = {
  labels: ["Exploit-1", "Exploit-2", "Exploit-3", "Exploit-4", "Exploit-5"],
  datasets: [
    {
      label: "Exploitability Score",
      data: [9.9, 9.2, 8.5, 7.8, 7.0],
      backgroundColor: chartColors.quinary,
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
    },
  ],
};

// Chart options for Bar charts
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { color: "#e5e7eb" }, // Light gray for legend text
    },
    title: { display: false },
    tooltip: {
      backgroundColor: "rgba(31, 41, 55, 0.9)", // Dark tooltip background
      titleColor: "#e5e7eb",
      bodyColor: "#e5e7eb",
    },
  },
  scales: {
    x: { ticks: { color: "#e5e7eb" }, grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { color: "#e5e7eb" },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
  },
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
};

// Chart options for Doughnut charts
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { color: "#e5e7eb" },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: "rgba(31, 41, 55, 0.9)",
      titleColor: "#e5e7eb",
      bodyColor: "#e5e7eb",
    },
  },
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
  },
};


const Dashboard = () => {

  const { token, tenant, selectedYear } = useAuthContext();
  const { tenthChart, topFiveRisk } = useTVMCardsContext();

  console.log("this is just testing", topFiveRisk)

+
  useEffect(() => {
    if (token) {
      tenthChart(tenant, selectedYear);
    }
  }, [token, tenant, selectedYear]);


  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Vulnerability Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">Top 5 Risks</div>
              <div className="text-xs text-gray-400">by Risk Score</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Risk Name</div>
              <div className="col-span-3">Score</div>
            </div>

            {/* Data Rows */}
            {topFiveRisk.map((label, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Risk Name */}
                <div className="col-span-6 truncate">{label?.title || "-"}</div>

                {/* Score */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {label?.RAS || "-"}
                </div>


              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Vulnerable Assets */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Top 5 Vulnerable Assets
              </div>
              <div className="text-xs text-gray-400">
                by Vulnerability Count
              </div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Asset Name</div>
              <div className="col-span-3">Count</div>
              <div className="col-span-3">Year</div>
            </div>

            {/* Data Rows */}
            {mockTop5VulnerableAssets.labels.map((asset, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Asset Name */}
                <div className="col-span-6 truncate">{asset}</div>

                {/* Count */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {mockTop5VulnerableAssets.datasets[0].data[idx]}
                </div>

                {/* Year */}
                <div className="col-span-3 text-gray-300">
                  {mockTop5VulnerableAssets.years
                    ? mockTop5VulnerableAssets.years[idx]
                    : 2025 - idx}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 High Value Assets */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Top 5 High Value Assets
              </div>
              <div className="text-xs text-gray-400">by Importance Score</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Asset Name</div>
              <div className="col-span-3">Score</div>
              <div className="col-span-3">Year</div>
            </div>

            {/* Data Rows */}
            {mockTop5HighValueAssets.labels.map((asset, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Asset Name */}
                <div className="col-span-6 truncate">{asset}</div>

                {/* Score */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {mockTop5HighValueAssets.datasets[0].data[idx]}
                </div>

                {/* Year */}
                <div className="col-span-3 text-gray-300">
                  {mockTop5HighValueAssets.years
                    ? mockTop5HighValueAssets.years[idx]
                    : 2025 - idx}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Open Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Top 5 Open Vulnerabilities
              </div>
              <div className="text-xs text-gray-400">by Severity</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {/* Data Rows */}
            {mockTop5OpenVulnerabilities.labels.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Vulnerability ID */}
                <div className="col-span-6 truncate">{vuln}</div>

                {/* Severity */}
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {mockTop5OpenVulnerabilities.datasets[0].data[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Closed Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Top 5 Closed Vulnerabilities
              </div>
              <div className="text-xs text-gray-400">by Severity</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {/* Data Rows */}
            {mockTop5ClosedVulnerabilities.labels.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {mockTop5ClosedVulnerabilities.datasets[0].data[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Unique Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Top 5 Unique Vulnerabilities
              </div>
              <div className="text-xs text-gray-400">by Occurrences</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Occurrences</div>
            </div>

            {/* Data Rows */}
            {mockTop5UniqueVulnerabilities.labels.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {mockTop5UniqueVulnerabilities.datasets[0].data[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161e3e] p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Critical Vulnerabilities
          </h2>
          <div className="h-64">
            <Doughnut
              data={mockCriticalVulnerabilities}
              options={doughnutOptions}
            />
          </div>
        </div>
        <div className="bg-[#161e3e] p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">
            High Vulnerabilities
          </h2>
          <div className="h-64">
            <Doughnut
              data={mockHighVulnerabilities}
              options={doughnutOptions}
            />
          </div>
        </div>
        <div className="bg-[#161e3e] p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">
            SLA Breached Vulnerabilities Count
          </h2>
          <div className="h-64">
            <Doughnut data={mockSLABreachedCount} options={doughnutOptions} />
          </div>
        </div>
        <div className="bg-[#161e3e] p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Exception Vulnerabilities Count
          </h2>
          <div className="h-64">
            <Doughnut data={mockExceptionCount} options={doughnutOptions} />
          </div>
        </div>
        {/* Breach Vulnerabilities List */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Breach Vulnerabilities List
              </div>
              <div className="text-xs text-gray-400">by Severity</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {mockBreachVulnerabilities.labels.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {mockBreachVulnerabilities.datasets[0].data[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exception Vulnerabilities List */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Exception Vulnerabilities List
              </div>
              <div className="text-xs text-gray-400">by Severity</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Severity</div>
            </div>

            {mockExceptionVulnerabilities.labels.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {mockExceptionVulnerabilities.datasets[0].data[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Exploitable Vulnerabilities */}
        <div className="bg-[#161e3e] border mb-10 border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Top 5 Exploitable Vulnerabilities
              </div>
              <div className="text-xs text-gray-400">
                by Exploitability Score
              </div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm">
            <div className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Vulnerability ID</div>
              <div className="col-span-3 text-right">Score</div>
            </div>

            {mockTop5ExploitableVulnerabilities.labels.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {mockTop5ExploitableVulnerabilities.datasets[0].data[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
