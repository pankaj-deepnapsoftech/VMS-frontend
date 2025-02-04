import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAllEmployeeContext, useDataContext } from '@/context';
import { FiAlertCircle } from 'react-icons/fi';



function EmployeeDashboard() {

  const {
    employeeCardData,
  } = useAllEmployeeContext();



  const data = [
    { name: "In Progress", value: employeeCardData.inProgress },
    { name: "Open", value: employeeCardData.open },
    { name: "Reopen", value: employeeCardData.reopen },
    { name: "Closed", value: employeeCardData.closed },
    { name: "On Hold", value: employeeCardData.onHold },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-6 ">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {Object.keys(employeeCardData)?.map((item) => {
            return (<div className="bg-white rounded-lg shadow p-6 hover:scale-105  transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base  text-black">{item}</h3>
                <FiAlertCircle className="text-red-500" size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-3xl ">{employeeCardData[item]}</p>


              </div>
            </div>
            )
          })}
        </div>

        {/* Charts Section */}

        <div className="w-full h-96 py-6 rounded-lg shadow bg-white flex justify-center items-center hover:scale-95  transition">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>



      </div>

    </>

  );
}

export default EmployeeDashboard;