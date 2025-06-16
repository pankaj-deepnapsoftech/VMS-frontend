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
import { useEffect, useRef, useState } from "react";

import { ChartsColor } from "@/constants/static.data";
import { AxiosHandler } from "@/config/AxiosConfig";
import { IoIosArrowDown } from "react-icons/io";

function Home() {

  const [TenantAllData, setTenantAllData] = useState([])

  const {
    cardData,
    vulnerableItemsByRiskRatingData,
    vulnerableItemsByAgeData,
    newAndCloseVulnerableData,
    closevulnerableItems,
    criticalHighVulnerable,
    criticalHighVulnerableOverdue,
    exploitability,
  } = useDataContext();

  const { authenticate, token } = useAuthContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(TenantAllData);
  const dropdownRef = useRef(null);

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
    { name: "Application Not Assessed", value: 40 },
    { name: "IP's Assessed", value: 50 },
    { name: "IP's Not Assessed", value: 10 },
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
    Informational: item.informational,
  }));

  const metrics = [
    {
      title: "Application",
      value: cardData?.Application,
      color: "from-[#253e5e40] to-[#253e5e8f]", // Figma Red gradient
      icon: MdOutlineMiscellaneousServices,
      chartColor: "#FFF",
      border:"border border-[#275691b5]"
    },
    {
      title: "Infrastructure IPs",
      value: cardData?.Infrastructure,
      color: "from-[#37755d70] to-[#0b5c3d82]", // Figma Blue gradient
      icon: FaNetworkWired,
      chartColor: "#FFF",
      border: "border border-[#37755d70]"
    },
    {
      title: "Total Vulnerability",
      value: cardData?.totalData,
      color: "from-[#5c1c2dab] to-[#6b314173]", // Figma Cyan gradient
      icon: Bug,
      chartColor: "#FFF",
      border: "border border-[#5c1c2d]"
    },
    {
      title: "Remediation",
      value: cardData?.inProgress,
      color: "from-[#163540] to-[#12495c99]", // Figma Purple gradient
      icon: MdBuild,
      chartColor: "#FFF",
      border: "border border-[#163540c4]"
    },
    {
      title: "Exceptions",
      value: cardData?.Exceptions,
      color: "from-[#6f701566] to-[#888a035e]", // Figma Red gradient
      icon: MdOutlineErrorOutline,
      chartColor: "#FFF",
      border: "border border-[#888a03]"
    },
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

  const GetAllTenentData = async () => {
    try {
      const res = await AxiosHandler.get("/tenant/get-all");
      setTenantAllData(res?.data?.data);

    } catch (error) {
      console.error(error);

    }
  };



  useEffect(() => {
    const filtered = TenantAllData.filter(tenant =>
      tenant.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, TenantAllData]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (name) => {
    setSelected(name);
    setIsOpen(false);
    setSearchTerm('');
    // onSelect?.(name);
  };

  useEffect(() => {
    if (token) {
      GetAllTenentData()
    }
  }, [])
  return (
    <>
      <div className="min-h-screen bg-gradient-custom px-6 py-6 ">

        <div className="flex flex-col md:flex-row items-stretch gap-4 bg-[#6B728033] border border-[#6B728033]   rounded-lg p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-[#6B728033] text-white placeholder-gray-400 border border-gray-600 rounded-md px-4 py-2 focus:outline-none transition duration-200"
          />

          <div className="relative w-full md:w-64" ref={dropdownRef}>
          
           <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#6B728033]  text-white border border-gray-600 rounded-md px-4 py-2 cursor-pointer"
              >
                {selected || 'Select Tenant'}
              </div>
              <IoIosArrowDown className={` ${isOpen ? "rotate-180" : "rotate-0"} absolute text-white  right-4 top-3 `} />
           </div>
           
            {isOpen && (
              <div className="absolute z-10 w-full bg-[#313140] border border-gray-600 rounded-md mt-1 shadow-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=" mx-2 px-4 py-2 bg-[#1f1f21] text-white border-b border-gray-700 outline-none mt-2 rounded-md"
                />
               

                <ul className="max-h-44 overflow-y-auto custom-scrollbar ">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((tenant) => (
                      <li
                        key={tenant._id}
                        onClick={() => handleSelect(tenant.company_name)}
                        className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-white"
                      >
                        {tenant.company_name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-400">No match found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>


        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 py-3">
          {metrics.map((metric, index) => (
            <Card key={index} data={metric} />
          ))}
        </div>

        <div className="w-full h-full  py-2  mt-5   transition rounded-lg flex lg:flex-row flex-col  gap-2">
          <div className="bg-cards lg:w-[30%] w-full h-96 py-2 transition rounded-lg flex flex-col ">
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
                      key={`cell-${entry.name}-${index}`}
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
          <div className="bg-cards  lg:w-[70%]  w-full py-2 px-2 transition rounded-lg">
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
                      <stop
                        offset="0%"
                        stopColor={ChartsColor.Critical}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={ChartsColor.Critical}
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
                      <stop
                        offset="0%"
                        stopColor={ChartsColor.High}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={ChartsColor.High}
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
                      <stop
                        offset="0%"
                        stopColor={ChartsColor.Medium}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={ChartsColor.Medium}
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
                      <stop
                        offset="0%"
                        stopColor={ChartsColor.Low}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={ChartsColor.Low}
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
                      <stop
                        offset="0%"
                        stopColor={ChartsColor.Informational}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={ChartsColor.Informational}
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
                    stroke={ChartsColor.Critical} // Figma Red
                    fill="url(#criticalGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="High"
                    stackId="1"
                    stroke={ChartsColor.High} // Figma Purple
                    fill="url(#highGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Medium"
                    stackId="1"
                    stroke={ChartsColor.Medium} // Figma Coral
                    fill="url(#mediumGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Low"
                    stackId="1"
                    stroke={ChartsColor.Low} // Figma Blue
                    fill="url(#lowGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Informational"
                    stackId="1"
                    stroke={ChartsColor.Informational} // Figma Cyan
                    fill="url(#infoGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* exploybality */}
        <div className="flex gap-2">
          <div className="bg-cards p-3  rounded-xl shadow-lg w-full lg:w-1/2 ">
            <h3 className="text-lg p-1 font-semibold text-gray-200 ">
              Exploitability
            </h3>
            <hr className="mb-4 " />
            <BarGraph data={exploitability} />
          </div>
          <div className="bg-cards lg:w-1/2 w-full h-96 py-1  transition rounded-lg flex flex-col">
            <h3 className="text-lg p-2 font-semibold text-gray-200 ">
              Inventory Status
            </h3>
            <hr className="mb-1" />
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={data1}
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
                      key={`cell-inventory-${entry.name}-${index}`}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pt-2 ">
          <div className="bg-cards px-2 py-2 col-span-2 rounded-lg">
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

          <div className="bg-cards p-4 rounded-lg shadow ">
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
                    <td className="px-4 py-2 text-gray-400 border-b">
                      {value}
                    </td>
                    <td className="px-4 py-2  border-b">
                      {value > 0 ? "⬆️" : "➖"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-2 ">
          <div className="bg-cards shadow rounded-lg p-6 ">
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
                      <td className="px-4 py-2 text-gray-400 border-b">
                        {key}
                      </td>
                      <td className="px-4 py-2 text-gray-400 border-b">
                        {value}
                      </td>
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
          <div className="bg-cards p-4 col-span-2 rounded-lg">
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

        <div className="bg-cards p-2 flex justify-center flex-col pb-14 rounded-lg">
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
