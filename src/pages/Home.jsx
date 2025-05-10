
import {
  MdBuild,
  MdOutlineErrorOutline,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Card from "@/components/Card";
import { useAuthContext, useDataContext } from "@/context";
import { FaNetworkWired } from "react-icons/fa";
import { Bug } from "lucide-react";
import BarGraph from "@/components/BarGraph";
import { useState } from "react";


function Home() {
  const {
    cardData,
    vulnerableItemsByRiskRatingData,
    vulnerableItemsByAgeData,
    newAndCloseVulnerableData,
    closevulnerableItems,
    criticalHighVulnerable,
    criticalHighVulnerableOverdue,
    exploitability
  } = useDataContext();

  const {authenticate} = useAuthContext();
  console.log(authenticate)
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = {
    name: "Dinki",
    email: "dinki@gmail.com",
  };

  const closevulnerableItemsData = [closevulnerableItems];
  const data = [
    { name: "Open", value: cardData?.open },
    { name: "Re Open", value: cardData?.reopen },
    { name: "Closed", value: cardData?.closed },
    { name: "On Hold", value: cardData?.onHold },
  ];

  const data1 = [
    { name: "Application Assessed", value: 20 },
    { name: "Application Not Assessed", value: 40},
    { name: "IP's Assessed", value: 50},
    { name: "IP's Not Assessed", value: 10},
  ];

  const COLORS = ["#B91C1C", "#EF4444", "#FBBF24", "#3B82F6", "#10B981"];

  const dataList = [
    vulnerableItemsByAgeData.Critical,
    vulnerableItemsByAgeData.High,
    vulnerableItemsByAgeData.Medium,
    vulnerableItemsByAgeData.Low,
    vulnerableItemsByAgeData.Info,
  ];

  const newData = vulnerableItemsByRiskRatingData?.map((item) => ({
    date: item.month,
    Critical: item.critical,
    High: item.high,
    Medium: item.medium,
    Low: item.low,
    info: item.informational,
  }));

  const metrics = [
    {
      title: "Application",
      value: cardData?.Application,
      color: "from-[#F24E1E] to-[#FF866B]", // Figma Red gradient
      icon: MdOutlineMiscellaneousServices,
      chartColor: "#FFF",
    },
    {
      title: "Infrastructure IPs",
      value: cardData?.Infrastructure,
      color: "from-[#0D99FF] to-[#74C0FC]", // Figma Blue gradient
      icon: FaNetworkWired,
      chartColor: "#FFF",
    },
    {
      title: "Total Vulnerability",
      value: cardData?.totalData,
      color: "from-[#63A833] to-[#9EE999]", // Figma Cyan gradient
      icon: Bug,
      chartColor: "#FFF",
    },
    {
      title: "Remediation",
      value: cardData?.inProgress,
      color: "from-[#A259FF] to-[#C79CFF]", // Figma Purple gradient
      icon: MdBuild,
      chartColor: "#FFF",
    },
    {
      title: "Exceptions",
      value: cardData?.Exceptions,
      color: "from-[#F24E1E] to-[#FF866B]", // Figma Red gradient
      icon: MdOutlineErrorOutline,
      chartColor: "#FFF",
    }
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  return (
    <>
      <div className="min-h-screen bg-gradient-to-tl from-[#1a1c1e] to-[#2a2c2f] px-6 py-6 ">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 py-3">
          {metrics.map((metric, index) => (
            <Card key={index} data={metric} />
          ))}
        </div>



        <div className="w-full h-full  py-2  mt-5 mb-3  transition rounded-lg flex lg:flex-row flex-col  gap-2">
          <div className="bg-[#2a2c2f] lg:w-[30%] w-full h-96 py-2 transition rounded-lg flex flex-col ">
          <h3 className="text-lg p-2 font-semibold text-gray-200 ">
              Vulnerability Status
            </h3>
            <hr className="mb-1" />
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Risk Rating Chart */}
          <div className="bg-[#2a2c2f]  lg:w-[70%]  w-full py-2 px-2 transition rounded-lg">
            <h3 className="text-lg p-1 font-semibold text-gray-200 mb-2">
              Vulnerable Items by Risk Rating
            </h3>
            <hr className="mb-4" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={newData}>
                  <defs>
                    <linearGradient
                      id="criticalGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#F24E1E" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#F24E1E"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="highGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#A259FF" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#A259FF"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="mediumGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FF7262" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#FF7262"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="lowGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#0D99FF" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#0D99FF"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="infoGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1ABCFE" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#1ABCFE"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Area
                    type="monotone"
                    dataKey="Critical"
                    stackId="1"
                    stroke={COLORS[0]}  // Figma Red
                    fill="url(#criticalGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="High"
                    stackId="1"
                    stroke={COLORS[1]}  // Figma Purple
                    fill="url(#highGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Medium"
                    stackId="1"
                    stroke={COLORS[2]}  // Figma Coral
                    fill="url(#mediumGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Low"
                    stackId="1"
                    stroke={COLORS[3]}  // Figma Blue
                    fill="url(#lowGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="info"
                    stackId="1"
                    stroke={COLORS[4]} // Figma Cyan
                    fill="url(#infoGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* exploybality */}
        <div className="flex gap-2" >
        <div className="bg-[#2a2c2f] p-3  rounded-xl shadow-lg w-full lg:w-1/2 ">
        <h3 className="text-lg p-1 font-semibold text-gray-200 ">
        Exploitability
            </h3>
            <hr className="mb-4 " />
            <BarGraph data={exploitability}  />
          </div>
          <div className="bg-[#2a2c2f] lg:w-1/2 w-full h-96 py-1  transition rounded-lg flex flex-col">
          <h3 className="text-lg p-2 font-semibold text-gray-200 ">
              Inventory Status
            </h3>
            <hr className="mb-1" />
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={authenticate.role === "Admin" && data1}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  label
                >
                  {data1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
        </div>


        {/* Charts Section */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-5 ">
          <div className="bg-[#2a2c2f] px-2 py-2 col-span-2 rounded-lg">
            <h3 className="text-gray-200 text-lg p-1 font-semibold mb-2">
              Closed Vulnerable Items by Remediation Target Status
            </h3>
            <hr className="mb-2" />
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={closevulnerableItemsData} layout="vertical">
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" hide={false} />
                <Tooltip />
                <Bar
                  dataKey="TargetMissed"
                  fill={COLORS[0]}
                  name="Target Missed"
                />
                <Bar dataKey="TargetMet" fill={COLORS[1]} name="Target Met" />
                <Bar dataKey="NoTarget" fill={COLORS[2]} name="No Target" />
                <Bar
                  dataKey="ApproachingTarget"
                  fill={COLORS[3]}
                  name="Approaching Target"
                />
                <Bar dataKey="InFlight" fill={COLORS[4]} name="In Flight" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#2a2c2f] p-4 rounded-lg shadow ">
            <h3 className="text-gray-200 text-lg text-center font-semibold mb-2">
              Critical / High Vulnerable Items <br />{" "}
              <span className="text-sm">by Assignment Group</span>
            </h3>

            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-300">Name</th>
                  <th className="px-3 py-2 text-gray-300">
                    {monthNames[new Date().getMonth()]}
                  </th>
                  <th className="px-4 py-2 text-gray-300">Trend</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(criticalHighVulnerable).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-2 text-gray-400 border-b">{key}</td>
                    <td className="px-4 py-2 text-gray-400 border-b">{value}</td>
                    <td className="px-4 py-2  border-b">
                      {value > 0 ? "⬆️" : "➖"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-5 ">
          <div className="bg-[#2a2c2f] shadow rounded-lg p-6 ">
            <h3 className="text-gray-200 text-sm text-center font-semibold mb-4">
              Overdue Critical / High Vulnerable Items <br />
              <span className="text-sm">by Assignment Group</span>
            </h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-300">Name</th>
                  <th className="px-4 py-2 text-gray-300">
                    {monthNames[new Date().getMonth()]}
                  </th>
                  <th className="px-2 py-2 text-gray-300">Trend</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(criticalHighVulnerableOverdue).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="px-4 py-2 text-gray-400 border-b">{key}</td>
                      <td className="px-4 py-2 text-gray-400 border-b">{value}</td>
                      <td className="px-4 py-2 text-gray-400 border-b">
                        {value > 0 ? "⬆️" : "➖"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Age and Risk Rating Chart */}
          <div className="bg-[#2a2c2f] p-4 col-span-2 rounded-lg">
            <h3 className="text-lg text-gray-200 font-semibold mb-2">
              Vulnerable Items by Age
            </h3>
            <hr className="mb-4" />
            <div className="h-64 ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataList}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="0-30 Days" fill={COLORS[0]} />
                  <Bar dataKey="31-60 Days" fill={COLORS[1]} />
                  <Bar dataKey="61-90 Days" fill={COLORS[2]} />
                  <Bar dataKey="90+ Days" fill={COLORS[3]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-[#2a2c2f] p-2 flex justify-center flex-col pb-14 rounded-lg">
          <h3 className="text-gray-200 p-2 text-lg font-semibold ">
            Open and Closed Vulnerable Items
          </h3>
          <hr className="mb-4" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={newAndCloseVulnerableData} barSize={40}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Open" fill={COLORS[0]} />
              <Bar dataKey="Closed" fill={COLORS[3]} />
              <Bar dataKey="Exception" fill={COLORS[4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6"></div>
       
      </div>
     
    </>
  );
}

export default Home;
