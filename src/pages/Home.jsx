import React, { useEffect, useState } from 'react';
import { BiBarChartAlt2, BiBookAdd, BiImageAdd, BiPlus } from 'react-icons/bi';
import { IoShieldOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AiOutlineMenu } from 'react-icons/ai';
import Card from '@/components/Card';
import { useDataContext } from '@/context';
import { Modal } from '@/components/modal/FileUploadModal';



// const BarChartCard = ({ title }) => {
//   const data = [
//     { name: "Target Missed", value: 20 },
//     { name: "Target Met", value: 15 },
//     { name: "No Target", value: 10 },
//     { name: "In-flight", value: 25 },
//     { name: "Approaching Target", value: 30 },
//   ];

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h3 className="text-gray-700 text-lg font-semibold mb-4">{title}</h3>
//       <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="TargetMissed" fill="#ff6b6b" name="Target Missed" />
//           <Bar dataKey="TargetMet" fill="#4caf50" name="Target Met" />
//           <Bar dataKey="NoTarget" fill="#2196f3" name="No Target" />
//           <Bar dataKey="ApproachingTarget" fill="#ffc107" name="Approaching Target" />
//           <Bar dataKey="InFlight" fill="#9c27b0" name="In Flight" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
//};


const TableCard = ({ title }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-10">
    <h3 className="text-gray-700 text-lg font-semibold mb-4">{title}</h3>
    <table className="w-full text-sm text-left">
      <thead>
        <tr>
          <th className="px-4 py-2 text-gray-600">Name</th>
          <th className="px-4 py-2 text-gray-600">Oct 22</th>
          <th className="px-4 py-2 text-gray-600">Trend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2">Software</td>
          <td className="px-4 py-2">3</td>
          <td className="px-4 py-2">⬆️</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Hardware</td>
          <td className="px-4 py-2">2</td>
          <td className="px-4 py-2">⬇️</td>
        </tr>
      </tbody>
    </table>
  </div>
);

function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const { cardData, vulnerableItemsByRiskRatingData, vulnerableItemsByAgeData, newAndCloseVulnerableData, closevulnerableItems } = useDataContext();

  const dataList = [vulnerableItemsByAgeData.Critical,
  vulnerableItemsByAgeData.High,
  vulnerableItemsByAgeData.Medium,
  vulnerableItemsByAgeData.Low,
  vulnerableItemsByAgeData.Info,
  ]

  const newData = vulnerableItemsByRiskRatingData?.map((item) => ({ date: item.month, Critical: item.critical, High: item.high, Medium: item.medium, Low: item.low, info: item.informational }))

  const metrics = [
    {
      title: ' Total Vulnerability',
      value: cardData?.totalData,

      icon: IoShieldOutline
    },
    {
      title: 'In Progress',
      value: cardData?.inProgress,

      icon: IoShieldCheckmarkOutline
    },
    {
      title: 'Out Of Scope',
      value: 'NA',

      icon: IoMdSettings
    },
    {
      title: 'Open',
      value: cardData?.open,

      icon: IoShieldCheckmarkOutline
    },
    {
      title: 'Re-open',
      value: cardData?.reopen,
      icon: IoShieldCheckmarkOutline
    },
    {
      title: 'Closed',
      value: cardData?.closed,
      icon: IoShieldCheckmarkOutline
    },
    {
      title: 'On Hold',
      value: cardData?.onHold,
      icon: IoShieldCheckmarkOutline
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 ">

        {/* Navigation */}
        <div className=" rounded-t-lg  py-4 flex flex-row   justify-end">

          <div className="relative flex justify-center gap-1">

            <select className="border rounded-md p-1" aria-label=''>
              <option className='text-black bg-white '>Severity </option>
            </select>
            <select className="border rounded-md p-1">
              <option className='text-black bg-white '>Assessment type </option>
            </select> <select className="border rounded-md p-1">
              <option className='text-black bg-white '>Status </option>
            </select>

          </div>
        </div>
        <div className='flex justify-end items-center py-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#015289] text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex flex-row"
          >
            <BiPlus className="h-6 w-6" />
            Bulk Upload
          </button>
        </div>


        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Upload an introduction"
          subtitle=" please upload an Excel file in XLSX or XLS format. Ensure the file is properly formatted and contains all necessary data for processing."
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <Card data={metric} index={index} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Risk Rating Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Vulnerable Items by Risk Rating</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={newData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Critical" stackId="1" stroke="#EF4444" fill="#EF4444" />
                  <Area type="monotone" dataKey="High" stackId="1" stroke="#F97316" fill="#F97316" />
                  <Area type="monotone" dataKey="Medium" stackId="1" stroke="#EAB308" fill="#EAB308" />
                  <Area type="monotone" dataKey="Low" stackId="1" stroke="#22C55E" fill="#22C55E" />
                  <Area type="monotone" dataKey="info" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age and Risk Rating Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Vulnerable Items by Age and Risk Rating</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataList}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="0-30 Days" fill="#93C5FD" />
                  <Bar dataKey="31-60 Days" fill="#60A5FA" />
                  <Bar dataKey="61-90 Days" fill="#3B82F6" />
                  <Bar dataKey="90+ Days" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {metrics.map((metric) => (
            <Card data={metric} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">

          <div className="bg-white shadow rounded-lg flex justify-center flex-col items-center ">
            <h3 className="text-gray-700 text-lg font-semibold mb-2">New and Closed Vulnerable Items</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={newAndCloseVulnerableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="New" fill="#8884d8" />
                <Bar dataKey="Closed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-700 text-lg font-semibold mb-4">Closed Vulnerable Items by Remediation Target Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={closevulnerableItems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="TargetMissed" fill="#ff6b6b" name="Target Missed" />
                <Bar dataKey="TargetMet" fill="#4caf50" name="Target Met" />
                <Bar dataKey="NoTarget" fill="#2196f3" name="No Target" />
                <Bar dataKey="ApproachingTarget" fill="#ffc107" name="Approaching Target" />
                <Bar dataKey="InFlight" fill="#9c27b0" name="In Flight" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TableCard title="Critical Vulnerable Items by Assignment Group" />
          <TableCard title="Overdue Critical Vulnerable Items by Assignment Group" />
        </div>


      </div>
    </>

  );
}

export default Home;