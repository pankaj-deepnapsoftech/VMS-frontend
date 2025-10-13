import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
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
import { useAuthContext, useDataContext, useTVMCardsContext } from "../context";
import {
  CardsData,
  firstChartDatady,
  SecondChartDatady,
} from "@/constants/dynomic.data";
import SecurendDashboardCards from "./ThreeCards";

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

const InventoryData = [
  { label: "App assessed", value: 30, color: "#EF4444" },
  { label: "IPs assessed", value: 25, color: "#22C55E" },
  { label: "App not assessed", value: 45, color: "#F97316" },
  { label: "IPs not assessed", value: 8, color: "#3B82F6" },
];

const DashboardCards = () => {
  const { token } = useAuthContext();
  const { tvmCardsData, loading } = useTVMCardsContext();
  const {
    GetFirstChart,
    firstChartData,
    GetSecondChart,
    secondChartData,
    GetFourthChart,
    fourthChartData,
    ninthChartData,
    GetNinthChart,
  } = useDataContext();

  // usestats
  const [tenant, setTenant] = useState("");
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const totall = InventoryData.reduce((sum, item) => sum + item.value, 0);

  // Doughnut Chart Data
  const doughnutData = {
    labels: firstChartDatady(firstChartData).map((item) => item.label),
    datasets: [
      {
        data: firstChartDatady(firstChartData).map((item) => item.value),
        backgroundColor: firstChartDatady(firstChartData).map(
          (item) => item.color
        ),
        borderWidth: 0,
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
        max: tvmCardsData.totalVulnerabilities + 2,
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
      label: "Critical Vulnerable Items",
      value: 85,
      color: "bg-red-500",
    },
    {
      label: "High Vulnerable Items",
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
    { name: "ApiServer", june: 0, trend: "/Icons/SVG2.png" },
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
  const navigate = useNavigate();

  const maxY = 16;

  useEffect(() => {
    if (token) {
      GetFirstChart(tenant);
      GetFourthChart(tenant);
      GetNinthChart(tenant);
    }
  }, [token, tenant]);

  useEffect(() => {
    if (token) {
      GetSecondChart(tenant, selectedYear);
    }
  }, [token, tenant, selectedYear]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTenant(params.get("tenant") || "");
  }, [location.search]);

  return (
    <div className="w-full px-4 sm:px-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {CardsData(tvmCardsData).map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.url)}
                className="bg-[#161e3e] rounded-xl px-4 mt-10 py-4 shadow-md border border-gray-800 hover:shadow-lg transition-shadow flex flex-col items-start"
              >
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <div className="w-8 h-8 flex items-center justify-center rounded-md">
                    <img src={card.icon} alt={card.title} className="w-7 h-7" />
                  </div>
                  <p
                    className="text-sm font-medium whitespace-nowrap max-sm:truncate overflow-hidden min-w-0"
                    style={{ color: card.color }}
                    title={card.title}
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
            <button className="text-gray-400 hover:text-gray-200 text-sm">
              •••
            </button>
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
              <p className="text-white text-lg font-bold">
                {firstChartData?.total}
              </p>
              <p className="text-gray-400 text-xs">Total</p>
            </div>
          </div>

          {/* Legend with Counts */}
          <div className="grid grid-cols-2 gap-y-2 mt-3">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-2 pl-4 sm:pl-6">
              {firstChartDatady(firstChartData)
                .slice(0, 2)
                .map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <p className="text-white text-xs">
                      {item.label} {" "}
                      <span className="text-gray-400">{item.value ?? 0}</span>
                    </p>
                  </div>
                ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start gap-2">
              {firstChartDatady(firstChartData)
                .slice(2, 4)
                .map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <p className="text-white text-xs">
                      {item.label} {" "}
                      <span className="text-gray-400">{item.value ?? 0}</span>
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
              <select
                className="bg-[#0E1430] text-gray-300 text-sm px-2 sm:px-3 py-1 rounded-lg border border-gray-700 focus:outline-none"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                <option value={currentYear}>{currentYear} </option>
                <option value={currentYear - 1}>{currentYear - 1}</option>
                <option value={currentYear - 2}>{currentYear - 2}</option>
              </select>

              <button className="text-gray-400 hover:text-gray-200 text-sm">
                •••
              </button>
            </div>
          </div>

          {/* Line Chart Container */}
          <div className="w-full h-[150px] md:h-[160px] overflow-hidden">
            <Line
              data={SecondChartDatady(secondChartData)}
              options={{
                ...lineOptions,
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
            {SecondChartDatady(secondChartData).datasets.map((ds, idx) => (
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
        {/* Exploitability (matches Inventory Status) */}
        <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 w-full md:w-[360px] lg:flex-1 h-auto shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-base font-semibold">
              Exploitability
            </h2>
            <button className="text-gray-400 hover:text-gray-200 text-sm">
              •••
            </button>
          </div>

          {/* Doughnut Chart */}
          {(() => {
            // Normalize data into two categories
            const normalizeData = (raw = []) => {
              if (raw.length === 2) {
                const a = raw[0];
                const b = raw[1];
                const aIsExploit = /exploit/i.test(a.label || "");
                const bIsExploit = /exploit/i.test(b.label || "");
                if (aIsExploit && !bIsExploit) return [a, b];
                if (bIsExploit && !aIsExploit) return [b, a];
                return [a, b];
              }

              // If more than two items, sum values
              let exploit = 0;
              let notExploit = 0;
              raw.forEach((item) => {
                const label = (item.label || "").toLowerCase();
                const val = Number(item.value || 0);
                if (label.includes("exploit")) exploit += val;
                else notExploit += val;
              });

              if (exploit === 0 && raw.length > 0) {
                exploit = Number(raw[0].value || 0);
                notExploit = raw
                  .slice(1)
                  .reduce((sum, item) => sum + Number(item.value || 0), 0);
              }

              return [
                { label: "Exploitability", value: exploit },
                { label: "Not Exploitability", value: notExploit },
              ];
            };

            const chartDataArray = normalizeData(data || []);
            const chartData = {
              labels: chartDataArray.map((i) => i.label),
              datasets: [
                {
                  data: chartDataArray.map((i) => i.value),
                  backgroundColor: ["#EF4444", "#22C55E"], // Red, Green
                  borderWidth: 0,
                },
              ],
            };

            const total = chartDataArray.reduce(
              (sum, i) => sum + (i.value || 0),
              0
            );

            return (
              <>
                {/* Doughnut */}
                <div className="relative flex justify-center items-center h-[200px] sm:h-[240px]">
                  <Doughnut
                    data={chartData}
                    options={{
                      cutout: "70%",
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false },
                      },
                    }}
                  />

                  {/* Center Total */}
                  <div className="absolute flex flex-col items-center">
                    <p className="text-white text-lg font-bold">{total}</p>
                    <p className="text-gray-400 text-xs">Total</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-8 mt-3">
                  {chartDataArray.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mt-0.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: index === 0 ? "#EF4444" : "#22C55E",
                        }}
                      ></span>
                      <p className="text-white text-xs">
                        {item.label}{" "}
                        <span className="text-gray-400">{item.value}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* Inventory Status */}
        <div className="bg-[#161e3e] border border-gray-800 rounded-xl p-4 w-full md:w-[360px] lg:flex-1 h-auto shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-base font-semibold">
              Inventory Status
            </h2>
            <button className="text-gray-400 hover:text-gray-200 text-sm">
              •••
            </button>
          </div>

          {/* Doughnut Chart */}
          <div className="relative flex justify-center items-center h-[200px] sm:h-[240px]">
            <Doughnut
              data={
                fourthChartData
                  ? {
                      labels: Object.keys(fourthChartData || {}),
                      datasets: [
                        {
                          data: Object.values(fourthChartData || {}),
                          backgroundColor: ["#EF4444", "#22C55E"],
                          borderWidth: 0,
                        },
                      ],
                    }
                  : {
                      labels: InventoryData.map((item) => item.label),
                      datasets: [
                        {
                          data: InventoryData.map((item) => item.value),
                          backgroundColor: InventoryData.map(
                            (item) => item.color
                          ),
                          borderWidth: 0,
                        },
                      ],
                    }
              }
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
              <p className="text-white text-lg font-bold">
                {fourthChartData
                  ? Object.values(fourthChartData).reduce(
                      (sum, val) => sum + (val || 0),
                      0
                    )
                  : totall}
              </p>
              <p className="text-gray-400 text-xs">Total</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-3">
            {fourthChartData
              ? Object.entries(fourthChartData).map(([label, value], idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-0.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: idx === 0 ? "#EF4444" : "#22C55E",
                      }}
                    ></span>
                    <p className="text-white text-xs">
                      {label} <span className="text-gray-400">{value}</span>
                    </p>
                  </div>
                ))
              : InventoryData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mt-0.5">
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

        {/* Critical / High Vulnerable Items */}
        <div className="bg-[#161e3e] border border-gray-800 text-white p-6 rounded-xl h-auto w-full lg:flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-lg font-semibold mb-1">
                Critical / High Vulnerable Items
              </div>
              <div className="text-xs text-gray-400">by Assignment Group</div>
            </div>
            <button className="text-gray-400 text-sm hover:text-gray-200">
              •••
            </button>
          </div>

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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Vulnerable Items by Risk Rating - Full Data
            </h2>
            <button className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
              •••
            </button>
          </div>
          {secondChartData
            ? (() => {
                // Calculate total sum for percentage calculation
                const criticalSum = secondChartData.Critical
                  ? secondChartData.Critical.reduce(
                      (sum, val) => sum + (val || 0),
                      0
                    )
                  : 0;
                const highSum = secondChartData.High
                  ? secondChartData.High.reduce(
                      (sum, val) => sum + (val || 0),
                      0
                    )
                  : 0;
                const mediumSum = secondChartData.Medium
                  ? secondChartData.Medium.reduce(
                      (sum, val) => sum + (val || 0),
                      0
                    )
                  : 0;
                const lowSum = secondChartData.Low
                  ? secondChartData.Low.reduce(
                      (sum, val) => sum + (val || 0),
                      0
                    )
                  : 0;
                const informationalSum = secondChartData.Informational
                  ? secondChartData.Informational.reduce(
                      (sum, val) => sum + (val || 0),
                      0
                    )
                  : 0;

                const totalSum =
                  criticalSum + highSum + mediumSum + lowSum + informationalSum;

                // Calculate percentages
                const criticalPercent =
                  totalSum > 0 ? Math.round((criticalSum / totalSum) * 100) : 0;
                const highPercent =
                  totalSum > 0 ? Math.round((highSum / totalSum) * 100) : 0;
                const mediumPercent =
                  totalSum > 0 ? Math.round((mediumSum / totalSum) * 100) : 0;
                const lowPercent =
                  totalSum > 0 ? Math.round((lowSum / totalSum) * 100) : 0;

                return (
                  <>
                    {/* Critical Vulnerabilities */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            Critical Vulnerable Items
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {criticalPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1B2B45] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${criticalPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* High Vulnerabilities */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">High Vulnerable Items</span>
                        </div>
                        <span className="text-sm font-medium">
                          {highPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1B2B45] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${highPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Medium Vulnerabilities */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Medium Priority Items</span>
                        </div>
                        <span className="text-sm font-medium">
                          {mediumPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1B2B45] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${mediumPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Low Vulnerabilities */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            Low Priority Completed
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {lowPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-[#1B2B45] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${lowPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                );
              })()
            : // Fallback to original data if API data is not available
              vulnerableData.map((item, index) => (
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Vulnerable Items by Age</h2>
            <button className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
              •••
            </button>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Overdue Critical / High Vulnerable Items
            </h2>
            <button className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
              •••
            </button>
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
        <div className="bg-[#161e3e] rounded-xl p-4 w-full text-white shadow-lg border mb-20 border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Open and Closed Vulnerable Items
            </h2>
            <button className="text-gray-400 text-sm hover:text-gray-200 transition-colors">
              •••
            </button>
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
                {ninthChartData?.label?.map((month, i) => {
                  const openVal = (ninthChartData?.Open || [])[i];
                  const closedVal = (ninthChartData?.Closed || [])[i];
                  const exceptionVal = (ninthChartData?.Exception || [])[i];
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

        <SecurendDashboardCards />
      </div>
    </div>
  );
};

export default DashboardCards;
