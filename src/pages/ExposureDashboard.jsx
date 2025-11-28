/* eslint-disable react/prop-types */
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- SVG Icon ---
const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-gray-400 hover:text-white"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

// --- Summary cards ---
const summaryData = [
  { title: "Assets Discovered Last 30 Days", value: "2.99K" },
  { title: "Assets with at Least One Port Open", value: "936" },
  { title: "Assets with No Port Open", value: "42" },
  { title: "Web Applications without Firewall", value: "708" },
];

// --- Chart Data Sets ---
const techData = [
  { name: "Cloudflare", value: 347, displayValue: "347" },
  { name: "HSTS", value: 198, displayValue: "198" },
  { name: "HTTP/3", value: 121, displayValue: "121" },
  { name: "YouTube", value: 13, displayValue: "13" },
  { name: "Cloudflare Bot Management", value: 13, displayValue: "13" },
];
const techColors = ["#E91E63", "#9C27B0", "#3F51B5", "#03A9F4", "#009688"];

const dnsData = [
  { name: "SOA", value: 8270, displayValue: "8.27K" },
  { name: "AXFR", value: 8270, displayValue: "8.27K" },
  { name: "A", value: 8220, displayValue: "8.22K" },
  { name: "AAAA", value: 262, displayValue: "262" },
  { name: "NS", value: 240, displayValue: "240" },
];
const dnsColors = ["#9C27B0", "#B36BDE", "#C9A0F5", "#03A9F4", "#4CAF50"];

const webServerData = [
  { name: "Openresty", value: 9, displayValue: "9" },
  { name: "AkamaiGhost", value: 8, displayValue: "8" },
  { name: "Microsoft-HTTPAPI/2.0", value: 5, displayValue: "5" },
  { name: "Undefined", value: 4, displayValue: "4" },
  { name: "API-Gateway", value: 2, displayValue: "2" },
];
const webColors = ["#FF9800", "#FFB74D", "#FFC107", "#FFD54F", "#FFE082"];

const firewallData = [
  { name: "Amazon", value: 1, displayValue: "1" },
  { name: "Akamai", value: 20, displayValue: "20" },
  { name: "Cloudflare", value: 106, displayValue: "106" },
];
const firewallColors = ["#4CAF50", "#8BC34A", "#AED581"];

const cdnData = [
  { name: "Cloudfront", value: 1, displayValue: "1" },
  { name: "Google", value: 15, displayValue: "15" },
];
const cdnColors = ["#9E9E9E", "#BDBDBD"];

const tlsData = [
  { name: "DigiCert Inc", value: 181, displayValue: "181" },
  { name: "Let's Encrypt", value: 102, displayValue: "102" },
  { name: "Google Trust Services LLC", value: 22, displayValue: "22" },
  { name: "DigiCert, Inc.", value: 2, displayValue: "2" },
  { name: "56e94e...b8f0", value: 1, displayValue: "1" },
];
const tlsColors = ["#F44336", "#E91E63", "#FF4081", "#FF80AB", "#9C27B0"];

// --- MAIN DASHBOARD PAGE ---
export default function ExposureDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0e25] text-gray-100 p-6 font-sans pb-[70px]">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((card, i) => (
          <SummaryCard key={i} title={card.title} value={card.value} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <ChartCard
          title="Technology | Record Count"
          description="Visualize technology trends and asset count for improved asset surface management"
          data={techData}
          total="692"
          colors={techColors}
          moreLink="+61 more"
        />

        <ChartCard
          title="DNS Type | Record Count"
          description="Ensure optimal DNS health with a comprehensive view of DNS type distribution and record count"
          data={dnsData}
          total="25.27K"
          colors={dnsColors}
          moreLink="+5 more"
        />

        <ChartCard
          title="Web Server | Asset Count"
          description="Gain insights into web server distribution and asset count for better management"
          data={webServerData}
          total="33"
          colors={webColors}
          moreLink="+49 more"
        />

        <ChartCard
          title="Firewall Assets"
          description="Prioritize firewall management tasks with a detailed view of distribution and asset count"
          data={firewallData}
          total="127"
          colors={firewallColors}
        />

        <ChartCard
          title="CDN Assets"
          description="Prioritize CDN management tasks with a detailed view of distribution and asset count"
          data={cdnData}
          total="16"
          colors={cdnColors}
        />

        <ChartCard
          title="TLS Issuer | Asset Count"
          description="Ensure optimal security with a comprehensive view of TLS issuer organization distribution and asset count"
          data={tlsData}
          total="308"
          colors={tlsColors}
          moreLink="+18 more"
        />
      </div>
    </div>
  );
}

// --- SUMMARY CARD ---
function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#161e3e] p-6 rounded-xl border border-gray-800 shadow-lg">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-3xl font-semibold text-white mt-3">{value}</p>
      <button className="text-sm mt-4 px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800">
        Get Details
      </button>
    </div>
  );
}

// --- CHART CARD (IMPROVED UI + RESPONSIVE DONUT) ---
function ChartCard({ title, description, data, total, colors, moreLink }) {
  return (
    <div className="bg-[#161e3e] p-6 rounded-xl border border-gray-800 shadow-lg flex flex-col">

      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-gray-400 text-xs mt-1">{description}</p>
        </div>
        <button className="p-1 hover:bg-gray-700 rounded-full">
          <MoreIcon />
        </button>
      </div>

      {/* Chart & Data Section */}
      <div className="flex flex-col md:flex-row items-center gap-5 mt-6">

        {/* Donut Chart */}
        <div className="w-full md:w-[45%] flex justify-center relative">
          <div className="w-[160px] h-[160px] md:w-[190px] md:h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="90%"
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((d, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #333",
                    color: "white",
                    borderRadius: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Value */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-xl md:text-2xl font-bold">{total}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full md:w-[55%] space-y-2">
          {data.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ background: colors[i] }}
                ></span>
                <span className="text-gray-300">{item.name}</span>
              </div>

              <span className="text-gray-100 font-semibold">
                {item.displayValue}
              </span>
            </div>
          ))}

          {moreLink && (
            <button className="text-blue-400 text-sm mt-1 hover:underline">
              {moreLink}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
