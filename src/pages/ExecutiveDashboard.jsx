import { useEffect } from "react";
import { Line } from "react-chartjs-2";

import "react-circular-progressbar/dist/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import {
  useAuthContext,
  useExecutiveDashboardContext
} from "@/context";
import {
  assetData,
  FinancialExposure,
  RemidationWorkflowDynomic,
  summaryData,
  TopFiveRiskIndicator,
} from "@/constants/dynomic.data";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssetInventoryData, getAttackExposureDataData, getCardsData, getfinanceTrendChartData, getFinancialExposureData, getRemidationWorkflowData, getRiskTrendChartData } from "@/services/ExecutiveDashboard.service";
import CardsSkeletonLoading from "@/Skeletons/ExecutiveDashbord/Cards";
import LineChartSkeletonLoading from "@/Skeletons/ExecutiveDashbord/trendsChart";
import { AssackExposureSkeletonLoading, AssertInvertorySkeletonLoading, FinancialExposureSkeletonLoading, RemediationWorkflowSkeletonLoading } from "@/Skeletons/ExecutiveDashbord/thirdSection";


ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ExecutiveSummaryPage() {
  const { token, tenant, selectedYear } = useAuthContext();

// ==================== here is tenStack query code here ==========================
 const { data: dasboardData,isLoading:isDashboardCardLoading } = useQuery({
  queryKey:["ExecutiveDashboard-card",[selectedYear,tenant]],
  queryFn:()=>getCardsData({tenant,selectedYear}),
  enabled: !!tenant && !!token,
  placeholderData: keepPreviousData,
});

 const { data: riskTrendChart,isLoading:isRiskTrendChartLoading } = useQuery({
  queryKey:["ExecutiveDashboard-risk",[selectedYear,tenant]],
  queryFn:()=>getRiskTrendChartData({tenant,selectedYear}),
  enabled: !!tenant && !!token,
  placeholderData: keepPreviousData,
});

 const { data: financeTrendChart,isLoading:isFinanceTrendLoading } = useQuery({
  queryKey:["ExecutiveDashboard-finance-trend",[selectedYear,tenant]],
  queryFn:()=>getfinanceTrendChartData({tenant,selectedYear}),
  enabled: !!tenant && !!token,
  placeholderData: keepPreviousData,
});

 const { data: assetInventory,isLoading:isAssetInventoryLoading } = useQuery({
  queryKey:["ExecutiveDashboard-asset-inventory",[selectedYear]],
  queryFn:()=>getAssetInventoryData({selectedYear}),
  enabled: !!token,
  placeholderData: keepPreviousData,
});

 const { data: financialExposure,isLoading:isFinancialExposureLoading } = useQuery({
  queryKey:["ExecutiveDashboard-financial-Exposure",[selectedYear,tenant]],
  queryFn:()=>getFinancialExposureData({tenant,selectedYear}),
  enabled: !!tenant && !!token,
  placeholderData: keepPreviousData,
});

 const { data: remidationWorkflow,isLoading:isRemidationWorkflowLoading } = useQuery({
  queryKey:["ExecutiveDashboard-remidation-workflow",[selectedYear,tenant]],
  queryFn:()=>getRemidationWorkflowData({tenant,selectedYear}),
  enabled: !!tenant && !!token,
  placeholderData: keepPreviousData,
});


 const { data: attackExposureData,isLoading:isAttackExposureDataLoading} = useQuery({
  queryKey:["ExecutiveDashboard-attack-exposure",[selectedYear,tenant]],
  queryFn:()=>getAttackExposureDataData({tenant,selectedYear}),
  enabled: !!tenant && !!token,
  placeholderData: keepPreviousData,
});


  const {
    GetTopRiskIndicator,
    topFiveRiskIndicatorData,
    topFiveRisk,
    tenthChart,
    topHighValue,
    twelfthChart,
    exploitableVulnerabilities,
    twntythChart
  } = useExecutiveDashboardContext();


  useEffect(() => {
    if (token && tenant) {
      Promise.all([
      tenthChart(tenant, selectedYear),
      twelfthChart(tenant, selectedYear),
      twntythChart(tenant, selectedYear),
      GetTopRiskIndicator(tenant, selectedYear),
      ])
}

  }, [token, tenant, selectedYear]);

return (
  <div className="min-h-screen bg-background p-4 sm:p-6 font-sans">
    <div className="flex flex-col mb-10 gap-3 max-w-full xl:max-w-7xl mx-auto">
      {/* Summary Cards */}
      {isDashboardCardLoading ? <CardsSkeletonLoading /> :<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-2 gap-4">
        {summaryData(dasboardData).map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl bg-[#1C2543] p-5 text-white shadow-md border border-[#303A60] flex flex-col justify-center hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out h-[120px] sm:h-[130px] md:h-[140px]"
          >
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl backdrop-blur-md">
              <img
                src={item.icon}
                alt="icon"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>

            {/* TEXT SECTION */}
            <div className="flex flex-col justify-center h-full pr-16 sm:pr-20">
              <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium tracking-wide truncate">
                {item.title}
              </span>

              <div className="text-base sm:text-lg md:text-xl font-semibold mt-2 tracking-tight">
                {item.value}
              </div>

              <div
                className={`${item.trendColor} text-xs sm:text-sm mt-1 font-medium tracking-wide`}
              >
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>}

      {/* First Row – Trend Charts */}
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        {/* Risk Trend Chart */}
        <div className="bg-[#161d3d] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 flex-1 shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
            <h2 className="text-white text-base sm:text-lg font-semibold truncate">
              Risk Trend
            </h2>
            <button className="text-gray-400 hover:text-gray-200 text-sm">
              •••
            </button>
          </div>

          <div className="w-full h-[180px] sm:h-[220px]">
            {isRiskTrendChartLoading ? <LineChartSkeletonLoading /> : riskTrendChart &&  (
              <Line
                data={{
                  labels: Object.keys(riskTrendChart),
                  datasets: [
                    {
                      label: "Risk Index",
                      data: Object.keys(riskTrendChart).map((item) => {
                        const { score, total } = riskTrendChart[item];
                        // Avoid divide-by-zero and keep consistent data points
                        return total > 0 ? (score / total) * 10 : 0;
                      }),
                      borderColor: "#4F46E5",
                      backgroundColor: "rgba(79,70,229,0.2)",
                      tension: 0.4,
                      fill: true,
                      spanGaps: true, // 🔹 Ensures line connects over null/zero points
                      pointRadius: 4,
                      pointHoverRadius: 6,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: { color: "#9CA3AF" },
                      grid: { color: "rgba(255,255,255,0.05)" },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#9CA3AF" },
                      grid: { color: "rgba(255,255,255,0.05)" },
                    },
                  },
                }}
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-3 sm:gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#4F46E5" }}
              ></span>
              <p className="text-white text-xs sm:text-sm">Risk Index</p>
            </div>
          </div>
        </div>

        {/* Financial Exposure Trend Chart */}
        <div className="bg-[#161d3d] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 flex-1 shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
            <h2 className="text-white text-base sm:text-lg font-semibold truncate">
              Financial Exposure Trend
            </h2>
            <button className="text-gray-400 hover:text-gray-200 text-sm">
              •••
            </button>
          </div>

          <div className="w-full h-[180px] sm:h-[220px]">
            {isFinanceTrendLoading ? <LineChartSkeletonLoading /> : financeTrendChart && (
              <Line
                data={{
                  labels: Object.keys(financeTrendChart),
                  datasets: [
                    {
                      label: "Exposure ($M)",
                      data: Object.keys(financeTrendChart).map((item) =>
                        (financeTrendChart[item] / 1000000).toFixed(5)
                      ),
                      borderColor: "#22C55E",
                      backgroundColor: "rgba(34,197,94,0.2)",
                      tension: 0.4,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "#9CA3AF",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.05)",
                      },
                    },
                    y: {
                      ticks: {
                        color: "#9CA3AF",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.05)",
                      },
                    },
                  },
                }}
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-3 sm:gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#22C55E" }}
              ></span>
              <p className="text-white text-xs sm:text-sm">Exposure ($M)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Asset Inventory */}
       { isAssetInventoryLoading ? <AssertInvertorySkeletonLoading /> :  <div className="bg-[#161d3d] p-5 rounded-2xl hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white border border-gray-800 flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold tracking-wide text-white/90">
              Asset Inventory
            </h2>
            <button className="text-white/50 hover:text-white text-lg leading-none">
              ⋯
            </button>
          </div>

          {/* Circle */}
          <div className="flex justify-center items-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#8B5CF6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="282.6"
                  strokeDashoffset="0"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <p className="text-2xl font-bold">
                  {(assetInventory?.infrastructor?.totalCount?.count || 0) +
                    (assetInventory?.businessApplication?.totalCount?.count ||
                      0)}
                </p>
                <p className="text-[9px] text-white/60 tracking-wide">
                  Total Assets
                </p>
              </div>
            </div>
          </div>

          {/* Asset Details */}
          <div className="space-y-3 text-sm mt-auto">
            {assetData(assetInventory).map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-white/80 hover:text-white transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                  ></span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right leading-tight">
                  <span className="block font-semibold text-base">
                    {item.total}
                  </span>
                  <span className="text-red-400 text-[11px] font-medium">
                    {item.critical} critical
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Financial Exposure */}
        {isFinancialExposureLoading ? <FinancialExposureSkeletonLoading/> : <div className="bg-[#161d3d] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out p-5 rounded-2xl text-white border border-gray-800 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-semibold">Financial Exposure</h2>
            <button className="text-white/50 hover:text-white text-lg leading-none">
              ⋯
            </button>
          </div>

          <div className="flex items-end gap-4 mb-4">
            <div>
              <p className="text-[20px] font-bold text-[#FF5C5C]">
                {financialExposure
                  ? `${(
                    Object.keys(financialExposure)
                      .map((item) => financialExposure[item])
                      .reduce((i, r) => i + r, 0) / 1000000
                  ).toFixed(5)} M`
                  : "0"}
              </p>
              <p className="text-xs text-white/70">Value at Risk (VaR)</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 mt-auto">
            {FinancialExposure(financialExposure).map((bar, idx) => (
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
        </div>}

        {/* Remediation Workflow */}
        {isRemidationWorkflowLoading ? <RemediationWorkflowSkeletonLoading/>: <div className="bg-[#161d3d] p-5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-2xl text-white border border-gray-800 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-semibold">Remediation Workflow</h2>
            <button className="text-white/50 hover:text-white text-lg leading-none">
              ⋯
            </button>
          </div>

          <div className="flex items-end gap-6 mb-5">
            <div>
              <p className="text-[20px] font-bold">
                {remidationWorkflow?.total || "0"}
              </p>
              <p className="text-xs text-white/70">Total Tasks</p>
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#27D27D]">
                {dasboardData?.mttr || "0"} days
              </p>
              <p className="text-xs text-white/70">MTTR</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 mt-auto">
            {RemidationWorkflowDynomic(remidationWorkflow).map((bar, idx) => (
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
        </div>}

        {/* Attack Exposure */}
        {isAttackExposureDataLoading ? <AssackExposureSkeletonLoading/> : <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-5 rounded-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold leading-tight">
                Attack Exposure
              </h2>
              <div className="text-xs text-gray-400">by Threat Type</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

          {/* Static Data Table */}
          <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm mt-2">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
              <div className="col-span-6">Threat Type</div>
              <div className="col-span-3 text-right">Exposure</div>
            </div>

            {/* Static Data Rows */}
            {attackExposureData &&
              Object.keys(attackExposureData).map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-[#1a2748] transition-colors"
                >
                  <div className="col-span-6 truncate">{item}</div>
                  <div className="col-span-3 text-right font-semibold text-gray-200">
                    {attackExposureData[item]}
                  </div>
                </div>
              ))}
          </div>
        </div>}
      </div>

      {/* Third row  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top 5 Risks */}
        <div className="bg-[#161e3e] border hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
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
                <div className="col-span-6 truncate">
                  {label?.title || "-"}
                </div>

                {/* Score */}
                <div className="col-span-3 font-semibold text-gray-200">
                  {label?.RAS || "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 High Value Assets */}
        <div className="bg-[#161e3e] border hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                Top 5 High Value Assets
              </h2>
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

        {/* Top 5 Exploitable Vulnerabilities */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white p-6 rounded-xl h-auto w-full lg:flex-1">
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

            {exploitableVulnerabilities?.map((vuln, idx) => (
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

      {/* Fourth row */}
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        {/* Third Row */}
        <div className="bg-[#161d3d] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out p-4 sm:p-6 rounded-2xl w-full text-white font-sans overflow-x-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold">
              Top 5 Risk Indicators
            </h2>
            <button className="text-white/50 hover:text-white text-lg sm:text-xl leading-none">
              ⋯
            </button>
          </div>

          <div className="space-y-3">
            {TopFiveRiskIndicator(topFiveRiskIndicatorData).map(
              (item, idx) => (
                <div
                  key={idx}
                  className="bg-[#242f49] rounded-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="mb-2 sm:mb-0 w-full sm:w-auto">
                    <p className="font-medium text-sm sm:text-base">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60">
                      Score:{" "}
                      <span className="text-white font-semibold">
                        {item.score}
                      </span>
                    </p>
                  </div>
                  <div className="text-right w-full sm:w-auto">
                    <span
                      className={`px-2 py-1 text-xs rounded ${item.level === "Critical"
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
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
