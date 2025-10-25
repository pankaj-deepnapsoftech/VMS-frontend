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
  const { token, selectedYear, tenant } = useAuthContext();
  const { tvmCardsData, loading, refreshTVMCardsData } = useTVMCardsContext();

  const options = {
    plugins: {
      legend: {
        display: false,
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

  const { creticalHighVulnrable, slaBreached } = useTVMCardsContext();

  const {
    GetFirstChart,
    firstChartData,
    GetSecondChart,
    secondChartData,
    GetFourthChart,
    fourthChartData,
    ninthChartData,
    GetNinthChart,
    GetthirdChart,
    thirdChartData,
    GetFiveChart,
    itemsByAge,
  } = useDataContext();

  const [lineValue, setLinevalue] = useState(0);

  const handleChartLine = () => {
    const data = [
      ...secondChartData.Critical,
      ...secondChartData.High,
      ...secondChartData.Informational,
      ...secondChartData.Low,
      ...secondChartData.Medium,
    ];
    const maxvalue = Math.max(...data);

    setLinevalue(maxvalue + 2);
  };

  // usestats

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
        max: lineValue,
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#9CA3AF", stepSize: 15 },
      },
    },
  };

  const [greenData, setGreenData] = useState([]);
  const [yellowData, setYellowData] = useState([]);
  const [redData, setRedData] = useState([]);
  const [maxY, setMaxY] = useState(10); // default max height scale

  const categories = ["Critical", "High", "Medium", "Low"];

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      GetthirdChart(tenant, selectedYear);
      GetFourthChart(tenant, selectedYear);
      GetSecondChart(tenant, selectedYear);
      refreshTVMCardsData(tenant, selectedYear);
      GetFirstChart(tenant, selectedYear);
      GetNinthChart(tenant, selectedYear);
      GetFiveChart(tenant, selectedYear);
    }
  }, [token, tenant, selectedYear]);

  useEffect(() => {
    if (itemsByAge) {
      const categories = ["Critical", "High", "Medium", "Low"];

      // Map API data dynamically into arrays
      const green = categories.map((cat) => {
        const match = itemsByAge.first?.find((item) => item.severity === cat);
        return match ? match.count : 0;
      });

      const yellow = categories.map((cat) => {
        const match = itemsByAge.second?.find((item) => item.severity === cat);
        return match ? match.count : 0;
      });

      const red = categories.map((cat) => {
        const match = itemsByAge.third?.find((item) => item.severity === cat);
        return match ? match.count : 0;
      });

      // Compute max value dynamically for bar scaling
      const maxVal = Math.max(...green, ...yellow, ...red, 10) + 2;

      // Update state
      setGreenData(green);
      setYellowData(yellow);
      setRedData(red);
      setMaxY(maxVal);
    }
  }, [itemsByAge]);

  useEffect(() => {
    if (secondChartData) {
      handleChartLine();
    }
  }, [secondChartData]);

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

  const SLABreached = (data) => {
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
    };
  };

  return (
    <div className="w-full px-4 sm:px-6">
      {/* Cards */}
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bg-[#161e3e] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl px-4 py-4 shadow-md border border-gray-800 animate-pulse"
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
                className="bg-[#161e3e] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl px-4 mt-10 py-4 shadow-md border border-gray-800  flex flex-col items-start"
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
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 w-full md:w-[360px] lg:w-[360px] h-auto shadow-md">
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
                      {item.label}{" "}
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
                      {item.label}{" "}
                      <span className="text-gray-400">{item.value ?? 0}</span>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Line Chart Card */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 flex-1 h-auto shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
            <h2 className="text-white text-base sm:text-lg font-semibold truncate">
              Vulnerable Items by Risk Rating
            </h2>
            <div className="flex items-center gap-2 flex-shrink-0">
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
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 w-full md:w-[360px] lg:flex-1 h-auto shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white text-base font-semibold">
              Exploitability
            </h2>
            <button className="text-gray-400 hover:text-gray-200 text-sm">
              •••
            </button>
          </div>

          {/* Doughnut Chart */}
          <div className="relative flex justify-center items-center h-[200px] sm:h-[240px]">
            {thirdChartData && thirdChartData.exploitable !== undefined ? (
              <Doughnut
                data={{
                  labels: ["Exploitability", "Not Exploitability"],
                  datasets: [
                    {
                      data: [
                        thirdChartData.exploitable || 0,
                        thirdChartData.not_exploitable || 0,
                      ],
                      backgroundColor: ["#EF4444", "#22C55E"],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  cutout: "70%",
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                  },
                }}
              />
            ) : (
              <p className="text-gray-400 text-sm">No data available</p>
            )}

            {/* Center Total */}
            <div className="absolute flex flex-col items-center">
              <p className="text-white text-lg font-bold">
                {thirdChartData
                  ? (thirdChartData.exploitable || 0) +
                    (thirdChartData.not_exploitable || 0)
                  : 0}
              </p>
              <p className="text-gray-400 text-xs">Total</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-3">
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
              <p className="text-white text-xs">
                Exploitability{" "}
                <span className="text-gray-400">
                  {thirdChartData?.exploitable || 0}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
              <p className="text-white text-xs">
                Not Exploitability{" "}
                <span className="text-gray-400">
                  {thirdChartData?.not_exploitable || 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-[#161e3e] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 w-full md:w-[360px] lg:flex-1 h-auto shadow-md">
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
                      {label === "businessApplication"
                        ? "Business Application"
                        : "Infrastructure IP"}{" "}
                      <span className="text-gray-400">{value}</span>
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

        {/* Card 2: Vulnerable Items by Age */}
        <div className="bg-[#161e3e] rounded-xl p-4 w-full md:w-[360px] lg:flex-1 text-white shadow-lg border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out">
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
      </div>
      {/* Third row  */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] mb-4 gap-6 mt-4 w-full">
        {/* === Open and Closed Vulnerable Items === */}
        <div className="bg-[#161e3e] rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white flex flex-col justify-between overflow-hidden">
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

            {/* Scrollable Chart Wrapper */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="relative flex justify-between items-end h-full z-10 px-2"
                style={{
                  width: "100%", // full width of parent, no scroll
                }}
              >
                {/* Dotted Grid Lines */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-dotted border-gray-600"
                    style={{ top: `${i * 36}px` }}
                  />
                ))}

                {/* Bars */}
                <div
                  className="flex justify-between items-end w-full"
                  style={{
                    gap: `${Math.max(
                      2,
                      8 - (ninthChartData?.label?.length || 12) / 2
                    )}px`, // auto adjust gap based on count
                  }}
                >
                  {ninthChartData?.label?.map((month, i) => {
                    const openVal = (ninthChartData?.Open || [])[i];
                    const closedVal = (ninthChartData?.Closed || [])[i];
                    const exceptionVal = (ninthChartData?.Exception || [])[i];

                    return (
                      <div
                        key={month}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="flex items-end space-x-[2px] sm:space-x-[3px]">
                          <div
                            className="w-2 sm:w-2.5 rounded-sm bg-red-500"
                            style={{ height: `${(openVal / 32) * 180}px` }}
                          />
                          <div
                            className="w-2 sm:w-2.5 rounded-sm bg-blue-500"
                            style={{ height: `${(closedVal / 32) * 180}px` }}
                          />
                          <div
                            className="w-2 sm:w-2.5 rounded-sm bg-green-400"
                            style={{ height: `${(exceptionVal / 32) * 180}px` }}
                          />
                        </div>
                        <div className="text-[8px] sm:text-[9px] text-gray-300 mt-1 rotate-[-35deg] origin-top whitespace-nowrap">
                          {month}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center text-[10px] sm:text-xs text-gray-400 gap-3 sm:space-x-4 mt-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" /> Open
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" /> Closed
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400" /> Exception
            </div>
          </div>
        </div>

        {/* === Critical / High Vulnerabilities === */}
        <div className="bg-[#161e3e] p-6 border border-gray-800 rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out flex flex-col items-center justify-between text-white">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Critical / High Vulnerabilities
          </h2>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <Doughnut
              data={combinedVulnerabilities(creticalHighVulnrable)}
              options={doughnutOptions}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-3xl font-bold">
                {creticalHighVulnrable.Critical + creticalHighVulnrable.High}
              </p>
            </div>
          </div>
          <div className="flex items-center text-xs justify-center gap-6 mt-4">
            <div className="flex items-center font-medium">
              <span className="inline-block w-3 h-3 bg-[#ef4444] rounded-full mr-2"></span>
              Critical: {creticalHighVulnrable.Critical}
            </div>
            <div className="flex items-center font-medium">
              <span className="inline-block w-3 h-3 bg-[#3b82f6] rounded-full mr-2"></span>
              High: {creticalHighVulnrable.High}
            </div>
          </div>
        </div>

        {/* === SLA Details === */}
        <div className="bg-[#161e3e] p-6 border border-gray-800 rounded-xl shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out flex flex-col items-center justify-between text-white">
          <h2 className="text-lg font-semibold mb-4 text-center">
            SLA Details
          </h2>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <Doughnut data={SLABreached(slaBreached)} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-3xl font-bold">
                {slaBreached.MET + slaBreached.NOT_MET}
              </p>
            </div>
          </div>
          <div className="flex items-center text-xs justify-center gap-6 mt-4">
            <div className="flex items-center font-medium">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Met: {slaBreached.MET}
            </div>
            <div className="flex items-center font-medium">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Not Met: {slaBreached.NOT_MET}
            </div>
          </div>
        </div>
      </div>

      <SecurendDashboardCards />
    </div>
  );
};

export default DashboardCards;
