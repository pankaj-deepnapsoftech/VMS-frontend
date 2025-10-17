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

const metCount = 30;
const notMetCount = 20;
const totalCount = metCount + notMetCount;



const options = {
  plugins: {
    legend: {
      display: false, // Hide legend if you’re showing counts below
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.formattedValue}`,
      },
    },
  },
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

const Dashboard = () => {
  const { token, tenant, selectedYear } = useAuthContext();
  const {
    tenthChart,
    topFiveRisk,
    elaventhChart,
    topFiveinfraAssetCount,
    topHighValue,
    twelfthChart,
    TharteenthChart,
    topOpenVulnerabilities,
    fourteenthChart,
    topClosedVulnerabilities,
    fifthteenthChart,
    topUniqueVulnerabilities,
    SixteenthChart,
    creticalHighVulnrable,
    ninteenthChart,
    exceptionVulnerabilities,
    seventeenthChart,
    eightteenthChart,
    breachVulnerableList,
    slaBreached
  } = useTVMCardsContext();



  const combinedVulnerabilities = (data) => {
    return {
      labels: ["Critical", "High"],
      datasets: [
        {
          label: "Open Vulnerabilities",
          data: [data.High, data.Critical],
          backgroundColor: ["#3b82f6", "#ef4444"],
          borderColor: "#1f2937",
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    };
  };

  const SLABreached =(data) => { 
    return {
  labels: ["Met", "Not Met"],
  datasets: [
    {
      label: "SLA Breached",
      data: [data.MET, data.NOT_MET],
      backgroundColor: ["#22c55e", "#ef4444"], // green & red
      borderColor: ["#1a1a1a"],
      borderWidth: 2,
      cutout: "75%", // makes the hole in the middle
    },
  ],
}};

  useEffect(() => {
    if (token) {
      tenthChart(tenant, selectedYear);
      elaventhChart(tenant, selectedYear);
      twelfthChart(tenant, selectedYear);
      TharteenthChart(tenant, selectedYear);
      fourteenthChart(tenant, selectedYear);
      fifthteenthChart(tenant, selectedYear);
      SixteenthChart(tenant, selectedYear);
      ninteenthChart(tenant, selectedYear);
      seventeenthChart(tenant, selectedYear);
      eightteenthChart(tenant, selectedYear);
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
                data={combinedVulnerabilities(creticalHighVulnrable)}
                options={doughnutOptions}
              />
              {/* Center total label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-3xl font-bold">
                  {creticalHighVulnrable.Critical + creticalHighVulnrable.High}
                </p>
              </div>
            </div>

            {/* Labels below chart */}
            <div className="flex items-center justify-center gap-8 mt-6 text-white">
              <div className="flex items-center text-lg font-medium">
                <span className="inline-block w-4 h-4 bg-[#ef4444] rounded-full mr-2"></span>
                Critical:{" "}
                <span className="font-semibold ml-1">
                  {creticalHighVulnrable.Critical}
                </span>
              </div>
              <div className="flex items-center text-lg font-medium">
                <span className="inline-block w-4 h-4 bg-[#3b82f6] rounded-full mr-2"></span>
                High:{" "}
                <span className="font-semibold ml-1">
                  {creticalHighVulnrable.High}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161e3e] p-6 rounded-lg shadow-xl text-white">
          <h2 className="text-xl font-semibold mb-4">
            SLA Breached Vulnerabilities
          </h2>

          <div className="relative h-64 w-64 mx-auto">
            <Doughnut data={SLABreached(slaBreached)} options={options} />

            {/* Center Text (Total Count) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{slaBreached.MET + slaBreached.NOT_MET}</span>
            </div>
          </div>

          {/* Counts below chart */}
          <div className="flex justify-around mt-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span>Met: {slaBreached.MET}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span>Not Met: {slaBreached.NOT_MET}</span>
            </div>
          </div>
        </div>

        {/* Breach Vulnerabilities List */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Breach Vulnerabilities List
              </div>
              <div className="text-xs text-gray-400">by VRS</div>
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

            {breachVulnerableList?.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln?.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln?.VRS}
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

            {exceptionVulnerabilities?.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.severity}
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

            {exceptionVulnerabilities?.map((vuln, idx) => (
              <div
                key={idx}
                className="grid grid-cols-9 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-gray-800 transition-colors"
              >
                <div className="col-span-6 truncate">{vuln.name}</div>
                <div className="col-span-3 text-right font-semibold text-gray-200">
                  {vuln.VRS}
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
