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
// Using an inline SVG for the "more" icon to keep it in one file.
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

// --- Data from Image ---
// We use 'value' for the chart (must be a number)
// and 'displayValue' for the legend (can be a string like "8.27K")

const summaryData = [
  { title: "Assets Discovered Last 30 Days", value: "2.99K" },
  { title: "Assets with at Least One Port Open", value: "936" },
  { title: "Assets with No Port Open", value: "42" },
  { title: "Web Applications without Firewall", value: "708" },
];

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
const webColors = ["#FF9800", "#FFB74D", "#FFC107", "#FFD54F", "#FFEB3B"];

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

// --- Main Dashboard Component ---
export default function ExposureDashboard() {
  return (
    <div className="min-h-screen bg-[#0D0F18] text-gray-100 p-6 font-sans">
      {/* ---- Summary Cards ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((card, idx) => (
          <SummaryCard key={idx} title={card.title} value={card.value} />
        ))}
      </div>

      {/* ---- Chart Grid ---- */}
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

// --- Summary Card Component ---
function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#181A27] p-4 rounded-lg border border-gray-700/50 shadow-lg">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-3xl font-semibold text-white mt-2">{value}</p>
      <button className="text-sm text-gray-300 bg-transparent border border-gray-600 rounded-md px-4 py-1.5 mt-4 transition-colors hover:bg-gray-700 hover:border-gray-500">
        Get Details
      </button>
    </div>
  );
}

// --- Chart Card Component ---
function ChartCard({ title, description, data, total, colors, moreLink }) {
  return (
    <div className="bg-[#181A27] p-5 rounded-lg border border-gray-700/50 shadow-lg flex flex-col h-full">
      {/* Card Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          {description && (
            <p className="text-gray-400 text-xs mt-1 max-w-xs">
              {description}
            </p>
          )}
        </div>
        <button className="p-1 -mr-1 -mt-1 rounded-full hover:bg-gray-700">
          <MoreIcon />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex-grow flex items-center mt-4">
        {/* Donut Chart */}
        <div className="w-2/5 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={data.length > 1 ? 2 : 0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    stroke={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A2D3D",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="text-2xl font-bold text-white">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-3/5 pl-6 flex flex-col justify-center space-y-2">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex items-center space-x-2 truncate">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-gray-300 truncate" title={entry.name}>
                  {entry.name}
                </span>
              </div>
              <span className="font-medium text-gray-100 pl-2">
                {entry.displayValue}
              </span>
            </div>
          ))}
          {moreLink && (
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-sm text-blue-400 hover:underline pt-1"
            >
              {moreLink}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}