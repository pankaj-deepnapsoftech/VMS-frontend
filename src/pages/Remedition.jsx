import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AiOutlineMenu, AiOutlinePlus, AiOutlineShareAlt } from 'react-icons/ai';
import { FaDatabase, FaHdd, FaNetworkWired, FaCog, FaStar } from 'react-icons/fa';
import { useRemeditionContext } from '@/context';



function Remedition() {

  const {
    dataViaStatus,
    targetStatusData
  } = useRemeditionContext()


  console.log("hvhovyv",
    dataViaStatus,
    targetStatusData, "ndsfgbiouirn")

  // const [selectedGroup, setSelectedGroup] = useState('All');
  // const [activeTab, setActiveTab] = useState('Overview');

  // const tabs = ['Overview', 'Services', 'Service Owners', 'Vulnerable GIs', 'Exceptions', 'Remediation'];



  const COLORS = ["#4f46e5", "#10b981"];

  const data = Object.entries(dataViaStatus)?.map(([label, Vulnerability]) => ({
    label,
    Vulnerability,
  }));

  const data2 = Object.entries(targetStatusData)?.map(([label, Vulnerability]) => ({
    label,
    Vulnerability,
  }));

  const COLORS2 = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#6366f1"];


  const vulnerabilityData = [
    { state: 'Open', none: 0, low: 48, medium: 41, high: 21, critical: 0 },
    { state: 'Under Investigation', none: 0, low: 48, medium: 42, high: 19, critical: 0 },
    { state: 'Awaiting Implementation', none: 0, low: 19, medium: 41, high: 24, critical: 0 },
    { state: 'In Review', none: 1, low: 43, medium: 47, high: 31, critical: 0 },
    { state: 'Resolved', none: 1, low: 42, medium: 41, high: 37, critical: 0 },
    { state: 'Deferred', none: 0, low: 42, medium: 41, high: 33, critical: 0 },
  ];

  const riskData = [
    { status: 'No Target', none: 0, low: 0, medium: 0, high: 0, critical: 0 },
    { status: 'In-Flight', none: 0, low: 202, medium: 217, high: 196, critical: 0 },
    { status: 'Approaching Target', none: 0, low: 5, medium: 10, high: 3, critical: 0 },
    { status: 'Target Met', none: 0, low: 0, medium: 0, high: 0, critical: 0 },
    { status: 'Target Missed', none: 0, low: 0, medium: 23, high: 43, critical: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 ">


      {/* Main Content */}
      <div className="p-2 sm:p-4 ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">

          <div className="w-full max-w-4xl mx-auto h-72 p-8 bg-white    rounded-xl shadow-lg">
            <h2 className="text-sm font-semibold mb-4 text-left text-gray-800">Vulnerability Groups by Assignment Group and State</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="horizontal" barCategoryGap="30%">
                <XAxis type="category" dataKey="label" tick={{ fontSize: 10 }} height={50} />
                <YAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} width={40} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="Vulnerability" barSize={50}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>


          <div className="w-full max-w-4xl h-72 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xs font-semibold mb-4 text-center text-gray-800">Vulnerability Groups by Risk Rating and Remediation Target Status</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data2} layout="horizontal" barCategoryGap="25%">
                <XAxis type="category" dataKey="label" tick={{ fontSize: 8 }} height={50} interval={0} />
                <YAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} width={50} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="Vulnerability" barSize={45}>
                  {data2.map((d, i) => (
                    <Cell key={i} fill={COLORS2[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>


















          {/* Vulnerability Groups Chart */}
          {/* <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Vulnerability Groups by Assignment Group and State</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vulnerabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="state" fontSize={12} angle={-45} textAnchor="end" height={60} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="critical" fill="#dc2626" stackId="a" />
                    <Bar dataKey="high" fill="#ea580c" stackId="a" />
                    <Bar dataKey="medium" fill="#ca8a04" stackId="a" />
                    <Bar dataKey="low" fill="#16a34a" stackId="a" />
                    <Bar dataKey="none" fill="#2563eb" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div> */}

          {/* Risk Rating Chart */}
          {/* <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Vulnerability Groups by Risk Rating and Remediation Target Status</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="status" fontSize={12} angle={-45} textAnchor="end" height={60} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="critical" fill="#dc2626" stackId="a" />
                    <Bar dataKey="high" fill="#ea580c" stackId="a" />
                    <Bar dataKey="medium" fill="#ca8a04" stackId="a" />
                    <Bar dataKey="low" fill="#16a34a" stackId="a" />
                    <Bar dataKey="none" fill="#2563eb" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div> */}

          {/* Critical Vulnerabilities */}
          <div className="bg-white border scale-95 border-gray-200 rounded-lg">
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-900">Critical Vulnerability Groups by Assignment Group</h2>
              <div className="mt-4 space-y-2">
                {[
                  { icon: FaDatabase, name: 'Database', value: 0 },
                  { icon: FaHdd, name: 'Hardware', value: 0 },
                  { icon: FaNetworkWired, name: 'Network CAB Managers', value: 0 },
                  { icon: FaCog, name: 'Software', value: 0 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <FaStar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <item.icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="text-sm text-gray-900 truncate">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 ml-2">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unassigned Trend */}
          <div className="bg-white border scale-95 border-gray-200 rounded-lg">
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-900">Infrastructure & Application Vulnerability Groups</h2>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">15</span>
                  <p className="text-sm text-gray-500">0 (0.0%) Oct 22: 15</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Remedition;