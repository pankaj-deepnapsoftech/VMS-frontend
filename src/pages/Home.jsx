import React, { useState } from 'react';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { IoShieldOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AiOutlineMenu } from 'react-icons/ai';
import Card from '@/components/Card';



// Mock data for the metrics
const metrics = [
  {
    title: ' Total Vulnerability',
    value: '739',
    change: '0 (0.0%) Oct 21: 739',
    icon: IoShieldOutline
  },
  {
    title: 'In Progress',
    value: '945',
    change: '0 (0.0%) Oct 21: 945',
    icon: IoShieldCheckmarkOutline
  },
  {
    title: 'Out Of Scope',
    value: '579',
    change: '0 (0.0%) Oct 21: 579',
    icon: IoMdSettings
  },
  {
    title: 'Open',
    value: '741',
    change: '0 (0.0%) Oct 21: 741',
    icon: IoShieldCheckmarkOutline
  },
  {
    title: 'Re-open',
    value: '741',
    change: '0 (0.0%) Oct 21: 741',
    icon: IoShieldCheckmarkOutline
  },
  {
    title: 'Closed',
    value: '741',
    change: '0 (0.0%) Oct 21: 741',
    icon: IoShieldCheckmarkOutline
  },
  {
    title: 'On Hold',
    value: '741',
    change: '0 (0.0%) Oct 21: 741',
    icon: IoShieldCheckmarkOutline
  }
];

// Mock data for the risk rating chart
const riskRatingData = [
  { date: '27 Aug', Critical: 120, High: 150, Medium: 200, Low: 180, None: 100 },
  { date: '1 Sep', Critical: 130, High: 140, Medium: 220, Low: 190, None: 110 },
  { date: '10 Sep', Critical: 110, High: 160, Medium: 190, Low: 170, None: 90 },
  { date: '17 Sep', Critical: 140, High: 145, Medium: 210, Low: 185, None: 105 },
  { date: '24 Sep', Critical: 125, High: 155, Medium: 205, Low: 175, None: 95 },
  { date: '1 Oct', Critical: 135, High: 150, Medium: 215, Low: 180, None: 100 },
  { date: '8 Oct', Critical: 115, High: 165, Medium: 195, Low: 165, None: 85 },
  { date: '15 Oct', Critical: 145, High: 140, Medium: 225, Low: 195, None: 115 },
  { date: '22 Oct', Critical: 130, High: 155, Medium: 200, Low: 170, None: 90 }
];

// Mock data for the age and risk rating chart
const ageRiskData = [
  { name: 'Critical', '0-30 Days': 23, '31-60 Days': 11, '61-90 Days': 19, '90+ Days': 15 },
  { name: 'High', '0-30 Days': 67, '31-60 Days': 53, '61-90 Days': 46, '90+ Days': 40 },
  { name: 'Medium', '0-30 Days': 117, '31-60 Days': 104, '61-90 Days': 55, '90+ Days': 57 },
  { name: 'Low', '0-30 Days': 72, '31-60 Days': 102, '61-90 Days': 51, '90+ Days': 51 },
  { name: 'None', '0-30 Days': 0, '31-60 Days': 0, '61-90 Days': 0, '90+ Days': 0 }
];



const RechartsChartCard = ({ title }) => {
  const data = [
    { name: "Aug", New: 500, Closed: 400 },
    { name: "Sep", New: 700, Closed: 600 },
    { name: "Oct", New: 800, Closed: 750 },
  ];

  return (
    <div className="bg-white shadow rounded-lg ">
      <h3 className="text-gray-700 text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="New" fill="#3b82f6" />
          <Bar dataKey="Closed" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const BarChartCard = ({ title }) => {
  const data = [
    { name: "Target Missed", value: 20 },
    { name: "Target Met", value: 15 },
    { name: "No Target", value: 10 },
    { name: "In-flight", value: 25 },
    { name: "Approaching Target", value: 30 },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-gray-700 text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


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

  return (
    <>
      {/* Header */}
     


      <div className="min-h-screen bg-gray-100 px-6">

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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric) => (
            <Card data={metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Risk Rating Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Vulnerable Items by Risk Rating</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskRatingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Critical" stackId="1" stroke="#EF4444" fill="#EF4444" />
                  <Area type="monotone" dataKey="High" stackId="1" stroke="#F97316" fill="#F97316" />
                  <Area type="monotone" dataKey="Medium" stackId="1" stroke="#EAB308" fill="#EAB308" />
                  <Area type="monotone" dataKey="Low" stackId="1" stroke="#22C55E" fill="#22C55E" />
                  <Area type="monotone" dataKey="None" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age and Risk Rating Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Vulnerable Items by Age and Risk Rating</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageRiskData}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RechartsChartCard title="New and Closed Vulnerable Items" />
          <BarChartCard title="Closed Vulnerable Items by Remediation Target Status" />
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