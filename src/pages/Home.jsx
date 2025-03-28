import React, { useEffect, useState } from "react";
import { BiBarChartAlt2, BiBookAdd, BiImageAdd, BiPlus } from "react-icons/bi";
import { IoShieldOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
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
} from "recharts";
import { AiOutlineMenu } from "react-icons/ai";
import Card from "@/components/Card";
import { useAuthContext, useDataContext } from "@/context";
import { Modal } from "@/components/modal/FileUploadModal";
import { Loader } from "@/constants/Components-lazy-loading/components.Lazy";

function Home() {
  const {
    cardData,
    vulnerableItemsByRiskRatingData,
    vulnerableItemsByAgeData,
    newAndCloseVulnerableData,
    closevulnerableItems,
    criticalHighVulnerable,
    criticalHighVulnerableOverdue,
  } = useDataContext();

  const { loading, authenticate } = useAuthContext();

  const closevulnerableItemsData = [closevulnerableItems];

  const dataList = [
    vulnerableItemsByAgeData.Critical,
    vulnerableItemsByAgeData.High,
    vulnerableItemsByAgeData.Medium,
    vulnerableItemsByAgeData.Low,
    vulnerableItemsByAgeData.Info,
  ];

  console.log("vulnerableItemsByAgeData", vulnerableItemsByRiskRatingData);

  const newData = vulnerableItemsByRiskRatingData?.map((item) => ({
    date: item.month,
    Critical: item.critical,
    High: item.high,
    Medium: item.medium,
    Low: item.low,
    info: item.informational,
  }));

  //console.log("cardData", cardData)
  const metrics = [
    {
      title: "Application",
      value: 8,

      icon: IoShieldOutline,
    },
    {
      title: " Infrastructure IPs",
      value: cardData?.closed,

      icon: IoShieldOutline,
    },
    {
      title: " Total Vulnerability",
      value: cardData?.totalData,

      icon: IoShieldOutline,
    },
    {
      title: "Remedition",
      value: cardData?.inProgress,

      icon: IoShieldCheckmarkOutline,
    },
    {
      title: "Exceptions",
      value: cardData?.Exceptions,

      icon: IoMdSettings,
    },
    {
      title: "Open",
      value: cardData?.open,

      icon: IoShieldCheckmarkOutline,
    },
    {
      title: "Re Open",
      value: cardData?.reopen,
      icon: IoShieldCheckmarkOutline,
    },
    {
      title: "Closed",
      value: cardData?.closed,
      icon: IoShieldCheckmarkOutline,
    },
    {
      title: "On Hold",
      value: cardData?.onHold,
      icon: IoShieldCheckmarkOutline,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-6 py-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 py-3">
          {metrics.map((metric, index) => (
            <Card key={index} data={metric} />
          ))}
        </div>

        {/* Charts Section */}

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5 ">
          <div className="bg-white px-2 py-2 col-span-2">
            <h3 className="text-sky-700 text-lg font-semibold mb-2">
              Closed Vulnerable Items by Remediation Target Status
            </h3>
            <hr className="mb-2" />
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={closevulnerableItemsData} layout="vertical">
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" hide={true} />
                <Tooltip />
                <Bar
                  dataKey="TargetMissed"
                  fill="#2dd4bf"
                  name="Target Missed"
                />
                <Bar dataKey="TargetMet" fill="#a5b4fc" name="Target Met" />
                <Bar dataKey="NoTarget" fill="#fca5a5" name="No Target" />
                <Bar
                  dataKey="ApproachingTarget"
                  fill="#ffc107"
                  name="Approaching Target"
                />
                <Bar dataKey="InFlight" fill="#9c27b0" name="In Flight" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow ">
            <h3 className="text-sky-700 text-lg text-center font-semibold mb-2">
              Critical / High Vulnerable Items <br />{" "}
              <span className="text-sm">by Assignment Group</span>
            </h3>
          
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-600">Name</th>
                  <th className="px-4 py-2 text-gray-600">Oct 22</th>
                  <th className="px-4 py-2 text-gray-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(criticalHighVulnerable).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-2 border-b">{key}</td>
                    <td className="px-4 py-2 border-b">{value}</td>
                    <td className="px-4 py-2 border-b">
                      {value > 0 ? "⬆️" : "➖"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

          {/* Risk Rating Chart */}
          <div className="bg-white  py-2 px-3 mt-5 transition">
          <h3 className="text-lg font-semibold text-sky-700 mb-2">
            Vulnerable Items by Risk Rating
          </h3>
          <hr className="mb-4" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={newData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Critical"
                  stackId="1"
                  stroke="#78716c"
                  fill="#78716c"
                />
                <Area
                  type="monotone"
                  dataKey="High"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                />
                <Area
                  type="monotone"
                  dataKey="Medium"
                  stackId="1"
                  stroke="#eab308"
                  fill="#eab308"
                />
                <Area
                  type="monotone"
                  dataKey="Low"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                />
                <Area
                  type="monotone"
                  dataKey="info"
                  stackId="1"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5 ">

        <div className="bg-white shadow rounded-lg p-6 ">
            <h3 className="text-sky-700 text-lg text-center font-semibold mb-4">
              Overdue Critical / High Vulnerable Items <br /> <span className="text-sm">by Assignment
              Group</span>
            </h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-600">Name</th>
                  <th className="px-4 py-2 text-gray-600">Oct 22</th>
                  <th className="px-4 py-2 text-gray-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(criticalHighVulnerableOverdue).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="px-4 py-2 border-b">{key}</td>
                      <td className="px-4 py-2 border-b">{value}</td>
                      <td className="px-4 py-2 border-b">
                        {value > 0 ? "⬆️" : "➖"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Age and Risk Rating Chart */}
          <div className="bg-white p-4 col-span-2 ">
            <h3 className="text-lg text-sky-700 font-semibold mb-2">
              Vulnerable Items by Age{" "}
            </h3>
            <hr className="mb-4"/>
            <div className="h-64 ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataList}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="0-30 Days" fill="#fca5a5" />
                  <Bar dataKey="31-60 Days" fill="#22d3ee" />
                  <Bar dataKey="61-90 Days" fill="#818cf8" />
                  <Bar dataKey="90+ Days" fill="#9c27b0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        
        <div className="bg-white p-2 flex justify-center flex-col">
            <h3 className="text-sky-700 text-lg font-semibold mb-2">
              Open and Closed Vulnerable Items
            </h3>
            <hr className="mb-4"/>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={newAndCloseVulnerableData} barSize={40}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Open" fill="#2dd4bf" />
                <Bar dataKey="Closed" fill="#fca5a5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

       
      </div>
    </>
  );
}

export default Home;
