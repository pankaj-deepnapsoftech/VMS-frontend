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


  const {
    cardData,
    vulnerableItemsByRiskRatingData,
    vulnerableItemsByAgeData,
    newAndCloseVulnerableData,
    closevulnerableItems,
    criticalHighVulnerable,
    criticalHighVulnerableOverdue

  } = useDataContext();

  const closevulnerableItemsData = [closevulnerableItems];

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
      title: 'Remedition in Progress',
      value: cardData?.inProgress,

      icon: IoShieldCheckmarkOutline
    },
    {
      title: 'Exceptions',
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
          title="Bulk Upload"
          subtitle=" please upload an Excel file in XLSX or XLS format. Ensure the file is properly formatted and contains all necessary data for processing."
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index} data={metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Risk Rating Chart */}
          <div className="bg-white rounded-lg shadow p-6 hover:scale-95  transition">
            <h3 className="text-lg font-semibold mb-4">Vulnerable Items by Risk Rating</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={newData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Critical" stackId="1" stroke="#ff6b6b" fill="#ff6b6b" />
                  <Area type="monotone" dataKey="High" stackId="1" stroke="#4caf50" fill="#4caf50" />
                  <Area type="monotone" dataKey="Medium" stackId="1" stroke="#2196f3" fill="#2196f3" />
                  <Area type="monotone" dataKey="Low" stackId="1" stroke="#ffc107" fill="#ffc107" />
                  <Area type="monotone" dataKey="info" stackId="1" stroke="#9c27b0" fill="#9c27b0" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age and Risk Rating Chart */}
          <div className="bg-white rounded-lg shadow p-6  hover:scale-95  transition">
            <h3 className="text-lg font-semibold mb-4">Vulnerable Items by Age and Risk Rating</h3>
            <div className="h-64 ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataList}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="0-30 Days" fill="#ff6b6b" />
                  <Bar dataKey="31-60 Days" fill="#4caf50" />
                  <Bar dataKey="61-90 Days" fill="#2196f3" />
                  <Bar dataKey="90+ Days" fill="#9c27b0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {metrics.map((metric) => (
            <Card data={metric} />
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-5 ">

          <div className="bg-white shadow rounded-lg flex justify-center flex-col items-center hover:scale-95  transition ">
            <h3 className="text-gray-700 text-lg font-semibold mb-2">Open and Closed Vulnerable Items</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={newAndCloseVulnerableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Open" fill="#ff6b6b" />
                <Bar dataKey="Closed" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded-lg p-6 hover:scale-95 transition transform duration-300">
            <h3 className="text-gray-700 text-lg font-semibold mb-4">
              Closed Vulnerable Items by Remediation Target Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={closevulnerableItemsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" hide={true} />
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


          <div className="bg-white shadow rounded-lg p-6 mb-10 hover:scale-95 transition">
            <h3 className="text-gray-700 text-lg font-semibold mb-4">
              Critical / High Vulnerable Items by Assignment Group
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
                    <td className="px-4 py-2">{key}</td>
                    <td className="px-4 py-2">{value}</td>
                    <td className="px-4 py-2">{value > 0 ? '⬆️' : '➖'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-10 hover:scale-95 transition">
            <h3 className="text-gray-700 text-lg font-semibold mb-4">
              Overdue Critical / High Vulnerable Items by Assignment Group
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
                {Object.entries(criticalHighVulnerableOverdue).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-2">{key}</td>
                    <td className="px-4 py-2">{value}</td>
                    <td className="px-4 py-2">{value > 0 ? '⬆️' : '➖'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

  );
}

export default Home;