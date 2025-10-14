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



// Mock data for all charts with consistent dark theme colors
const chartColors = {
  primary: "rgba(255, 99, 132, 0.8)", // Red for critical
  secondary: "rgba(54, 162, 235, 0.8)", // Blue for assets
  tertiary: "rgba(75, 192, 192, 0.8)", // Teal for high value
  quaternary: "rgba(153, 102, 255, 0.8)", // Purple for vulnerabilities
  quinary: "rgba(255, 159, 64, 0.8)", // Orange for closed/exploitable
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

const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    const { width } = chart;
    const { ctx } = chart;
    const dataset = chart.data.datasets[0].data;
    const total = dataset.reduce((a, b) => a + b, 0);
    ctx.save();
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total, width / 2, chart._metasets[0].data[0].y);
  },
};
const combinedVulnerabilities = {
  labels: ["Critical", "High"],
  datasets: [
    {
      label: "Open Vulnerabilities",
      data: [12, 8],
      backgroundColor: ["#ef4444", "#3b82f6"],
      borderColor: "#1f2937",
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1f2937",
      titleColor: "#fff",
      bodyColor: "#d1d5db",
      borderColor: "#374151",
      borderWidth: 1,
    },
  },
};

const critical = combinedVulnerabilities.datasets[0].data[0];
const high = combinedVulnerabilities.datasets[0].data[1];
const total = critical + high;

const Dashboard = () => {
  const { token, tenant, selectedYear } = useAuthContext();
  const { tenthChart, topFiveRisk,elaventhChart,topFiveinfraAssetCount,topHighValue,
        twelfthChart, TharteenthChart,topOpenVulnerabilities, fourteenthChart, topClosedVulnerabilities,fifthteenthChart,
        topUniqueVulnerabilities } = useTVMCardsContext();


  useEffect(() => {
    if (token) {
      tenthChart(tenant, selectedYear);
      elaventhChart(tenant, selectedYear);
      twelfthChart(tenant, selectedYear);
      TharteenthChart(tenant, selectedYear);
      fourteenthChart(tenant, selectedYear);
      fifthteenthChart(tenant, selectedYear);
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
                Top 5 Vulnerable Infrastructor Assets
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
            </div>

            {/* Data Rows */}
            {topFiveinfraAssetCount?.map((asset, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Asset Name */}
                <div className="col-span-6 truncate">{asset.name}</div>

                {/* Count */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {asset.count}
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
            </div>

            {/* Data Rows */}
            {topHighValue.map((asset, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Asset Name */}
                <div className="col-span-6 truncate">{asset?.name}</div>

                {/* Score */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {asset?.count}
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
              <div className="text-xs text-gray-400">by VRS</div>
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
            {topOpenVulnerabilities.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                {/* Vulnerability ID */}
                <div className="col-span-6 truncate">{vuln.name}</div>

                {/* Severity */}
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.count}
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
              <div className="text-xs text-gray-400">by VRS</div>
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
            {topClosedVulnerabilities.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln?.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln?.count}
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
            {topUniqueVulnerabilities.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#161e3e]  p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-white text-center">
            Critical / High Vulnerabilities
          </h2>

          <div className="flex flex-col items-center justify-center">
            {/* Chart */}
            <div className="relative w-64 h-64">
              <Doughnut
                data={combinedVulnerabilities}
                options={doughnutOptions}
              />
              {/* Center total label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-3xl font-bold">{total}</p>
              </div>
            </div>

            {/* Labels below chart */}
            <div className="flex items-center justify-center gap-8 mt-6 text-white">
              <div className="flex items-center text-lg font-medium">
                <span className="inline-block w-4 h-4 bg-[#ef4444] rounded-full mr-2"></span>
                Critical: <span className="font-semibold ml-1">{critical}</span>
              </div>
              <div className="flex items-center text-lg font-medium">
                <span className="inline-block w-4 h-4 bg-[#3b82f6] rounded-full mr-2"></span>
                High: <span className="font-semibold ml-1">{high}</span>
              </div>
            </div>
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
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full mb-10 lg:flex-1">
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
