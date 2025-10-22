/* eslint-disable no-constant-binary-expression */
import { useEffect } from "react";
import { Line } from "react-chartjs-2";


import "react-circular-progressbar/dist/styles.css";
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
import {
  assetData,
  FinancialExposure,
  summaryData,
  TopFiveRiskIndicator,
} from "@/constants/dynomic.data";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ExecutiveSummaryPage() {
  const { token, tenant, selectedYear } = useAuthContext();
  const {
    GetRiskData,
    dasboardData,
    loading,
    GetAssetInventory,
    assetInventory,
    GetFinancialExposure,
    financialExposure,
    GetTopRiskIndicator,
    topFiveRiskIndicatorData,
    GetRiskTrend,
    riskTrendChart,
    GetFinanceExposureTrend,
    financeTrendChart
  } = useReportContext();


  useEffect(() => {
    if (token && tenant) {
      GetRiskData(tenant, selectedYear);
      GetFinancialExposure(tenant, selectedYear);
      GetRiskTrend(tenant, selectedYear);
      GetAssetInventory(selectedYear);
    }

    if (token) {
      GetTopRiskIndicator(tenant, selectedYear);
      GetFinanceExposureTrend(tenant, selectedYear);
    }
  }, [token, tenant, selectedYear]);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-sans">
      <div className="flex flex-col mb-10 gap-3 max-w-full xl:max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {summaryData(dasboardData).map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#1C2543] p-5 text-white shadow-md border border-[#303A60] flex flex-col justify-center hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out h-[120px] sm:h-[130px] md:h-[140px]"
            >
              {/* ICON — always stays fixed, vertically centered */}
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
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap gap-4 w-full">
          {/* Asset Inventory */}
          <div className="bg-gradient-to-b from-[#1A1F3F] to-[#141833] p-5 rounded-2xl text-white border border-[#2C3564] shadow-[0_4px_15px_rgba(0,0,0,0.3)] w-full sm:w-[48%] xl:w-[23.5%] ">
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
                    className="animate-[dash_2s_ease-in-out]"
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
          </div>

          {/* Financial Exposure */}
          <div className="bg-[#161d3d] p-4 border border-gray-800 rounded-xl text-white shadow-lg font-sans flex flex-col w-full sm:w-[48%] xl:w-[23.5%]">
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
                <p className="text-[20px] font-bold text-[#FF5C5C]">
                  {financialExposure
                    ? `${(
                      Object.keys(financialExposure)
                        .map((item) => financialExposure[item])
                        .reduce((i, r) => i + r, 0) / 1000000
                    ).toFixed(5)} M` || "0"
                    : "0"}
                </p>
                <p className="text-xs text-white/70">Value at Risk (VaR)</p>
              </div>
            </div>

            {/* Bars */}
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
          </div>

          {/* Remediation Workflow */}
          <div className="bg-[#161d3d] p-4 border border-gray-800 rounded-xl text-white shadow-lg font-sans flex flex-col w-full sm:w-[48%] xl:w-[23.5%]">
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
        </div>

        {/* third row */}
        <div className="flex flex-col gap-4 w-full">
          {/* Third Row */}
          <div className="bg-[#161d3d] border border-gray-800 p-4 sm:p-6 rounded-2xl w-full text-white font-sans overflow-x-auto">
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


        {/* Fourth Row – Trend Charts */}
        <div className="flex flex-col xl:flex-row gap-4 w-full mt-6">
          {/* Risk Trend Chart */}
          <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 flex-1 shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
              <h2 className="text-white text-base sm:text-lg font-semibold truncate">
                Risk Trend
              </h2>
              <button className="text-gray-400 hover:text-gray-200 text-sm">
                •••
              </button>
            </div>

            <div className="w-full h-[180px] sm:h-[220px]">
              {riskTrendChart && <Line
                data={{
                  labels: Object.keys(riskTrendChart) || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Risk Index",
                      data: Object.keys(riskTrendChart).map((item) => (riskTrendChart[item].score / riskTrendChart[item].total) * 10) || [0, 0, 0, 0, 0, 0],
                      borderColor: "#4F46E5",
                      backgroundColor: "rgba(79,70,229,0.2)",
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
              />}
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
          <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 flex-1 shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
              <h2 className="text-white text-base sm:text-lg font-semibold truncate">
                Financial Exposure Trend
              </h2>
              <button className="text-gray-400 hover:text-gray-200 text-sm">
                •••
              </button>
            </div>

            <div className="w-full h-[180px] sm:h-[220px]">
              {financeTrendChart && <Line
                data={{
                  labels: Object.keys(financeTrendChart),
                  datasets: [
                    {
                      label: "Exposure ($M)",
                      data: Object.keys(financeTrendChart).map((item) => (financeTrendChart[item] / 1000000).toFixed(5)),
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
              />}
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

      </div>
    </div>
  );
}
